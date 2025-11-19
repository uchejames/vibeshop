import { createContext, useContext, useState, useEffect } from 'react'
import { supabaseAuth } from '../lib/supabaseAuth'

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check current session on mount
    const initAuth = async () => {
      const currentUser = await supabaseAuth.getCurrentUser()
      if (currentUser) {
        setUser(currentUser)
        const profile = await supabaseAuth.getUserProfile(currentUser.id)
        setUserProfile(profile)
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email, password) => {
    const { user, error } = await supabaseAuth.signIn(email, password)
    if (error) {
      throw new Error(error)
    }
    setUser(user)
    const profile = await supabaseAuth.getUserProfile(user.id)
    setUserProfile(profile)
    return user
  }

  const signup = async (email, password, fullName, userType = 'customer') => {
    const { user, error } = await supabaseAuth.signUp(email, password, fullName, userType)
    if (error) {
      throw new Error(error)
    }
    setUser(user)
    const profile = await supabaseAuth.getUserProfile(user.id)
    setUserProfile(profile)
    return user
  }

  const logout = async () => {
    await supabaseAuth.signOut()
    setUser(null)
    setUserProfile(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, userProfile, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
