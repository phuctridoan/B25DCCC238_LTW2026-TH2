import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { LETTERS } from '../data';
import { getStars } from '../utils';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const { playerName, answers, score, correctCount } = location.state;
  const starInfo = getStars(correctCount);
  const starIcons = '★'.repeat(starInfo.stars) + '☆'.repeat(3 - starInfo.stars);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '25px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
        <h2 style={{ color: 'orange', margin: '0 0 10px' }}>{starInfo.message}</h2>
        <p style={{ fontSize: '18px', margin: '6px 0' }}>Người chơi: <strong>{playerName}</strong></p>
        <p style={{ fontSize: '18px', margin: '6px 0' }}>Số câu trả lời đúng: <strong>{`${correctCount}/15`}</strong></p>
        <p style={{ fontSize: '18px', margin: '6px 0' }}>Điểm: <strong>{score}</strong></p>
        <p style={{ fontSize: '20px', margin: '10px 0 0', color: '#d39e00' }}>
          {`Xếp loại: ${starInfo.stars} sao `}<span style={{ fontSize: '24px' }}>{starIcons}</span>
        </p>
      </div>

      <h3>Xem lại lượt chơi</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', marginTop: '10px' }} border="1" cellPadding="8">
        <thead>
          <tr style={{ backgroundColor: '#e9ecef' }}>
            <th>Câu</th>
            <th>Bạn chọn</th>
            <th>Đáp án đúng</th>
            <th>Còn lại</th>
            <th>Điểm</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((item, idx) => {
            const isCorrect = item.chosen !== null && item.chosen === item.correct;
            return (
              <tr
                key={idx}
                style={{
                  backgroundColor: isCorrect ? '#d4edda' : '#f8d7da'
                }}
              >
                <td>{item.swappedTo ? `Câu ${idx + 1} (đổi sang câu ${item.swappedTo})` : idx + 1}</td>
                <td>{item.chosen !== null ? LETTERS[item.chosen] : '-'}</td>
                <td><strong>{LETTERS[item.correct]}</strong></td>
                <td>{`${item.timeLeft} giây`}</td>
                <td>{item.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ marginTop: '25px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button
          onClick={() => navigate('/play')}
          style={{ padding: '10px 22px', backgroundColor: 'orange', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
        >
          Chơi lại
        </button>
        <button
          onClick={() => navigate('/')}
          style={{ padding: '10px 22px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default Result;