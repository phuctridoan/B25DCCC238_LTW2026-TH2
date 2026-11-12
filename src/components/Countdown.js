import React, { useState, useEffect } from 'react';

const Countdown = ({ onFinish }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 1) {
      const timer = setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (count === 1) {
      const timer = setTimeout(() => {
        onFinish();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [count, onFinish]);

  return (
    <div style={{ textAlign: 'center', padding: '100px 0' }}>
      <p style={{ fontSize: '24px', color: '#666', marginBottom: '10px' }}>Chuẩn bị...</p>
      <div style={{ fontSize: '110px', fontWeight: 'bold', color: 'orange' }}>
        {count}
      </div>
    </div>
  );
};

export default Countdown;