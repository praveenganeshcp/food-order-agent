export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Cart {
  sessionId: string;
  restaurantId: string;
  items: CartItem[];
}
