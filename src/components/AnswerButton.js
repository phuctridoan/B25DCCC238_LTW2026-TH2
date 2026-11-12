import React from 'react';

const AnswerButton = ({ label, option, onClick, disabled, isCorrect, isWrong, isFocused }) => {
  let bgColor = '#fff';
  let textColor = '#333';
  let borderColor = '#ccc';

  if (isCorrect) {
    bgColor = '#28a745';
    textColor = '#fff';
    borderColor = '#28a745';
  } else if (isWrong) {
    bgColor = '#dc3545';
    textColor = '#fff';
    borderColor = '#dc3545';
  } else if (isFocused) {
    borderColor = '#004085';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '16px 20px',
        textAlign: 'left',
        fontSize: '16px',
        borderRadius: '8px',
        border: `${isFocused ? '3px' : '2px'} solid ${borderColor}`,
        backgroundColor: bgColor,
        color: textColor,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontWeight: isCorrect || isWrong ? 'bold' : 'normal',
        transition: 'all 0.15s ease'
      }}
    >
      <strong>{label}.</strong> {option}
    </button>
  );
};

export default AnswerButton;