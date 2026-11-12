import React from 'react';

const ScorePanel = ({ score, correctCount, addedPoints }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8f9fa', padding: '12px 20px', borderRadius: '8px', border: '1px solid #ddd' }}>
      <div>
        <p style={{ margin: '0', fontSize: '18px', fontWeight: 'bold' }}>Điểm: {score}</p>
        <p style={{ margin: '4px 0 0', fontSize: '15px', color: '#555' }}>Số câu đúng: {correctCount}</p>
      </div>
      {addedPoints > 0 && (
        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>
          +{addedPoints} điểm
        </span>
      )}
    </div>
  );
};

export default ScorePanel;