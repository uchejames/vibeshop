import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProductPage from './pages/ProductPage'
import ShopPage from './pages/ShopPage'
import GeneratorPage from './pages/GeneratorPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import CreativeDashboard from './pages/CreativeDashboard/CreativeDashboard'
import ProductDetailPage from './pages/ProductDetailPage'
import CreativeStorePage from './pages/CreativeStorePage'
import CustomerDashboard from './pages/CustomerDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/generator" element={<GeneratorPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/dashboard/creative" element={<CreativeDashboard />} />
            <Route path="/dashboard/customer" element={<CustomerDashboard />} />
            <Route path="/store/:storeId/:productId" element={<ProductDetailPage />} />
            <Route path="/store/:storeId" element={<CreativeStorePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
