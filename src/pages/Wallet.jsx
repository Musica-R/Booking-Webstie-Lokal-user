import React from 'react';
import './Wallet.css';

const transactions = [
  { id: 1, label: 'Payment for Electrician', date: '15 May 2026', amount: -298, type: 'debit' },
  { id: 2, label: 'Cashback received', date: '12 May 2026', amount: 50, type: 'credit' },
  { id: 3, label: 'Wallet top-up', date: '08 May 2026', amount: 500, type: 'credit' },
  { id: 4, label: 'Payment for Plumber', date: '02 May 2026', amount: -549, type: 'debit' },
];

export default function Wallet() {
  return (
    <div className="wallet-page">
      {/* Balance Card */}
      <div className="balance-card">
        <p className="balance-label">Wallet Balance</p>
        <p className="balance-amount">₹450<span>.00</span></p>
        <div className="wallet-actions">
          <button className="btn wallet-add-btn">+ Add Money</button>
          <button className="btn wallet-withdraw-btn">Withdraw</button>
        </div>
      </div>

      {/* Transactions */}
      <div className="card transactions-card">
        <div className="tx-header">
          <h3>Recent Transactions</h3>
        </div>
        <div className="tx-list">
          {transactions.map(tx => (
            <div className="tx-item" key={tx.id}>
              <div className={`tx-icon ${tx.type}`}>
                {tx.type === 'credit'
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5m-7 7l7-7 7 7" /></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14m7-7l-7 7-7-7" /></svg>
                }
              </div>
              <div className="tx-info">
                <p className="tx-label">{tx.label}</p>
                <p className="tx-date">{tx.date}</p>
              </div>
              <p className={`tx-amount ${tx.type}`}>
                {tx.type === 'credit' ? '+' : '-'}₹{Math.abs(tx.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}