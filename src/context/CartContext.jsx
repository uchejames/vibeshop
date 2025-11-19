import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(undefined)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('vibeshop_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
        const savedCart = localStorage.getItem('vibeshop_cart')
        if (savedCart) {
          setItems(JSON.parse(savedCart))
        }
      } catch (err) {
        console.error('Error loading cart:', err)
      }
    }
    setLoading(false)
  }, [])

  const addToCart = (product, quantity = 1) => {
    setItems(prevItems => {
      const existing = prevItems.find(item => item.product_id === product.id)
      let updated
      if (existing) {
        updated = prevItems.map(item =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        updated = [...prevItems, {
          id: `cart_${Date.now()}`,
          product_id: product.id,
          quantity,
          product
        }]
      }
      localStorage.setItem('vibeshop_cart', JSON.stringify(updated))
      return updated
    })
  }

  const removeFromCart = (cartItemId) => {
    setItems(prevItems => {
      const updated = prevItems.filter(item => item.id !== cartItemId)
      localStorage.setItem('vibeshop_cart', JSON.stringify(updated))
      return updated
    })
  }

  const updateQuantity = (cartItemId, quantity) => {
    setItems(prevItems => {
      const updated = prevItems.map(item =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
      localStorage.setItem('vibeshop_cart', JSON.stringify(updated))
      return updated
    })
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem('vibeshop_cart')
  }

  const total = items.reduce((sum, item) => {
    const itemPrice = (item.product?.price_ngn || 0) * item.quantity
    return sum + itemPrice
  }, 0)

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      total, 
      loading 
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
