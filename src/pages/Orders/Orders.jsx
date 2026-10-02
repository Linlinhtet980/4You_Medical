import { useState } from 'react';
import styles from './Orders.module.css';
import { FiPlus, FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import OrderModal from '../../components/Orders/OrderModal/OrderModal';
import InvoiceModal from '../../components/Orders/InvoiceModal/InvoiceModal';

const initialOrders = [
  { id: 'ORD-1001', client: 'City Hospital', date: '2023-10-25', items: 12, total: 450000, status: 'pending' },
  { id: 'ORD-1002', client: 'Shwe Pharmacy', date: '2023-10-24', items: 5, total: 125000, status: 'shipped' },
  { id: 'ORD-1003', client: 'Care Clinic', date: '2023-10-20', items: 3, total: 85000, status: 'delivered' },
];

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Invoice state
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [invoiceOrder, setInvoiceOrder] = useState(null);

  const handleOpenAdd = () => {
    setSelectedOrder(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleOpenInvoice = (order) => {
    setInvoiceOrder(order);
    setIsInvoiceOpen(true);
  };

  const handleSave = (orderData) => {
    if (selectedOrder) {
      setOrders(orders.map(o => o.id === orderData.id ? orderData : o));
      toast.success('Order updated successfully!');
    } else {
      setOrders([orderData, ...orders]);
      toast.success('New order created!');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete this order?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setOrders(orders.filter(o => o.id !== id));
        toast.success('Order deleted!');
      }
    });
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerSection}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>Orders Management</h1>
          <p className={styles.pageSubtitle}>Track incoming wholesale orders and their statuses.</p>
        </div>
        <button className={styles.addBtn} onClick={handleOpenAdd}>
          <FiPlus /> Create Order
        </button>
      </div>

      <div className={styles.card}>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Client</th>
              <th>Date</th>
              <th>Total Items</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td style={{ fontWeight: 600, color: 'var(--primary-600)' }}>{order.id}</td>
                <td style={{ fontWeight: 500 }}>{order.client}</td>
                <td>{order.date}</td>
                <td>{order.items} Boxes</td>
                <td style={{ fontWeight: 600 }}>{Number(order.total).toLocaleString()} MMK</td>
                <td>
                  <span className={`${styles.badge} ${styles[order.status]}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className={styles.actionBtn} onClick={() => handleOpenInvoice(order)} title="View Invoice">
                      <FiEye />
                    </button>
                    <button className={styles.actionBtn} onClick={() => handleOpenEdit(order)} title="Edit Order">
                      <FiEdit />
                    </button>
                    <button className={styles.actionBtn} onClick={() => handleDelete(order.id)} title="Delete Order">
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '30px' }}>No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <OrderModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={selectedOrder}
      />

      <InvoiceModal 
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        order={invoiceOrder}
      />
    </div>
  );
};

export default Orders;
