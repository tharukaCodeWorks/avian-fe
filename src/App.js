import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/forgot-password';
import PrivateRoute from './util/PrivateRoute';
import AnonymousAuth from './util/AnonymousAuth';
import EmailVerify from './pages/EmailVerify';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/ResetPassword';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Items from './pages/Items';
import Reports from './pages/Reports';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <Router>
        <Switch>
            <AnonymousAuth path="/auth/login">
              <Login />
            </AnonymousAuth>
            <AnonymousAuth path="/auth/register">
              <Register />
            </AnonymousAuth>
            <AnonymousAuth path="/auth/forgot-password">
              <ForgotPassword />
            </AnonymousAuth>
            <AnonymousAuth path="/auth/reset-password"> 
              <ResetPassword />
            </AnonymousAuth> 
            <AnonymousAuth path="/auth/email-verify">
              <EmailVerify />
            </AnonymousAuth>
            <PrivateRoute path="/home" >
              <Home />
            </PrivateRoute>
            <PrivateRoute path="/orders" >
              <Orders />
            </PrivateRoute>
            <PrivateRoute path="/items" >
              <Items />
            </PrivateRoute>
            <PrivateRoute path="/reports" >
              <Reports />
            </PrivateRoute>
            <Route to="/">
              <Landing />
            </Route>
            <Route to="*">
              <NotFound />
            </Route>
          </Switch>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
      </Router>
  );
}

export default App;
