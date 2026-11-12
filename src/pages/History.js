import React from 'react';

const History = ({ history, onDeleteRecord, onClearHistory }) => {
  if (history.length === 0) {
    return (
      <div>
        <h2>Lịch sử các lượt chơi</h2>
        <p style={{ fontSize: '18px', color: '#666' }}>Chưa có lượt chơi nào</p>
      </div>
    );
  }

  const sortedHistory = [...history].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.correctCount - a.correctCount;
  });

  const totalPlays = history.length;
  const totalScore = history.reduce((sum, item) => sum + item.score, 0);
  const avgScore = Math.round(totalScore / totalPlays);
  const totalCorrect = history.reduce((sum, item) => sum + item.correctCount, 0);
  const correctRate = Math.round((totalCorrect / (15 * totalPlays)) * 100);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h2 style={{ margin: 0 }}>Lịch sử các lượt chơi</h2>
        <button
          onClick={onClearHistory}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Xóa lịch sử
        </button>
      </div>

      <div style={{ backgroundColor: '#f8f9fa', padding: '15px 20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ddd' }}>
        <p style={{ margin: '4px 0', fontSize: '16px' }}>{`Số lượt chơi: ${totalPlays}`}</p>
        <p style={{ margin: '4px 0', fontSize: '16px' }}>{`Điểm trung bình: ${avgScore}`}</p>
        <p style={{ margin: '4px 0', fontSize: '16px' }}>{`Tỉ lệ trả lời đúng: ${correctRate}%`}</p>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }} border="1" cellPadding="10">
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Người chơi</th>
            <th>Số câu đúng</th>
            <th>Xếp loại</th>
            <th>Điểm</th>
            <th>Thời gian</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {sortedHistory.map((item) => {
            const starIcons = '★'.repeat(item.stars) + '☆'.repeat(3 - item.stars);
            return (
              <tr key={item.id}>
                <td><strong>{item.name}</strong></td>
                <td>{`${item.correctCount}/15`}</td>
                <td style={{ color: '#d39e00', fontSize: '18px' }}>{starIcons}</td>
                <td><strong>{item.score}</strong></td>
                <td>{item.playedAt}</td>
                <td>
                  <button
                    onClick={() => onDeleteRecord(item.id)}
                    style={{
                      padding: '5px 12px',
                      backgroundColor: '#6c757d',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default History;