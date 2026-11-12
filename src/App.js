const BUILD_TAG = "nc-7438";

import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import QuestionBank from "./pages/QuestionBank";
import QuestionDetail from "./pages/QuestionDetail";
import NotFound from "./pages/NotFound";

const Placeholder = ({ title }) => <h2>{title}</h2>;

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get("/data/questions.json", {
          signal: controller.signal
        });
        setQuestions(response.data);
      } catch (err) {
        if (!axios.isCancel(err) && err.code !== "ERR_CANCELED") {
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchQuestions();
    return () => controller.abort();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="questions"
          element={
            <QuestionBank
              questions={questions}
              loading={loading}
              error={error}
            />
          }
        />
        <Route
          path="questions/:id"
          element={
            <QuestionDetail
              questions={questions}
              loading={loading}
              error={error}
            />
          }
        />
        <Route path="play" element={<Placeholder title="Màn hình chơi (Bài 2)" />} />
        <Route path="result" element={<Placeholder title="Kết quả (Bài 2)" />} />
        <Route path="history" element={<Placeholder title="Lịch sử (Bài 3)" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
