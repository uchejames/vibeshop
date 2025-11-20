// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// NEW CORRECT WAY (2024–2025) — use createClient directly
import { createClient } from '@supabase/supabase-js'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

// Create Supabase client (replace with your actual URL and anon key)
const supabaseUrl = 'https://hzqpiwlunhtfpqipjzka.supabase.co'
const supabaseAnonKey = 'your-anon-key-here' // ← get from Supabase → Settings → API

const supabase = createClient(supabaseUrl, supabaseAnonKey)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
)