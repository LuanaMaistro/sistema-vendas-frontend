import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthStore {
  token: string | null;
  user: AuthUser | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

function decodeToken(token: string): AuthUser | null {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return {
      id: decoded.sub,
      email: decoded.email,
      name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
      role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
    };
  } catch {
    return null;
  }
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => set({ token, user: decodeToken(token) }),
      clearToken: () => set({ token: null, user: null }),
    }),
    { name: 'app-auth' }
  )
)
