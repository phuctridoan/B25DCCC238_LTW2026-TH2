import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS, LETTERS } from '../data';

const QuestionDetail = ({ questions }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAnswer, setShowAnswer] = useState(false);

  const question = questions.find((q) => q.id === Number(id));

  if (!question) {
    return (
      <div>
        <p style={{ fontSize: '18px', color: 'red' }}>Không tìm thấy câu hỏi</p>
        <button
          onClick={() => navigate(-1)}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '650px' }}>
      <h2>
        {`Câu hỏi số ${question.id} – ${LEVELS[question.level]} – ${question.reserve ? 'Dự bị' : 'Chính thức'}`}
      </h2>

      <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '20px 0 15px' }}>
        {question.question}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        {question.options.map((option, idx) => {
          const isCorrect = idx === question.answer;
          const isHighlighted = showAnswer && isCorrect;

          return (
            <div
              key={idx}
              style={{
                padding: '12px 15px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                backgroundColor: isHighlighted ? '#4CAF50' : '#fff',
                color: isHighlighted ? '#fff' : '#000',
                fontWeight: isHighlighted ? 'bold' : 'normal'
              }}
            >
              {`${LETTERS[idx]}. ${option}`}
              {isHighlighted && ' (Đáp án đúng)'}
            </div>
          );
        })}
      </div>

      {showAnswer && (
        <p style={{ fontStyle: 'italic', color: '#555', marginBottom: '20px', lineHeight: '1.5' }}>
          {`Giải thích: ${question.explain}`}
        </p>
      )}

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {showAnswer ? 'Ẩn đáp án' : 'Xem đáp án'}
        </button>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default QuestionDetail;