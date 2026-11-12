import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Countdown from '../components/Countdown';
import TimeBar from '../components/TimeBar';
import ScorePanel from '../components/ScorePanel';
import QuestionCard from '../components/QuestionCard';
import PowerUps from '../components/PowerUps';
import { TIME_PER_QUESTION } from '../data';
import { calcPoints, calcTotal, getStars } from '../utils';

const Play = ({ questions, playerName, onAddHistory }) => {
  const navigate = useNavigate();

  const [playQuestions, setPlayQuestions] = useState([]);
  const [status, setStatus] = useState('countdown');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [addedPoints, setAddedPoints] = useState(0);

  const [usedPowerUps, setUsedPowerUps] = useState({
    swap: false,
    double: false,
    freeze: false
  });
  const [isDoubleActive, setIsDoubleActive] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    if (questions.length > 0 && playQuestions.length === 0) {
      setPlayQuestions(questions.filter((q) => !q.reserve));
    }
  }, [questions, playQuestions.length]);

  const currentQ = playQuestions[currentIndex];

  const handleAnswer = (chosenIdx, remainingTime = timeLeft) => {
    if (status !== 'answering') return;
    setStatus('revealed');
    setSelectedAnswer(chosenIdx);

    const isCorrect = chosenIdx !== null && currentQ && chosenIdx === currentQ.answer;
    let earned = 0;

    if (isCorrect && currentQ) {
      earned = calcPoints(currentQ, remainingTime);
      if (isDoubleActive) {
        earned = earned * 2;
      }
      setScore((prev) => prev + earned);
      setCorrectCount((prev) => prev + 1);
      setAddedPoints(earned);
    } else {
      setAddedPoints(0);
    }

    if (currentQ) {
      const newRecord = {
        id: currentQ.id,
        chosen: chosenIdx,
        correct: currentQ.answer,
        timeLeft: remainingTime,
        points: earned,
        swappedTo: currentQ.swappedFrom ? currentQ.id : null
      };
      setAnswers((prev) => [...prev, newRecord]);
    }
  };

  const handleSwap = () => {
    if (status !== 'answering' || usedPowerUps.swap || !currentQ) return;
    const reserveQ = questions.find((q) => q.reserve && q.level === currentQ.level);
    if (!reserveQ) return;

    const updated = playQuestions.map((item, idx) =>
      idx === currentIndex ? { ...reserveQ, swappedFrom: currentQ.id } : item
    );
    setPlayQuestions(updated);
    setUsedPowerUps((prev) => ({ ...prev, swap: true }));
    setTimeLeft(TIME_PER_QUESTION);
    setIsFrozen(false);
    setFocusedIndex(0);
  };

  const handleDouble = () => {
    if (status !== 'answering' || usedPowerUps.double) return;
    setUsedPowerUps((prev) => ({ ...prev, double: true }));
    setIsDoubleActive(true);
  };

  const handleFreeze = () => {
    if (status !== 'answering' || usedPowerUps.freeze) return;
    setUsedPowerUps((prev) => ({ ...prev, freeze: true }));
    setIsFrozen(true);
  };

  useEffect(() => {
    if (status !== 'answering' || isFrozen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [status, isFrozen]);

  useEffect(() => {
    if (status === 'answering' && !isFrozen && timeLeft === 0) {
      handleAnswer(null, 0);
    }
  }, [timeLeft, status, isFrozen]);

  useEffect(() => {
    if (status !== 'revealed') return;

    const timeout = setTimeout(() => {
      if (currentIndex + 1 < playQuestions.length) {
        setCurrentIndex((prev) => prev + 1);
        setTimeLeft(TIME_PER_QUESTION);
        setSelectedAnswer(null);
        setAddedPoints(0);
        setIsDoubleActive(false);
        setIsFrozen(false);
        setFocusedIndex(0);
        setStatus('answering');
      } else {
        const finalScore = calcTotal(answers);
        const starInfo = getStars(correctCount);

        onAddHistory({
          id: Date.now(),
          name: playerName.trim(),
          score: finalScore,
          correctCount,
          stars: starInfo.stars,
          playedAt: new Date().toLocaleString('vi-VN')
        });

        navigate('/result', {
          replace: true,
          state: {
            playerName,
            answers,
            score: finalScore,
            correctCount
          }
        });
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [status, currentIndex, playQuestions.length, answers, correctCount, playerName, navigate, onAddHistory]);

  useEffect(() => {
    if (status !== 'answering') return;

    const handleKey = (e) => {
      if (e.key === 'ArrowRight') {
        setFocusedIndex((prev) => (prev % 2 === 0 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        setFocusedIndex((prev) => (prev % 2 === 1 ? prev - 1 : prev));
      } else if (e.key === 'ArrowDown') {
        setFocusedIndex((prev) => (prev < 2 ? prev + 2 : prev));
      } else if (e.key === 'ArrowUp') {
        setFocusedIndex((prev) => (prev >= 2 ? prev - 2 : prev));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleAnswer(focusedIndex, timeLeft);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [status, focusedIndex, timeLeft, currentQ, isDoubleActive]);

  useEffect(() => {
    if (status !== 'countdown' && playQuestions.length > 0) {
      document.title = `Câu ${currentIndex + 1}/${playQuestions.length} – đúng ${correctCount} câu`;
    }
    return () => {
      document.title = 'Nhanh như chớp';
    };
  }, [status, currentIndex, playQuestions.length, correctCount]);

  if (!playerName || !playerName.trim()) {
    return <Navigate to="/" replace />;
  }

  if (playQuestions.length === 0) {
    return <p>Đang chuẩn bị câu hỏi...</p>;
  }

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto' }}>
      {status === 'countdown' ? (
        <Countdown onFinish={() => setStatus('answering')} />
      ) : (
        <div>
          <ScorePanel score={score} correctCount={correctCount} addedPoints={addedPoints} />
          <PowerUps
            disabled={status !== 'answering'}
            used={usedPowerUps}
            isDoubleActive={isDoubleActive}
            onSwap={handleSwap}
            onDouble={handleDouble}
            onFreeze={handleFreeze}
          />
          <TimeBar timeLeft={timeLeft} isFrozen={isFrozen} />
          {currentQ && (
            <QuestionCard
              question={currentQ}
              currentIndex={currentIndex}
              totalQuestions={playQuestions.length}
              onSelectAnswer={(idx) => handleAnswer(idx, timeLeft)}
              selectedAnswer={selectedAnswer}
              isRevealed={status === 'revealed'}
              focusedIndex={focusedIndex}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Play;