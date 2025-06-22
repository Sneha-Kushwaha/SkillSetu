// src/App.jsx
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
