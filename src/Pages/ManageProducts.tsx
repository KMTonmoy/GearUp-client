import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    image: '',
    brand: '',
    model: '',
    price: 0,
    type: '',
    description: '',
    quantity: 0,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data.data);
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitProduct = async () => {
    const response = await axios.post('http://localhost:5000/api/products', newProduct);
    if (response.data.success) {
      setProducts([...products, response.data.product]);
      setModalOpen(false);
      toast.success('Product added successfully!');
    }
  };

  const handleUpdateProduct = async () => {
    const response = await axios.put(`http://localhost:5000/api/products/${selectedProduct._id}`, selectedProduct);
    if (response.data.success) {
      setProducts(products.map((prod) => (prod._id === selectedProduct._id ? selectedProduct : prod)));
      setUpdateModalOpen(false);
      toast.success('Product updated successfully!');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(`http://localhost:5000/api/products/${id}`);
        if (response.data.success) {
          setProducts(products.filter((prod) => prod._id !== id));
          Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
        }
      }
    });
  };

  const handleAddProductClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleEditProductClick = (product: any) => {
    setSelectedProduct(product);
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  const handleUpdateInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSelectedProduct((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-full mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">Manage Products</h2>

      <button
        onClick={handleAddProductClick}
        className="py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 mb-6"
      >
        Add New Product
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h4 className="text-lg font-medium text-gray-800">{product.name}</h4>
            <p className="text-sm text-gray-500">{product.brand} - {product.model}</p>
            <p className="text-sm text-gray-500">{product.type}</p>
            <p className="text-sm text-gray-500">{product.price} USD</p>
            <p className="text-sm text-gray-500">{product.description}</p>
            <p className="text-sm text-gray-500">In stock: {product.quantity}</p>

            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleEditProductClick(product)}
                className="text-yellow-600 hover:text-yellow-800 transition duration-200"
              >
                <i className="fas fa-edit"></i> Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="text-red-600 hover:text-red-800 transition duration-200"
              >
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding Product */}
      <Modal open={modalOpen} onClose={handleCloseModal} center>
        <h3 className="text-2xl font-semibold mb-4">Add New Product</h3>
        <div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={newProduct.brand}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
            <input
              type="text"
              id="model"
              name="model"
              value={newProduct.model}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
            <select
              id="type"
              name="type"
              value={newProduct.type}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Mountain">Mountain</option>
              <option value="Road">Road</option>
              <option value="Hybrid">Hybrid</option>
              <option value="BMX">BMX</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleCloseModal}
              className="py-2 px-4 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitProduct}
              className="py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Add Product
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal for Updating Product */}
      <Modal open={updateModalOpen} onClose={handleCloseUpdateModal} center>
        <h3 className="text-2xl font-semibold mb-4">Update Product</h3>
        <div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={selectedProduct?.name || ''}
              onChange={handleUpdateInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={selectedProduct?.image || ''}
              onChange={handleUpdateInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={selectedProduct?.brand || ''}
              onChange={handleUpdateInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
            <input
              type="text"
              id="model"
              name="model"
              value={selectedProduct?.model || ''}
              onChange={handleUpdateInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={selectedProduct?.price || 0}
              onChange={handleUpdateInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
            <select
              id="type"
              name="type"
              value={selectedProduct?.type || ''}
              onChange={handleUpdateInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Mountain">Mountain</option>
              <option value="Road">Road</option>
              <option value="Hybrid">Hybrid</option>
              <option value="BMX">BMX</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={selectedProduct?.description || ''}
              onChange={handleUpdateInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={selectedProduct?.quantity || 0}
              onChange={handleUpdateInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleCloseUpdateModal}
              className="py-2 px-4 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateProduct}
              className="py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Update Product
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageProducts;
