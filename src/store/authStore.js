import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: "",
      userId: "",
      actionLogin: (input) => {},
      actionRegister: (input) => {},
      actionGetme: () => {},
    }),
    {
      name: "user-store",
    }
  )
);

export default useAuthStore;
