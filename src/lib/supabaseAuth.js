import { supabase } from './supabaseClient'

export const supabaseAuth = {
  signUp: async (email, password, fullName, userType = 'customer') => {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) throw authError
      if (!authData.user) throw new Error('Failed to create user')

      // Wait a moment for auth user to be fully created
      await new Promise(resolve => setTimeout(resolve, 500))

      // Create user profile in users table
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            email,
            full_name: fullName,
            user_type: userType,
          },
        ])
        .select()

      if (error) {
        console.error('[supabaseAuth] Error creating user profile:', error)
        throw error
      }

      // If creative, create store
      if (userType === 'creative') {
        const storeSlug = fullName.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now()
        const { error: storeError } = await supabase
          .from('creative_stores')
          .insert([
            {
              creative_id: authData.user.id,
              store_name: `${fullName}'s Store`,
              store_slug: storeSlug,
            },
          ])
        
        if (storeError) {
          console.error('[supabaseAuth] Error creating store:', storeError)
        }
      }

      return { user: authData.user, error: null }
    } catch (error) {
      console.error('[supabaseAuth] SignUp error:', error)
      return { user: null, error: error.message }
    }
  },

  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      if (!data.user) throw new Error('Login failed')
      
      return { user: data.user, error: null }
    } catch (error) {
      console.error('[supabaseAuth] SignIn error:', error)
      return { user: null, error: error.message }
    }
  },

  getCurrentUser: async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return user
    } catch (error) {
      console.error('[supabaseAuth] Error getting current user:', error)
      return null
    }
  },

  getUserProfile: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('[supabaseAuth] Error fetching user profile:', error)
        throw error
      }
      
      return data
    } catch (error) {
      console.error('[supabaseAuth] getUserProfile error:', error)
      return null
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('[supabaseAuth] SignOut error:', error)
      return { error: error.message }
    }
  },

  getSession: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      return session
    } catch (error) {
      console.error('[supabaseAuth] Error getting session:', error)
      return null
    }
  },
}