import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/antd.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SuperAdmin from './Pages/SuperAdmin/SuperAdmin';
import Users from './Pages/Users/Users';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <BrowserRouter basename='/'>
    <Routes>
      <Route path='superadmin/*' element={<SuperAdmin/>}/>
      <Route path="/users/*" element ={<Users/>}/>
      <Route path="/*" element={<App />}/>

    </Routes>
    
   </BrowserRouter>
  // </React.StrictMode>
);


