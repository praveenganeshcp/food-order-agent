import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { CART, RESTAURANTS } from "../static-data";

export const getRestaurants = tool(
  async () => {
    // Create a cart session.

    const sessionId = crypto.randomUUID();

    CART.set(sessionId, {
      sessionId,
      restaurantId: "",
      items: [],
    });

    return {
      sessionId,

    // In production, fetch restaurants list from database.
      restaurants: RESTAURANTS.map((restaurant) => ({
        id: restaurant.id,
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        rating: restaurant.rating,
      })),
    };
  },
  {
    name: "get_restaurants",

    description:
      "Get the list of restaurants available for food ordering. " +
      "This tool also creates a shopping session and returns a sessionId. " +
      "The sessionId must be preserved and passed to add_to_cart and place_order.",

    schema: z.object({}),
  },
);
