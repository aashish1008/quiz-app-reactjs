import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, RefreshCcw, Brain, Timer, Award } from 'lucide-react';

const Quiz = () => {
  const questions = [
    {
      question: "What is Machine Learning?",
      options: [
        "A subset of AI that enables systems to learn from experience",
        "A programming language for AI",
        "A type of computer hardware",
        "A database management system"
      ],
      correct: 0,
      explanation: "Machine Learning is a subset of AI that allows systems to automatically learn and improve from experience without being explicitly programmed."
    },
    {
      question: "Which of the following is a supervised learning algorithm?",
      options: [
        "K-means clustering",
        "Linear Regression",
        "Principal Component Analysis",
        "Autoencoders"
      ],
      correct: 1,
      explanation: "Linear Regression is a supervised learning algorithm where the model learns from labeled training data."
    },
    {
      question: "What is the purpose of the activation function in neural networks?",
      options: [
        "To store data",
        "To introduce non-linearity",
        "To reduce training time",
        "To initialize weights"
      ],
      correct: 1,
      explanation: "Activation functions introduce non-linearity into the network, allowing it to learn complex patterns."
    },
    {
      question: "What is overfitting in machine learning?",
      options: [
        "When a model performs well on training data but poorly on new data",
        "When a model is too simple to capture patterns",
        "When training takes too long",
        "When the dataset is too small"
      ],
      correct: 0,
      explanation: "Overfitting occurs when a model learns the training data too well, including noise and outliers, leading to poor generalization."
    },
    {
      question: "Which technique is used to prevent overfitting?",
      options: [
        "Increasing model complexity",
        "Removing training data",
        "Regularization",
        "Using fewer features"
      ],
      correct: 2,
      explanation: "Regularization helps prevent overfitting by adding a penalty term to the loss function, discouraging complex models."
    },
    {
      question: "What is the purpose of cross-validation?",
      options: [
        "To speed up training",
        "To evaluate model performance on unseen data",
        "To reduce model complexity",
        "To increase accuracy"
      ],
      correct: 1,
      explanation: "Cross-validation helps assess how well a model will generalize to new, unseen data by splitting the dataset into multiple folds."
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (!isAnswered && !showResult) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            setIsAnswered(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isAnswered, showResult]);

  const handleAnswerSelect = (optionIndex) => {
    if (isAnswered) return;
    
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    setShowExplanation(true);
    
    if (optionIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(30);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
    setTimeLeft(30);
    setShowExplanation(false);
  };

  const getOptionClassName = (index) => {
    const baseClass = "p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md";
    
    if (!isAnswered) return `${baseClass} hover:bg-blue-50 border-gray-200`;
    
    if (index === questions[currentQuestion].correct) {
      return `${baseClass} bg-green-50 border-green-500 shadow-green-100`;
    }
    
    if (index === selectedAnswer && index !== questions[currentQuestion].correct) {
      return `${baseClass} bg-red-50 border-red-500 shadow-red-100`;
    }
    
    return `${baseClass} opacity-50 border-gray-200`;
  };

  const getScoreEmoji = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "🏆";
    if (percentage >= 80) return "🌟";
    if (percentage >= 60) return "👍";
    return "💪";
  };

  if (showResult) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
          <CardTitle className="text-center text-2xl">Quiz Complete! {getScoreEmoji()}</CardTitle>
        </CardHeader>
        <CardContent className="text-center p-8">
          <div className="text-6xl font-bold mb-6 text-blue-600">
            {score} / {questions.length}
          </div>
          <div className="mb-8">
            {score === questions.length ? (
              <div className="flex items-center justify-center text-green-600 text-xl">
                <Award className="mr-2 h-6 w-6" />
                Perfect Score! You're a Machine Learning Expert!
              </div>
            ) : score >= questions.length * 0.7 ? (
              <div className="flex items-center justify-center text-blue-600 text-xl">
                <CheckCircle2 className="mr-2 h-6 w-6" />
                Great job! You have a solid understanding of ML!
              </div>
            ) : (
              <div className="flex items-center justify-center text-yellow-600 text-xl">
                <AlertCircle className="mr-2 h-6 w-6" />
                Keep learning! Practice makes perfect!
              </div>
            )}
          </div>
          <Button 
            onClick={resetQuiz}
            className="flex items-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg px-8 py-4"
          >
            <RefreshCcw className="mr-2 h-5 w-5" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Brain className="mr-2 h-6 w-6" />
            <CardTitle className="text-xl">Question {currentQuestion + 1}/{questions.length}</CardTitle>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Timer className="mr-1 h-4 w-4" />
              <span className="text-sm">{timeLeft}s</span>
            </div>
            <div className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
              Score: {score}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-6">
            {questions[currentQuestion].question}
          </h2>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={getOptionClassName(index)}
              >
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
              </div>
            ))}
          </div>
        </div>
        {showExplanation && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Explanation:</h3>
            <p className="text-blue-700">{questions[currentQuestion].explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 bg-gray-50">
        <Button
          onClick={handleNext}
          disabled={!isAnswered}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg py-6"
        >
          {currentQuestion === questions.length - 1 ? 'Show Results' : 'Next Question'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Quiz;