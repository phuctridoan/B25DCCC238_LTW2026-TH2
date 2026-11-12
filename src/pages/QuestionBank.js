import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS } from '../data';

const QuestionBank = ({ questions }) => {
  const [filterType, setFilterType] = useState('all');
  const [sortType, setSortType] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');

  // Tính số lượng bằng filter() trên dữ liệu
  const allCount = questions.length;
  const officialCount = questions.filter((q) => !q.reserve).length;
  const reserveCount = questions.filter((q) => q.reserve).length;

  // Lọc theo loại câu hỏi
  let displayList = questions.filter((q) => {
    if (filterType === 'official') return !q.reserve;
    if (filterType === 'reserve') return q.reserve;
    return true;
  });

  // Tìm kiếm theo nội dung (không phân biệt hoa thường)
  if (searchTerm.trim() !== '') {
    displayList = displayList.filter((q) =>
      q.question.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  }

  // Sắp xếp trên bản sao của mảng
  displayList = [...displayList].sort((a, b) => {
    if (sortType === 'asc') {
      return a.level !== b.level ? a.level - b.level : a.id - b.id;
    }
    if (sortType === 'desc') {
      return a.level !== b.level ? b.level - a.level : a.id - b.id;
    }
    return a.id - b.id;
  });

  const getButtonStyle = (type) => ({
    padding: '8px 16px',
    marginRight: '10px',
    backgroundColor: filterType === type ? 'orange' : '#e9ecef',
    color: filterType === type ? '#fff' : '#333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: filterType === type ? 'bold' : 'normal'
  });

  return (
    <div>
      <h2>Ngân hàng câu hỏi</h2>

      <div style={{ marginBottom: '15px', display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <button style={getButtonStyle('all')} onClick={() => setFilterType('all')}>
            Tất cả ({allCount})
          </button>
          <button style={getButtonStyle('official')} onClick={() => setFilterType('official')}>
            Chính thức ({officialCount})
          </button>
          <button style={getButtonStyle('reserve')} onClick={() => setFilterType('reserve')}>
            Dự bị ({reserveCount})
          </button>
        </div>

        <div>
          <label htmlFor="sortSelect" style={{ marginRight: '8px' }}>Sắp xếp:</label>
          <select
            id="sortSelect"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            style={{ padding: '7px', borderRadius: '4px' }}
          >
            <option value="default">Theo số thứ tự</option>
            <option value="asc">Mức độ: Dễ → Khó</option>
            <option value="desc">Mức độ: Khó → Dễ</option>
          </select>
        </div>

        <div>
          <input
            type="text"
            placeholder="Tìm kiếm câu hỏi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '7px 10px', width: '220px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
      </div>

      <p style={{ fontWeight: '500' }}>Có {displayList.length} câu hỏi</p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }} border="1" cellPadding="10">
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
            <th style={{ width: '60px' }}>STT</th>
            <th style={{ width: '120px' }}>Mức độ</th>
            <th style={{ width: '120px' }}>Loại</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>
        <tbody>
          {displayList.map((q) => (
            <tr key={q.id}>
              <td>{q.id}</td>
              <td>{LEVELS[q.level]}</td>
              <td>{q.reserve ? 'Dự bị' : 'Chính thức'}</td>
              <td>
                <Link to={`/questions/${q.id}`} style={{ color: '#0066cc', textDecoration: 'none' }}>
                  {q.question}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBank;