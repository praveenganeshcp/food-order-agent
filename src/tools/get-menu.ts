import { tool } from "@langchain/core/tools";
import { findRestaurant } from "../utils";
import z from "zod";
import { MENU_ITEMS } from "../static-data";

export const getMenu = tool(
  async ({ restaurantName }) => {
    // In production, fetch menu items from database
    const restaurant = findRestaurant(restaurantName);

    if (!restaurant) {
      return {
        success: false,
        message: `Restaurant "${restaurantName}" was not found.`,
      };
    }

    const items = MENU_ITEMS.filter(
      (item) => item.restaurantId === restaurant.id,
    );

    return {
      success: true,

      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        rating: restaurant.rating,
      },

      menu: items.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
      })),
    };
  },
  {
    name: "get_menu",

    description:
      "Get the menu items available at a restaurant. " +
      "Use the restaurant name as input.",

    schema: z.object({
      restaurantName: z
        .string()
        .describe("The exact or approximate restaurant name"),
    }),
  },
);
