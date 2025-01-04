import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupplierProductOrder = () => {
  const [notification, setNotification] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
  ]);
  const [orders, setOrders] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supplierForm, setSupplierForm] = useState({ name: '', contact: '' });
  const [orderForm, setOrderForm] = useState({ supplierId: '', productId: '', quantity: 1 });

  
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/suppliers');
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5001/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchSuppliers();
    fetchOrders();
  }, []); 

  
  const handleSupplierSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/suppliers', supplierForm);
      setSuppliers([...suppliers, response.data]);
      setSupplierForm({ name: '', contact: '' });
      showNotification('Supplier added successfully!');
    } catch (error) {
      showNotification('Error adding supplier');
      console.error(error);
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const newOrder = {
        supplierId: orderForm.supplierId,
        productId: orderForm.productId,
        quantity: orderForm.quantity,
        total: calculateTotal(),
        timestamp: new Date().toISOString(),
      };
      const response = await axios.post('http://localhost:5001/orders', newOrder);
      setOrders([...orders, response.data]);
      setOrderForm({ supplierId: '', productId: '', quantity: 1 });
      showNotification('Order placed successfully!');
    } catch (error) {
      showNotification('Error placing order');
      console.error(error);
    }
    setIsSubmitting(false);
  };


  const calculateTotal = () => {
    const product = products.find((p) => p.id === parseInt(orderForm.productId));
    return product ? product.price * orderForm.quantity : 0;
  };

 
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div>
      {notification && <div>{notification}</div>}

      <h2>Add Supplier</h2>
      <form onSubmit={handleSupplierSubmit}>
        <input
          type="text"
          placeholder="Supplier Name"
          value={supplierForm.name}
          onChange={(e) => setSupplierForm({ ...supplierForm, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Contact"
          value={supplierForm.contact}
          onChange={(e) => setSupplierForm({ ...supplierForm, contact: e.target.value })}
          required
        />
        <button type="submit">Add Supplier</button>
      </form>

      <h2>Suppliers</h2>
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.id}>
            {supplier.name} - {supplier.contact}
          </li>
        ))}
      </ul>

      <h2>Place Order</h2>
      <form onSubmit={handleOrderSubmit}>
        <select
          value={orderForm.supplierId}
          onChange={(e) => setOrderForm({ ...orderForm, supplierId: e.target.value })}
          required
        >
          <option value="">Select Supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </select>
        <select
          value={orderForm.productId}
          onChange={(e) => setOrderForm({ ...orderForm, productId: e.target.value })}
          required
        >
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} - ₹{product.price}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={orderForm.quantity}
          onChange={(e) => setOrderForm({ ...orderForm, quantity: parseInt(e.target.value) || 1 })}
          min="1"
          required
        />
        <div>Total: ₹{calculateTotal()}</div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>

      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Supplier: {suppliers.find((s) => s.id === parseInt(order.supplierId))?.name}, Product: {products.find((p) => p.id === parseInt(order.productId))?.name}, Quantity: {order.quantity}, Total: ₹{order.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierProductOrder;
