import { create } from "zustand";
import axios from "axios";

type Store = {
  isClick: boolean;
  toggle: () => void;
};

type auth = {
  login: boolean;
  toggleAuth: () => void;
};

type currentUser = {
  user: object;
  getCurrentUser: () => Promise<void>;
};

const useClickStore = create<Store>()((set) => ({
  isClick: false,
  toggle: () => set((state) => ({ isClick: !state.isClick })),
}));

const useAuthStore = create<auth>()((set) => ({
  login: true,
  toggleAuth: () => set((state) => ({ login: !state.login })),
}));

const useCurrentUser = create<currentUser>()((set) => ({
  user: {},
  getCurrentUser: async () => {
    try {
      const response = await axios.get("/api/currentUser");
      if (response.status === 200) {
        set({user: response.data.message})
      }
    } catch (error) {
      console.error("Error in fetching the user");
    }
  },
}));

export { useClickStore, useAuthStore, useCurrentUser };
