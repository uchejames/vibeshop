const STORAGE_KEY = 'vibeshop_user'

export const mockAuth = {
  signUp: (email, password, fullName, userType = 'customer') => {
    const user = {
      id: `user_${Date.now()}`,
      email,
      fullName,
      userType,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    return { user, error: null }
  },

  signIn: (email, password, userType = 'customer') => {
    const user = {
      id: `user_${Date.now()}`,
      email,
      fullName: email.split('@')[0],
      userType,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    return { user, error: null }
  },

  getUser: () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return { user: null, error: 'No user' }
    try {
      return { user: JSON.parse(stored), error: null }
    } catch {
      return { user: null, error: 'Invalid user data' }
    }
  },

  getCurrentUser: () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null
    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  },

  signOut: () => {
    localStorage.removeItem(STORAGE_KEY)
  },
}
