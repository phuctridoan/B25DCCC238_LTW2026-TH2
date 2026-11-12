import React from 'react';

const PowerUps = ({ disabled, used, isDoubleActive, onSwap, onDouble, onFreeze }) => {
  const getBtnStyle = (isUsed, isActive) => ({
    padding: '10px 16px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: isActive ? '#28a745' : isUsed || disabled ? '#ccc' : '#17a2b8',
    color: '#fff',
    fontWeight: 'bold',
    cursor: isUsed || disabled ? 'not-allowed' : 'pointer',
    fontSize: '15px'
  });

  return (
    <div style={{ display: 'flex', gap: '12px', margin: '15px 0', flexWrap: 'wrap' }}>
      <button
        type="button"
        disabled={disabled || used.swap}
        onClick={onSwap}
        style={getBtnStyle(used.swap, false)}
      >
        Đổi câu hỏi
      </button>
      <button
        type="button"
        disabled={disabled || used.double}
        onClick={onDouble}
        style={getBtnStyle(used.double, isDoubleActive)}
      >
        {isDoubleActive ? 'Đang nhân đôi' : 'Nhân đôi'}
      </button>
      <button
        type="button"
        disabled={disabled || used.freeze}
        onClick={onFreeze}
        style={getBtnStyle(used.freeze, false)}
      >
        Dừng giờ
      </button>
    </div>
  );
};

export default PowerUps;