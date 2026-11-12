import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LEVELS } from "../data";

const QuestionBank = ({ questions, loading, error }) => {
  const [filterType, setFilterType] = useState("all");
  const [sortType, setSortType] = useState("id");
  const [keyword, setKeyword] = useState("");

  // Tên hàm bắt buộc theo đề bài
  const handleKeywordShift = (event) => setKeyword(event.target.value);

  const allCount = questions.filter(() => true).length;
  const officialCount = questions.filter((q) => !q.reserve).length;
  const reserveCount = questions.filter((q) => q.reserve).length;

  const visibleQuestions = useMemo(() => {
    let result = questions.filter((q) => {
      if (filterType === "official") return !q.reserve;
      if (filterType === "reserve") return q.reserve;
      return true;
    });

    const normalizedKeyword = keyword.trim().toLowerCase();
    if (normalizedKeyword) {
      result = result.filter((q) =>
        q.question.toLowerCase().includes(normalizedKeyword)
      );
    }

    // Sort trên bản sao, không sửa mảng state gốc.
    result = [...result].sort((a, b) => {
      if (sortType === "easy") return a.level - b.level || a.id - b.id;
      if (sortType === "hard") return b.level - a.level || a.id - b.id;
      return a.id - b.id;
    });

    return result;
  }, [questions, filterType, sortType, keyword]);

  if (loading) return <p>Đang tải câu hỏi...</p>;
  if (error) return <p className="error">Không tải được câu hỏi.</p>;

  return (
    <section>
      <h1>Ngân hàng câu hỏi</h1>

      <div className="toolbar">
        <button
          className={filterType === "all" ? "filter-btn selected" : "filter-btn"}
          onClick={() => setFilterType("all")}
        >
          Tất cả ({allCount})
        </button>
        <button
          className={filterType === "official" ? "filter-btn selected" : "filter-btn"}
          onClick={() => setFilterType("official")}
        >
          Chính thức ({officialCount})
        </button>
        <button
          className={filterType === "reserve" ? "filter-btn selected" : "filter-btn"}
          onClick={() => setFilterType("reserve")}
        >
          Dự bị ({reserveCount})
        </button>
      </div>

      <div className="search-sort">
        <label>
          Sắp xếp:{" "}
          <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
            <option value="id">Theo số thứ tự</option>
            <option value="easy">Mức độ: Dễ → Khó</option>
            <option value="hard">Mức độ: Khó → Dễ</option>
          </select>
        </label>

        <input
          type="text"
          value={keyword}
          onChange={handleKeywordShift}
          placeholder="Tìm kiếm theo nội dung câu hỏi..."
        />
      </div>

      <p>Có {visibleQuestions.length} câu hỏi</p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mức độ</th>
              <th>Loại</th>
              <th>Câu hỏi</th>
            </tr>
          </thead>
          <tbody>
            {visibleQuestions.map((q, index) => (
              <tr key={q.id}>
                <td>{index + 1}</td>
                <td>{LEVELS[q.level]}</td>
                <td>{q.reserve ? "Dự bị" : "Chính thức"}</td>
                <td><Link to={`/questions/${q.id}`}>{q.question}</Link></td>
              </tr>
            ))}
            {visibleQuestions.length === 0 && (
              <tr><td colSpan="4">Không tìm thấy câu hỏi phù hợp.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default QuestionBank;
