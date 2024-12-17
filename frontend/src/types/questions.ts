export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface Option {
  value: string;
  label: string;
}

export interface QuestionnaireState {
  currentQuestionIndex: number;
  answers: Record<string, string>;
}