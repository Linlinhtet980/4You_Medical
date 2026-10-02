import { useState } from 'react';
import styles from './Dashboard.module.css';
import initialProductsData from '../../data/product.json';
import analyticsData from '../../data/analytics.json';
import StatCard from '../../components/Dashboard/StatCard/StatCard';
import RecentTable from '../../components/Dashboard/RecentTable/RecentTable';
import { FiBox, FiAlertCircle, FiCheckCircle, FiShoppingCart, FiAlertTriangle } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Dashboard = () => {
  // Use local state to allow UI updates on restock
  const [productsData, setProductsData] = useState(initialProductsData);

  // Logic: Calculate numbers from product.json
  const totalProducts = productsData.length;
  
  // Filter for 'out_of_stock' status
  const outOfStockCount = productsData.filter(p => p.status === 'out_of_stock').length;
  
  // Calculate Low Stock (e.g., active but less than 20 wholesale units)
  const lowStockCount = productsData.filter(p => p.status === 'active' && p.stock_quantity > 0 && p.stock_quantity < 20).length;
  
  // Get 5 recent products for the table
  const recentProducts = productsData.slice(0, 5);

  // Use actual stock values for the Low Stock side panel to keep render pure and deterministic
  const lowStockItems = productsData
    .filter(p => p.status === 'active' && p.stock_quantity > 0 && p.stock_quantity < 20)
    .slice(0, 4)
    .map(p => ({
      ...p,
      currentStock: p.stock_quantity
    }));

  const handleRestock = () => {
    if (lowStockItems.length === 0) {
      toast.info('No items need restocking right now!');
      return;
    }

    Swal.fire({
      title: 'Auto-Restock System',
      text: `Do you want to order 50 boxes for each of the ${lowStockItems.length} low stock items from the supplier?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'var(--primary-600)',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, send order!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Increase stock_quantity by 50 for these items
        const lowStockIds = lowStockItems.map(item => item.id);
        
        setProductsData(prevData => prevData.map(product => {
          if (lowStockIds.includes(product.id)) {
            return { ...product, stock_quantity: product.stock_quantity + 50 };
          }
          return product;
        }));

        toast.success('Restock order sent! Stock updated.');
      }
    });
  };

  return (
    <div className={styles.dashboardWrapper}>
      {/* Header Area */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard Overview</h1>
        <p className={styles.pageSubtitle}>Welcome back, here is what is happening with your store today.</p>
      </div>

      {/* Stats Cards Row */}
      <div className={styles.statsGrid}>
        <StatCard 
          title="Total Products" 
          value={totalProducts} 
          icon={<FiBox />} 
          colorTheme="primary" 
        />
        <StatCard 
          title="In Stock & Active" 
          value={totalProducts - outOfStockCount} 
          icon={<FiCheckCircle />} 
          colorTheme="secondary" 
        />
        <StatCard 
          title="Low Stock Alert" 
          value={lowStockCount} 
          icon={<FiShoppingCart />} 
          colorTheme="accent" 
        />
        <StatCard 
          title="Out of Stock" 
          value={outOfStockCount} 
          icon={<FiAlertCircle />} 
          colorTheme="error" 
        />
      </div>

      {/* Analytics Chart */}
      <div style={{ marginTop: '30px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--background-200)', padding: '20px' }}>
        <h3 style={{ marginBottom: '20px', color: 'var(--text-800)' }}>Revenue Analytics (Current Year)</h3>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary-500)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--primary-500)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="var(--text-400)" />
              <YAxis stroke="var(--text-400)" tickFormatter={(value) => `${value / 1000000}M`} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--background-200)" />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                formatter={(value) => [`${value.toLocaleString()} MMK`, 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="var(--primary-600)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Grid for Table and Alerts */}
      <div className={styles.bottomGrid}>
        
        {/* Left: Recent Table */}
        <div>
          <RecentTable products={recentProducts} />
        </div>

        {/* Right: Low Stock Alerts Panel */}
        <div>
          <div style={{ backgroundColor: 'var(--background-50)', padding: '20px', borderRadius: '12px', border: '1px solid var(--error-100)' }}>
            <h3 style={{ color: 'var(--error-500)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '1.1rem' }}>
              <FiAlertTriangle /> Low Stock Alerts
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {lowStockItems.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--background-200)', paddingBottom: '15px' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-800)' }}>{item.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-500)' }}>{item.category}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', color: 'var(--error-500)' }}>{item.currentStock} left</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-400)' }}>Min: 20</div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={handleRestock}
              style={{ width: '100%', padding: '12px', marginTop: '15px', backgroundColor: 'var(--error-50)', color: 'var(--error-700)', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
            >
              Order Restock
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

