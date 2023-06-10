import axios from 'axios';
import config from '../../config.json';
const { useState, useEffect } = require("react");
const { useNavigate } = require("react-router-dom");

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async() => {
      const { data } = await axios.get(config.apiProducts);
      setProducts(data);
    };
    fetchProducts();
  }, [])

  console.log(products)

  const handleDelete = async (product) => {
    try {
      setProducts(products.filter(p => p.id !== product.id))

      await axios.delete(`${config.apiProducts}/${product.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-8 h-screen bg-gray-100">
      <div className="flex row justify-between">
        <div className="col-md-6">
          <h1 className="text-4xl font-bold text-gray-900">CRUD Products</h1>
        </div>
        <div className="col-md-6">
          <button onClick={() => navigate("/product/new")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create
          </button>
        </div>
      </div>
      <br />

      <div className="overflow-auto rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-left text-sm font-semibold tracking-wide">Nama</th>
              <th className="p-3 text-left text-sm font-semibold tracking-wide">Brand</th>
              <th className="p-3 text-left text-sm font-semibold tracking-wide">Deskripsi</th>
              <th className="p-3 text-left text-sm font-semibold tracking-wide">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {
              products.map((product, index) =>
                <tr key={index}>
                  <td className="p-3 text-sm text-gray-700">{ product.name }</td>
                  <td className="p-3 text-sm text-gray-700">{ product.brand }</td>
                  <td className="p-3 text-sm text-gray-700">{ product.description }</td>
                  <td className="p-3 text-sm text-gray-700">
                    <button onClick={() => navigate(`/product/${product.id}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Products;