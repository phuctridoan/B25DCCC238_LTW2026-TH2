import React from 'react';
import { TIME_PER_QUESTION } from '../data';

const TimeBar = ({ timeLeft, isFrozen }) => {
  const percent = Math.max(0, (timeLeft / TIME_PER_QUESTION) * 100);
  const isDanger = timeLeft <= 5;

  return (
    <div style={{ margin: '15px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontWeight: 'bold', color: isDanger ? '#dc3545' : '#333' }}>
          {isFrozen ? `Còn ${timeLeft} giây (đã dừng)` : `Còn ${timeLeft} giây`}
        </span>
      </div>
      <div style={{ width: '100%', height: '16px', backgroundColor: '#e9ecef', borderRadius: '8px', overflow: 'hidden' }}>
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            backgroundColor: isDanger ? '#dc3545' : '#28a745',
            transition: 'width 0.3s ease, background-color 0.3s ease'
          }}
        />
      </div>
    </div>
  );
};

export default TimeBar;