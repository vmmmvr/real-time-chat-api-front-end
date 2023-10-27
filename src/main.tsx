import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {  BrowserRouter, Route, Routes} from "react-router-dom";
import { Provider } from 'react-redux';
import {store} from './redux';
import AuthRoute from './pages/auth/auth-route.tsx';
import Login from './pages/auth/login.tsx';
import Auth from './pages/auth/auth.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
      <BrowserRouter>
    
    <Routes>
    
    <Route  path='/auth/*' element={  <Auth /> } />
    <Route path='/*' element={  
    <AuthRoute> 
      <App />
     </AuthRoute>
     }
      />

      </Routes>
    </BrowserRouter>
      </Provider>
   
  </React.StrictMode>,
)
