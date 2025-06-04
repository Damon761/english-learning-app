import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Avatar,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
}

interface Question {
  word: string;
  options: string[];
  correctAnswer: string;
}

// 模拟对战题目
const mockQuestions: Question[] = [
  {
    word: 'apple',
    options: ['苹果', '香蕉', '橙子', '梨'],
    correctAnswer: '苹果',
  },
  {
    word: 'beautiful',
    options: ['漂亮的', '丑陋的', '高大的', '矮小的'],
    correctAnswer: '漂亮的',
  },
  // 添加更多题目...
];

export default function WordBattle() {
  const [gameState, setGameState] = useState<'matching' | 'playing' | 'result'>('matching');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [players, setPlayers] = useState<Player[]>([
    {
      id: '1',
      name: '你',
      avatar: 'https://mui.com/static/images/avatar/1.jpg',
      score: 0,
    },
    {
      id: '2',
      name: '对手',
      avatar: 'https://mui.com/static/images/avatar/2.jpg',
      score: 0,
    },
  ]);

  useEffect(() => {
    if (gameState === 'matching') {
      // 模拟匹配过程
      const timer = setTimeout(() => {
        setGameState('playing');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && currentQuestion < mockQuestions.length - 1) {
      handleNextQuestion();
    } else if (timeLeft === 0 && currentQuestion === mockQuestions.length - 1) {
      setGameState('result');
    }
  }, [timeLeft, currentQuestion, gameState]);

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === mockQuestions[currentQuestion].correctAnswer;
    
    setPlayers(prev =>
      prev.map(player =>
        player.id === '1'
          ? { ...player, score: player.score + (isCorrect ? 10 : 0) }
          : player
      )
    );

    // 模拟对手答题
    const opponentCorrect = Math.random() > 0.5;
    setPlayers(prev =>
      prev.map(player =>
        player.id === '2'
          ? { ...player, score: player.score + (opponentCorrect ? 10 : 0) }
          : player
      )
    );

    if (currentQuestion < mockQuestions.length - 1) {
      handleNextQuestion();
    } else {
      setGameState('result');
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(prev => prev + 1);
    setTimeLeft(10);
  };

  const handleNewGame = () => {
    setGameState('matching');
    setCurrentQuestion(0);
    setTimeLeft(10);
    setPlayers(prev =>
      prev.map(player => ({ ...player, score: 0 }))
    );
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
      {gameState === 'matching' ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography variant="h6">正在匹配对手...</Typography>
        </Paper>
      ) : gameState === 'playing' ? (
        <>
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {players.map((player) => (
                <Box key={player.id} sx={{ flex: '1 1 45%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={player.avatar} />
                    <Box>
                      <Typography variant="subtitle1">{player.name}</Typography>
                      <Typography variant="h6">{player.score}分</Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <LinearProgress
              variant="determinate"
              value={(currentQuestion / mockQuestions.length) * 100}
              sx={{ mt: 2 }}
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
              剩余时间：{timeLeft}秒
            </Typography>
          </Paper>

          <Card elevation={6}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {mockQuestions[currentQuestion].word}
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                {mockQuestions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    fullWidth
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </Button>
                ))}
              </Box>
            </CardContent>
          </Card>
        </>
      ) : (
        <Dialog open={true} onClose={() => {}}>
          <DialogTitle>对战结果</DialogTitle>
          <DialogContent>
            {players.map((player) => (
              <Box key={player.id} sx={{ mb: 2 }}>
                <Typography variant="h6">
                  {player.name}: {player.score}分
                </Typography>
              </Box>
            ))}
            <Typography variant="h5" color="primary">
              {players[0].score > players[1].score
                ? '恭喜你获胜！'
                : players[0].score < players[1].score
                ? '继续加油！'
                : '平局！'}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNewGame}>再来一局</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
} 