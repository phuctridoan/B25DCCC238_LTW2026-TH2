import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ loading, error }) => {
  return (
    <div>
      <NavBar />
      <main style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        {loading && <p style={{ fontSize: '18px' }}>Đang tải câu hỏi...</p>}
        {error && <p style={{ color: 'red', fontSize: '18px' }}>{error}</p>}
        {!loading && !error && <Outlet />}
      </main>
    </div>
  );
};

export default Layout;