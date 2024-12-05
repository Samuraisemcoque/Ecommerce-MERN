import { Route, Routes } from "react-router-dom"; // Importa as funções Route e Routes da biblioteca "react-router-dom"
import AuthLayout from "./components/auth/layout"; // Importa o layout de autenticação
import AuthLogin from "./pages/auth/login"; // Importa a página de login
import AuthRegister from "./pages/auth/register"; // Importa a página de registro
import AdminLayout from "./components/admin-view/layout"; // Importa o layout do administrador
import AdminDashboard from "./pages/admin-view/dashboard"; // Importa a página de dashboard do administrador
import AdminProducts from "./pages/admin-view/products"; // Importa a página de produtos do administrador
import AdminOrders from "./pages/admin-view/orders"; // Importa a página de pedidos do administrador
import AdminFeatures from "./pages/admin-view/features"; // Importa a página de recursos do administrador
import SalesReport from "./pages/admin-view/SalesReport"; // Importação do novo componente de relatório de vendas
import ShoppingLayout from "./components/shopping-view/layout"; // Importa o layout de compras
import NotFound from "./pages/not-found"; // Importa a página de não encontrado
import ShoppingHome from "./pages/shopping-view/home"; // Importa a página inicial de compras
import ShoppingListing from "./pages/shopping-view/listing"; // Importa a página de listagem de compras
import ShoppingCheckout from "./pages/shopping-view/checkout"; // Importa a página de checkout de compras
import ShoppingAccount from "./pages/shopping-view/account"; // Importa a página de conta de compras
import CheckAuth from "./components/common/check-auth"; // Importa o componente de verificação de autenticação
import UnauthPage from "./pages/unauth-page"; // Importa a página de acesso não autorizado
import { useDispatch, useSelector } from "react-redux"; // Importa os hooks useDispatch e useSelector da biblioteca "react-redux"
import { useEffect } from "react"; // Importa o hook useEffect da biblioteca "react"
import { checkAuth } from "./store/auth-slice"; // Importa a ação checkAuth do slice de autenticação
import { Skeleton } from "@/components/ui/skeleton"; // Importa o componente Skeleton para carregamento
import PaypalReturnPage from "./pages/shopping-view/paypal-return"; // Importa a página de retorno do Paypal
import PaymentSuccessPage from "./pages/shopping-view/payment-success"; // Importa a página de sucesso de pagamento
import SearchProducts from "./pages/shopping-view/search"; // Importa a página de busca de produtos

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  ); // Obtém o estado de autenticação, usuário e carregamento do Redux
  const dispatch = useDispatch(); // Obtém a função dispatch do Redux

  useEffect(() => {
    dispatch(checkAuth()); // Verifica a autenticação do usuário ao carregar o componente
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />; // Exibe um esqueleto de carregamento enquanto está carregando

  console.log(isLoading, user);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="sales-report" element={<SalesReport />} /> {/* Nova rota */}
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
