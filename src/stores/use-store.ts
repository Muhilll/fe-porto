import { create } from "zustand";

interface CartItem {
  dish_id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  quantity: number;
}

interface StoreState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (name: string, quantity: number) => void;
  removeFromCart: (name: string) => void;
  clearCart: () => void; // 1. Added to TypeScript interface
  getCartCount: () => number;
}

export const useStore = create<StoreState>((set, get) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  cart: [],
  addToCart: (newItem) => 
    set((state) => {
      const existingItem = state.cart.find((item) => item.name === newItem.name);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.name === newItem.name
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...newItem, quantity: 1 }] };
    }),

  updateQuantity: (name, quantity) =>
    set((state) => ({
      cart: state.cart
        .map((item) => (item.name === name ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    })),

  removeFromCart: (name) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.name !== name),
    })),
    
  // 2. Added the actual implementation to reset the cart array
  clearCart: () => set({ cart: [] }),
    
  getCartCount: () => {
    return get().cart.reduce((total, item) => total + item.quantity, 0);
  },
}));




// K O D E  Y A N G  L A M A
// import { create } from "zustand";

// export const useStore = create((set) => ({
//   count: 0,
//   increment: () => set((state) => ({ count: state.count + 1 })),
//   decrement: () => set((state) => ({ count: state.count - 1 })),
//   reset: () => set({ count: 0 }),
//   isSidebarOpen: true,
//   toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
// }));
