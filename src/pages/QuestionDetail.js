import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LETTERS, LEVELS } from "../data";

const QuestionDetail = ({ questions, loading, error }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAnswer, setShowAnswer] = useState(false);

  if (loading) return <p>Đang tải câu hỏi...</p>;
  if (error) return <p className="error">Không tải được câu hỏi.</p>;

  const questionId = Number(id);
  const question = questions.find((q) => q.id === questionId);

  if (!question || !Number.isInteger(questionId)) {
    return <h2>Không tìm thấy câu hỏi</h2>;
  }

  return (
    <section>
      <h1>
        Câu hỏi số {question.id} – {LEVELS[question.level]} ·{" "}
        {question.reserve ? "Dự bị" : "Chính thức"}
      </h1>

      <h3>{question.question}</h3>

      <div className="options-list">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={
              showAnswer && index === question.answer
                ? "option correct"
                : "option"
            }
          >
            <strong>{LETTERS[index]}.</strong> {option}
            {showAnswer && index === question.answer && (
              <strong> (Đáp án đúng)</strong>
            )}
          </div>
        ))}
      </div>

      {showAnswer && (
        <p className="explain"><strong>Giải thích:</strong> {question.explain}</p>
      )}

      <div className="detail-actions">
        <button onClick={() => setShowAnswer((prev) => !prev)}>
          {showAnswer ? "Ẩn đáp án" : "Xem đáp án"}
        </button>
        <button className="secondary-btn" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>
    </section>
  );
};

export default QuestionDetail;
