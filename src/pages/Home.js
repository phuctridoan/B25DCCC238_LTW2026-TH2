import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ playerName, setPlayerName, history }) => {
  const navigate = useNavigate();

  const bestRecord = history.length > 0
    ? [...history].sort((a, b) => b.score - a.score)[0]
    : null;

  const handleStart = (e) => {
    e.preventDefault();
    if (playerName.trim() !== '') {
      navigate('/play');
    }
  };

  return (
    <div style={{ maxWidth: '650px', margin: '30px auto', padding: '25px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <h1 style={{ textAlign: 'center', color: 'orange', marginBottom: '15px' }}>
        Nhanh Như Chớp
      </h1>

      {bestRecord && (
        <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', color: '#d39e00', marginBottom: '20px' }}>
          {`Kỷ lục: ${bestRecord.score} điểm – ${bestRecord.name}`}
        </p>
      )}

      <div style={{ backgroundColor: '#fcf8e3', padding: '15px 20px', borderRadius: '6px', marginBottom: '25px', lineHeight: '1.6' }}>
        <h4 style={{ margin: '0 0 8px', color: '#8a6d3b' }}>Luật chơi:</h4>
        <ul style={{ margin: '0', paddingLeft: '20px' }}>
          <li>Trả lời 15 câu hỏi chính thức về HTML, CSS, JS và React.</li>
          <li>Mỗi câu có 15 giây đếm ngược.</li>
          <li>Trả lời đúng được cộng điểm cơ bản + điểm tốc độ (10 điểm/giây còn lại).</li>
          <li>Trả lời sai hoặc hết giờ không bị loại, được 0 điểm cho câu đó.</li>
        </ul>
      </div>

      <form onSubmit={handleStart} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
            Tên người chơi:
          </label>
          <input
            type="text"
            placeholder="Nhập tên của bạn..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', fontSize: '16px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <button
          type="submit"
          disabled={!playerName.trim()}
          style={{
            padding: '12px',
            fontSize: '18px',
            backgroundColor: playerName.trim() ? 'orange' : '#ccc',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: playerName.trim() ? 'pointer' : 'not-allowed',
            fontWeight: 'bold'
          }}
        >
          Bắt đầu
        </button>
      </form>
    </div>
  );
};

export default Home;