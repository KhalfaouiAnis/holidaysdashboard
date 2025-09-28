import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  status: "idle" | "signOut" | "signIn";
  signIn: (data: string) => void;
  signOut: () => void;
  hydrate: () => void;
}

const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      status: "idle",
      setUser: (user) => {
        set({ user });
      },
      signIn: (token) => {
        set({ token, status: "signIn" });
      },
      signOut: async () => {
        set({ user: null, token: null, status: "signOut" });
      },
      hydrate: () => {
        const { token } = get();
        if (token) {
          set({ status: "signIn" });
        } else {
          set({ token: null, status: "signOut", user: null });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    },
  ),
);

export default useAuth;

export const getToken = () => useAuth.getState().token;
export const getUserId = () => useAuth.getState().user?.id;
export const signOut = () => useAuth.getState().signOut();
export const hydrateAuth = () => useAuth.getState().hydrate();
