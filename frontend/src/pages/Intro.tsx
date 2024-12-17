import React, { useState } from 'react';
import { QuestionCard } from '../components/Question/QuestionCard';
import { ProgressBar } from '../components/Question/ProgressBar';
import { TerminalPrompt } from '../components/Question/TerminalPrompt';
import { questions } from '../data/questions';
import { QuestionnaireState } from '../types/questions';

function App() {
  const [state, setState] = useState<QuestionnaireState>({
    currentQuestionIndex: 0,
    answers: {},
  });

  const handleAnswer = (answer: string) => {
    setState((prev) => {
      const newAnswers = {
        ...prev.answers,
        [questions[prev.currentQuestionIndex].id]: answer,
      };

      return {
        answers: newAnswers,
        currentQuestionIndex: Math.min(prev.currentQuestionIndex + 1, questions.length - 1),
      };
    });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <TerminalPrompt />
        <ProgressBar
          current={state.currentQuestionIndex}
          total={questions.length}
        />
        <QuestionCard
          question={questions[state.currentQuestionIndex]}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
}

export default App;