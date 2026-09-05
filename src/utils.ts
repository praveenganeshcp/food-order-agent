import { MENU_ITEMS, RESTAURANTS } from "./static-data";
import { addToCart } from "./tools/add-to-cart";
import { getMenu } from "./tools/get-menu";
import { getRestaurants } from "./tools/get-restaurants";
import { placeOrder } from "./tools/place-order";
import { Restaurant, MenuItem } from "./types";

export function findRestaurant(name: string): Restaurant | undefined {
  return RESTAURANTS.find(
    (restaurant) => restaurant.name.toLowerCase() === name.toLowerCase(),
  );
}

export function findMenuItem(id: string): MenuItem | undefined {
  return MENU_ITEMS.find((item) => item.id === id);
}

export const restaurantTools = [getRestaurants, getMenu, addToCart, placeOrder];

export const toolsByName = {
  [getRestaurants.name]: getRestaurants,
  [getMenu.name]: getMenu,
  [addToCart.name]: addToCart,
  [placeOrder.name]: placeOrder,
};
