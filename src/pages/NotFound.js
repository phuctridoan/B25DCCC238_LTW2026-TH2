import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>404 - Không tìm thấy trang</h2>
      <Link to="/" style={{ color: 'orange', textDecoration: 'underline', fontSize: '18px' }}>
        Về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;