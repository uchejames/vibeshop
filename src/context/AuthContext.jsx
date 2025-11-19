import { createContext, useContext, useState, useEffect } from 'react'
import { supabaseAuth } from '../lib/supabaseAuth'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await supabaseAuth.getCurrentUser()
        if (currentUser) {
          // Fetch user profile to get userType
          const profile = await supabaseAuth.getUserProfile(currentUser.id)
          if (profile) {
            setUser({
              id: currentUser.id,
              email: currentUser.email,
              fullName: profile.full_name,
              userType: profile.user_type,
              avatarUrl: profile.avatar_url,
              bio: profile.bio,
            })
          }
        }
      } catch (error) {
        console.error('[AuthContext] Error loading user:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const signup = async (email, password, fullName, userType) => {
    try {
      const { user: authUser, error } = await supabaseAuth.signUp(
        email,
        password,
        fullName,
        userType
      )

      if (error) throw new Error(error)
      if (!authUser) throw new Error('Failed to create account')

      // Fetch the complete profile
      const profile = await supabaseAuth.getUserProfile(authUser.id)
      
      const newUser = {
        id: authUser.id,
        email: authUser.email,
        fullName: profile?.full_name || fullName,
        userType: profile?.user_type || userType,
        avatarUrl: profile?.avatar_url,
        bio: profile?.bio,
      }

      setUser(newUser)
      return newUser
    } catch (error) {
      console.error('[AuthContext] Signup error:', error)
      throw error
    }
  }

  const login = async (email, password) => {
    try {
      const { user: authUser, error } = await supabaseAuth.signIn(email, password)

      if (error) throw new Error(error)
      if (!authUser) throw new Error('Login failed')

      // Fetch user profile to get the userType
      const profile = await supabaseAuth.getUserProfile(authUser.id)
      
      if (!profile) {
        throw new Error('User profile not found')
      }

      const loggedInUser = {
        id: authUser.id,
        email: authUser.email,
        fullName: profile.full_name,
        userType: profile.user_type,
        avatarUrl: profile.avatar_url,
        bio: profile.bio,
      }

      setUser(loggedInUser)
      return loggedInUser
    } catch (error) {
      console.error('[AuthContext] Login error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await supabaseAuth.signOut()
      setUser(null)
    } catch (error) {
      console.error('[AuthContext] Logout error:', error)
      throw error
    }
  }

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}