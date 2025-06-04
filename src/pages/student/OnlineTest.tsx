import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  LinearProgress,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

interface Question {
  id: number;
  word: string;
  options: string[];
  correctAnswer: string;
}

// 模拟测试题目数据
const mockQuestions: Question[] = [
  {
    id: 1,
    word: 'apple',
    options: ['苹果', '香蕉', '橙子', '梨'],
    correctAnswer: '苹果',
  },
  {
    id: 2,
    word: 'beautiful',
    options: ['漂亮的', '丑陋的', '高大的', '矮小的'],
    correctAnswer: '漂亮的',
  },
  // 添加更多题目...
];

export default function OnlineTest() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 每题30秒

  const currentQuestion = mockQuestions[currentQuestionIndex];

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNext();
    }
  }, [timeLeft, showResult]);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNext = () => {
    // 检查答案
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setTimeLeft(30);
    } else {
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResult(false);
    setTimeLeft(30);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          在线测试
        </Typography>
        <LinearProgress
          variant="determinate"
          value={(currentQuestionIndex / mockQuestions.length) * 100}
          sx={{ mb: 2 }}
        />
        <Typography variant="body2" color="text.secondary">
          题目进度：{currentQuestionIndex + 1} / {mockQuestions.length}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          剩余时间：{timeLeft}秒
        </Typography>
      </Paper>

      {!showResult ? (
        <Card elevation={6}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {currentQuestion.word}
            </Typography>

            <FormControl component="fieldset">
              <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
                {currentQuestion.options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!selectedAnswer}
                fullWidth
              >
                {currentQuestionIndex === mockQuestions.length - 1 ? '完成' : '下一题'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Dialog open={showResult} onClose={() => {}}>
          <DialogTitle>测试结果</DialogTitle>
          <DialogContent>
            <Typography variant="h6">
              得分：{score} / {mockQuestions.length}
            </Typography>
            <Typography variant="body1">
              正确率：{((score / mockQuestions.length) * 100).toFixed(1)}%
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRetry}>重新测试</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
} 