import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Paper,
  Grid,
  Chip,
} from '@mui/material';
import {
  VolumeUp as VolumeUpIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';

// 模拟单词数据
const mockWords = [
  {
    id: 1,
    word: 'apple',
    phonetic: '/ˈæp.əl/',
    meaning: '苹果',
    example: 'I eat an apple every day.',
    partOfSpeech: 'n.',
  },
  {
    id: 2,
    word: 'beautiful',
    phonetic: '/ˈbjuː.tɪ.fəl/',
    meaning: '美丽的',
    example: 'She is a beautiful girl.',
    partOfSpeech: 'adj.',
  },
  // 添加更多单词...
];

export default function WordLearning() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const currentWord = mockWords[currentIndex];

  const handleNext = () => {
    if (currentIndex < mockWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowMeaning(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowMeaning(false);
    }
  };

  const toggleFavorite = (wordId: number) => {
    setFavorites(prev =>
      prev.includes(wordId)
        ? prev.filter(id => id !== wordId)
        : [...prev, wordId]
    );
  };

  const playPronunciation = (word: string) => {
    // TODO: 实现发音功能
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          学习进度：{currentIndex + 1} / {mockWords.length}
        </Typography>
      </Paper>

      <Card elevation={6}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h4" component="div">
              {currentWord.word}
            </Typography>
            <Box>
              <IconButton onClick={() => playPronunciation(currentWord.word)}>
                <VolumeUpIcon />
              </IconButton>
              <IconButton onClick={() => toggleFavorite(currentWord.id)}>
                {favorites.includes(currentWord.id) ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </Box>
          </Box>

          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {currentWord.phonetic}
          </Typography>
          
          <Chip label={currentWord.partOfSpeech} size="small" sx={{ mb: 2 }} />

          {showMeaning ? (
            <>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                {currentWord.meaning}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                例句：{currentWord.example}
              </Typography>
            </>
          ) : (
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setShowMeaning(true)}
              sx={{ mt: 2 }}
            >
              显示释义
            </Button>
          )}
        </CardContent>
      </Card>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<NavigateBeforeIcon />}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            上一个
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            endIcon={<NavigateNextIcon />}
            onClick={handleNext}
            disabled={currentIndex === mockWords.length - 1}
          >
            下一个
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
} 