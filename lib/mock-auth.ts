export interface MockUser {
  id: string;
  email: string;
  fullName: string;
  userType: 'customer' | 'creative';
}

const STORAGE_KEY = 'vibeshop_user';

export const mockAuth = {
  signUp: async (email: string, password: string, fullName: string, userType: 'customer' | 'creative') => {
    const user: MockUser = {
      id: `user_${Date.now()}`,
      email,
      fullName,
      userType,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return { user, error: null };
  },

  signIn: async (email: string, password: string, userType: 'customer' | 'creative' = 'customer') => {
    const user: MockUser = {
      id: `user_${Date.now()}`,
      email,
      fullName: email.split('@')[0],
      userType,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return { user, error: null };
  },

  getUser: async () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { user: null, error: 'No user' };
    try {
      return { user: JSON.parse(stored) as MockUser, error: null };
    } catch {
      return { user: null, error: 'Invalid user data' };
    }
  },

  getCurrentUser: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as MockUser;
    } catch {
      return null;
    }
  },

  signOut: () => {
    localStorage.removeItem(STORAGE_KEY);
  },
};
