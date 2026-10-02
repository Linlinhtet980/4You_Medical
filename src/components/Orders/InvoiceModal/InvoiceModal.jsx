import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FiX, FiPrinter } from 'react-icons/fi';
import styles from './InvoiceModal.module.css'; // Reuse some basic modal styles

const InvoiceModal = ({ isOpen, onClose, order }) => {
  const componentRef = useRef(null);
  
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Invoice_${order?.id}`,
  });

  if (!isOpen || !order) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} style={{ maxWidth: '800px' }}>
        <div className={styles.modalHeader}>
          <h2>Invoice Preview</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handlePrint} className={styles.printBtn}><FiPrinter /> Print PDF</button>
            <button className={styles.closeBtn} onClick={onClose}><FiX /></button>
          </div>
        </div>

        <div className={styles.modalBody}>
          {/* This is the printable area */}
          <div ref={componentRef} className={styles.invoiceContainer}>
            <div className={styles.invoiceHeader}>
              <div>
                <h1 style={{ color: 'var(--primary-600)', margin: 0 }}>4You Medical</h1>
                <p style={{ color: 'var(--text-500)', fontSize: '0.9rem' }}>Wholesale Medical Supplier</p>
                <p style={{ color: 'var(--text-500)', fontSize: '0.9rem' }}>Yangon, Myanmar</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h2 style={{ margin: 0, color: 'var(--text-800)' }}>INVOICE</h2>
                <p style={{ fontWeight: 'bold' }}>#{order.id}</p>
                <p>Date: {order.date}</p>
              </div>
            </div>

            <div className={styles.billTo}>
              <h3>Bill To:</h3>
              <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{order.client}</p>
              <p>Valued B2B Partner</p>
            </div>

            <table className={styles.invoiceTable}>
              <thead>
                <tr>
                  <th>Description</th>
                  <th style={{ textAlign: 'center' }}>Qty</th>
                  <th style={{ textAlign: 'right' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Medical Supplies (Assorted)</td>
                  <td style={{ textAlign: 'center' }}>{order.items} Boxes</td>
                  <td style={{ textAlign: 'right' }}>{Number(order.total).toLocaleString()} MMK</td>
                </tr>
                {/* Mock empty rows for realistic look */}
                <tr><td>&nbsp;</td><td></td><td></td></tr>
                <tr><td>&nbsp;</td><td></td><td></td></tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" style={{ textAlign: 'right', fontWeight: 'bold' }}>Subtotal:</td>
                  <td style={{ textAlign: 'right' }}>{Number(order.total).toLocaleString()} MMK</td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ textAlign: 'right', fontWeight: 'bold' }}>Tax (0%):</td>
                  <td style={{ textAlign: 'right' }}>0 MMK</td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '1.2rem' }}>Grand Total:</td>
                  <td style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--primary-600)' }}>
                    {Number(order.total).toLocaleString()} MMK
                  </td>
                </tr>
              </tfoot>
            </table>

            <div className={styles.invoiceFooter}>
              <p>Thank you for your business!</p>
              <p>If you have any questions about this invoice, please contact admin@4you.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
