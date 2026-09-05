import { tool } from "@langchain/core/tools";
import z from "zod";
import { CART, RESTAURANTS } from "../static-data";

export const placeOrder = tool(
  async ({ sessionId }) => {
    const cart = CART.get(sessionId);

    if (!cart) {
      return {
        success: false,
        message: "Invalid or expired session.",
      };
    }

    if (cart.items.length === 0) {
      return {
        success: false,
        message: "Your cart is empty.",
      };
    }

    const restaurant = RESTAURANTS.find(
      (restaurant) => restaurant.id === cart.restaurantId,
    );

    const total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const orderId = `ORDER-${Date.now()}`;

    // In production, store order details in database
    const order = {
      orderId,

      success: true,

      message: "Order placed successfully!",

      restaurant: restaurant?.name,

      items: cart.items.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.price,
        total: item.price * item.quantity,
      })),

      total,

      estimatedDelivery: "30-40 minutes",
    };

    /*
     * Clear cart after placing order.
     */
    CART.delete(sessionId);

    return order;
  },
  {
    name: "place_order",

    description:
      "Place the user's order using their shopping session ID. " +
      "Returns the ordered menu item details and order success information.",

    schema: z.object({
      sessionId: z
        .string()
        .describe("Shopping session ID returned by get_restaurants"),
    }),
  },
);
