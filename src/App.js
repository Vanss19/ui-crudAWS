import { Route, Routes } from 'react-router-dom';
import './App.css';
import Products from './pages/Products/Products';
import Product from './pages/Product/Product';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Products />}></Route>
        <Route path='/product/:id' element={<Product />}></Route>
      </Routes>
    </>
  );
}

export default App;
