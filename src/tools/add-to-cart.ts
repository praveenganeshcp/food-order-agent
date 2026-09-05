import { tool } from "@langchain/core/tools";
import z from "zod";
import { findMenuItem } from "../utils";
import { CART } from "../static-data";

export const addToCart = tool(
  async ({ sessionId, menuItemId, quantity }) => {
    // In production, use database to store items in cart.
    const cart = CART.get(sessionId);

    if (!cart) {
      return {
        success: false,
        message: "Invalid or expired session.",
      };
    }

    const menuItem = findMenuItem(menuItemId);

    if (!menuItem) {
      return {
        success: false,
        message: `Menu item "${menuItemId}" was not found.`,
      };
    }

    /*
     * First item determines the restaurant.
     */
    if (!cart.restaurantId) {
      cart.restaurantId = menuItem.restaurantId;
    }

    /*
     * Don't allow items from different restaurants.
     */
    if (cart.restaurantId !== menuItem.restaurantId) {
      return {
        success: false,
        message:
          "You cannot add items from different restaurants to the same cart.",
      };
    }

    const existingItem = cart.items.find((item) => item.id === menuItemId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        ...menuItem,
        quantity,
      });
    }

    const total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return {
      success: true,
      message: `${quantity} x ${menuItem.name} added to cart.`,

      cart: {
        sessionId: cart.sessionId,

        items: cart.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity,
        })),

        total,
      },
    };
  },
  {
    name: "add_to_cart",

    description:
      "Add a menu item to the user's shopping cart. " +
      "Requires the sessionId returned by get_restaurants and the menu item ID returned by get_menu.",

    schema: z.object({
      sessionId: z
        .string()
        .describe("Shopping session ID returned by get_restaurants"),

      menuItemId: z.string().describe("Menu item ID returned by get_menu"),

      quantity: z
        .number()
        .int()
        .min(1)
        .default(1)
        .describe("Number of items to add"),
    }),
  },
);
