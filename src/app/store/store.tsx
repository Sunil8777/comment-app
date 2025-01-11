import { create } from "zustand";

type Store = {
  isClick: boolean;
  toggle: () => void;
};
type auth = {
  login: boolean;
  toggleAuth: () => void;
};

const useClickStore = create<Store>()((set) => ({
  isClick: false,
  toggle: () => set((state) => ({ isClick: !state.isClick })),
}));

const useAuthStore = create<auth>()((set)=>({
    login:true,
    toggleAuth: () => set((state) => ({ login: !state.login })),
}))

export {useClickStore,useAuthStore}