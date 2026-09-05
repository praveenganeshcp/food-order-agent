import { Cart, MenuItem, Restaurant } from "./types";

export const RESTAURANTS: Restaurant[] = [
  {
    id: "rest_1",
    name: "ABC Restaurant",
    cuisine: "Pizza, Italian, Fast Food",
    rating: 4.5,
  },
  {
    id: "rest_2",
    name: "XYZ Kitchen",
    cuisine: "Indian, North Indian",
    rating: 4.3,
  },
  {
    id: "rest_3",
    name: "Food Corner",
    cuisine: "Chinese, Asian",
    rating: 4.2,
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "pizza_1",
    restaurantId: "rest_1",
    name: "Margherita Pizza",
    description: "Classic pizza with mozzarella, tomato and basil",
    price: 199,
  },
  {
    id: "pizza_2",
    restaurantId: "rest_1",
    name: "Farmhouse Pizza",
    description: "Pizza loaded with vegetables and mozzarella",
    price: 239,
  },
  {
    id: "pizza_3",
    restaurantId: "rest_1",
    name: "Paneer Tikka Pizza",
    description: "Paneer tikka with onions, capsicum and spicy sauce",
    price: 249,
  },
  {
    id: "pizza_4",
    restaurantId: "rest_1",
    name: "Pepperoni Pizza",
    description: "Pepperoni with extra mozzarella cheese",
    price: 249,
  },
  {
    id: "pizza_5",
    restaurantId: "rest_1",
    name: "BBQ Chicken Pizza",
    description: "Grilled chicken, onions and BBQ sauce",
    price: 259,
  },
  {
    id: "pizza_6",
    restaurantId: "rest_1",
    name: "Cheese Burst Pizza",
    description: "Mozzarella and cheddar cheese loaded pizza",
    price: 229,
  },

  {
    id: "burger_1",
    restaurantId: "rest_2",
    name: "Paneer Burger",
    description: "Crispy paneer burger",
    price: 149,
  },
  {
    id: "burger_2",
    restaurantId: "rest_2",
    name: "Veg Maharaja Burger",
    description: "Loaded Indian-style veg burger",
    price: 179,
  },
];

export const CART = new Map<string, Cart>();
