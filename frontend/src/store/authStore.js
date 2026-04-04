import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: true,
      justLoggedIn: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
          loading: false,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          loading: false,
        }),

      setLoading: (state) => set({ loading: state }),
      setJustLoggedIn: (state) => set({ justLoggedIn: state }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    },
  ),
);

export default useAuthStore;
