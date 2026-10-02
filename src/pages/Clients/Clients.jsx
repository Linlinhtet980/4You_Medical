import { useState } from 'react';
import styles from './Clients.module.css';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import ClientModal from '../../components/Clients/ClientModal/ClientModal';

const initialClients = [
  { id: 'C-001', name: 'City Hospital', type: 'Hospital', contact: '09-12345678', location: 'Yangon', status: 'active' },
  { id: 'C-002', name: 'Shwe Pharmacy', type: 'Pharmacy', contact: '09-98765432', location: 'Mandalay', status: 'active' },
  { id: 'C-003', name: 'Care Clinic', type: 'Clinic', contact: '09-55555555', location: 'Bago', status: 'inactive' },
];

const Clients = () => {
  const [clients, setClients] = useState(initialClients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleOpenAdd = () => {
    setSelectedClient(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleSave = (clientData) => {
    if (selectedClient) {
      setClients(clients.map(c => c.id === clientData.id ? clientData : c));
      toast.success('Client updated successfully!');
    } else {
      setClients([clientData, ...clients]);
      toast.success('New client added!');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete this client?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setClients(clients.filter(c => c.id !== id));
        toast.success('Client deleted!');
      }
    });
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerSection}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>Clients Management</h1>
          <p className={styles.pageSubtitle}>Manage your B2B customers, hospitals, and pharmacies.</p>
        </div>
        <button className={styles.addBtn} onClick={handleOpenAdd}>
          <FiPlus /> Add New Client
        </button>
      </div>

      <div className={styles.card}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Client Name</th>
              <th>Type</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <td style={{ color: 'var(--text-500)' }}>{client.id}</td>
                <td style={{ fontWeight: 600 }}>{client.name}</td>
                <td>{client.type}</td>
                <td>{client.contact}</td>
                <td>{client.location}</td>
                <td>
                  <span className={`${styles.badge} ${client.status === 'active' ? styles.active : styles.inactive}`}>
                    {client.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className={styles.actionBtn} onClick={() => handleOpenEdit(client)}><FiEdit /></button>
                    <button className={styles.actionBtn} onClick={() => handleDelete(client.id)}><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '30px' }}>No clients found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ClientModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={selectedClient}
      />
    </div>
  );
};

export default Clients;

