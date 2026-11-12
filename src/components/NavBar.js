import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const getNavStyle = ({ isActive }) => ({
    color: isActive ? 'orange' : '#333',
    fontWeight: isActive ? 'bold' : 'normal',
    textDecoration: 'none',
    marginRight: '20px',
    fontSize: '18px'
  });

  return (
    <nav style={{ padding: '15px 25px', borderBottom: '1px solid #ddd', backgroundColor: '#f8f9fa' }}>
      <NavLink to="/" end style={getNavStyle}>
        Trang chủ
      </NavLink>
      <NavLink to="/questions" style={getNavStyle}>
        Ngân hàng câu hỏi
      </NavLink>
      <NavLink to="/history" style={getNavStyle}>
        Lịch sử
      </NavLink>
    </nav>
  );
};

export default NavBar;