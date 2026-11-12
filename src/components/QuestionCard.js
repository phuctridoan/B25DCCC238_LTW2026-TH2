import React from 'react';
import { LEVELS, LETTERS } from '../data';
import AnswerButton from './AnswerButton';

const QuestionCard = ({
  question,
  currentIndex,
  totalQuestions,
  onSelectAnswer,
  selectedAnswer,
  isRevealed,
  focusedIndex
}) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h3 style={{ margin: '0 0 10px', color: '#0066cc' }}>
        {`Câu ${currentIndex + 1}/${totalQuestions} – ${LEVELS[question.level]}`}
      </h3>
      <p style={{ fontSize: '19px', fontWeight: '600', minHeight: '50px', margin: '0 0 20px' }}>
        {question.question}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        {question.options.map((option, idx) => {
          const isCorrect = isRevealed && idx === question.answer;
          const isWrong = isRevealed && selectedAnswer === idx && idx !== question.answer;
          const isFocused = !isRevealed && focusedIndex === idx;

          return (
            <AnswerButton
              key={idx}
              label={LETTERS[idx]}
              option={option}
              onClick={() => onSelectAnswer(idx)}
              disabled={isRevealed}
              isCorrect={isCorrect}
              isWrong={isWrong}
              isFocused={isFocused}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;