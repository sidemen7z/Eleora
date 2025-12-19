import React, { useEffect, useState } from 'react';
import { supabase } from '../../config/supabase';
import { formatPrice } from '../../utils/formatters';

interface Order {
  id: number;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  total_amount: number;
  status: string;
  payment_method: string;
  shipping_address: string;
  created_at: string;
  order_items?: any[];
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      alert('Order status updated!');
      loadOrders();
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  if (loading) {
    return <div className="admin-loading">Loading orders...</div>;
  }

  return (
    <div className="admin-orders">
      <div className="section-header">
        <h1>🛒 Orders Management</h1>
        <div className="order-stats">
          <span className="stat-badge">Total: {orders.length}</span>
          <span className="stat-badge pending">Pending: {orders.filter(o => o.status === 'pending').length}</span>
        </div>
      </div>

      <div className="orders-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Contact</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td><strong>#{order.id}</strong></td>
                <td>{order.guest_name || 'Guest'}</td>
                <td>
                  <div className="contact-info">
                    <div>{order.guest_email}</div>
                    <div>{order.guest_phone}</div>
                  </div>
                </td>
                <td><strong>₹{formatPrice(order.total_amount)}</strong></td>
                <td>
                  <span className="payment-badge">{order.payment_method || 'COD'}</span>
                </td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className={`status-select status-${order.status}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                <td>
                  <button className="btn-view" onClick={() => viewOrderDetails(order)}>
                    👁️ View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details - #{selectedOrder.id}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="order-details">
              <div className="detail-section">
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> {selectedOrder.guest_name}</p>
                <p><strong>Email:</strong> {selectedOrder.guest_email}</p>
                <p><strong>Phone:</strong> {selectedOrder.guest_phone}</p>
                <p><strong>Address:</strong> {selectedOrder.shipping_address}</p>
              </div>

              <div className="detail-section">
                <h3>Order Information</h3>
                <p><strong>Order ID:</strong> #{selectedOrder.id}</p>
                <p><strong>Date:</strong> {new Date(selectedOrder.created_at).toLocaleString()}</p>
                <p><strong>Status:</strong> <span className={`status-badge status-${selectedOrder.status}`}>{selectedOrder.status}</span></p>
                <p><strong>Payment:</strong> {selectedOrder.payment_method || 'COD'}</p>
              </div>

              <div className="detail-section">
                <h3>Order Items</h3>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Size</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.order_items?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.product_name}</td>
                        <td>{item.size}</td>
                        <td>{item.quantity}</td>
                        <td>₹{formatPrice(item.unit_price)}</td>
                        <td>₹{formatPrice(item.total_price)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={4}><strong>Total Amount</strong></td>
                      <td><strong>₹{formatPrice(selectedOrder.total_amount)}</strong></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
