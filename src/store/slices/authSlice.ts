import type { AuthSlice, SliceCreator } from "./types";

export const createAuthSlice: SliceCreator<AuthSlice> = (set) => ({
  isAuthenticated: false,
  hasHydrated: false,
  userEmail: null,
  setHasHydrated: (value: boolean) => {
    set((state) => {
      state.hasHydrated = value;
    });
  },
  login: (email: string) => {
    set((state) => {
      state.isAuthenticated = true;
      state.userEmail = email;
    });
  },
  logout: () => {
    set((state) => {
      state.isAuthenticated = false;
      state.userEmail = null;
      state.cartItems = [];
    });
  },
});
