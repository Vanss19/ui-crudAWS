import axios from 'axios'
import config from '../../config.json'
import { useNavigate, useParams } from "react-router-dom"
const { useEffect, useState } = require("react")

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams()

  const [product, setProduct] = useState({
    name: '',
    brand: '',
    description: ''
  })

  useEffect(() => {
    if (id === 'new') return;

    const fetchProduct = async () => {
      const { data } = await axios.get(`${config.apiProducts}/${id}`)
      setProduct(data)
    }

    fetchProduct()
  }, [id])

  const handleChange = (e) => {
    const productClone = {...product}
    productClone[e.target.name] = e.target.value
    setProduct(productClone)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (id === 'new') {
        await axios.post(config.apiProducts, product)
        return navigate('/')
      } else {
        await axios.put(`${config.apiProducts}/${id}`, product)
        return navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-8 h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900">CRUD Product</h1>
      <br />
      <div>
        <form action="" className="flex flex-col justify-center">
          <div>
            <input type="text" name="name" className="rounded w-3/6" placeholder="Nama Barang" value={product.name} onChange={handleChange} />
          </div>
          <br />
          <div>
            <input type="text" name="brand" className="rounded w-3/6" placeholder="Nama Brand" value={product.brand} onChange={handleChange} />
          </div>
          <br />
          <div>
            <textarea name="description" className="rounded w-3/6" placeholder="Deskripsi" value={product.description} onChange={handleChange} />
          </div>
          <br />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-3/6"
          >
            { id === 'new' ? 'Buat' : 'Update' }
          </button>
        </form>
      </div>
    </div>
  )
}

export default Product