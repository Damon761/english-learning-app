import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface Word {
  id: number;
  word: string;
  phonetic: string;
  meaning: string;
  example: string;
  difficulty: number;
}

// 模拟单词数据
const mockWords: Word[] = [
  {
    id: 1,
    word: 'apple',
    phonetic: '/ˈæp.əl/',
    meaning: '苹果',
    example: 'I eat an apple every day.',
    difficulty: 1,
  },
  {
    id: 2,
    word: 'beautiful',
    phonetic: '/ˈbjuː.tɪ.fəl/',
    meaning: '美丽的',
    example: 'She is a beautiful girl.',
    difficulty: 2,
  },
  // 添加更多单词...
];

export default function WordManagement() {
  const [words, setWords] = useState<Word[]>(mockWords);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingWord, setEditingWord] = useState<Word | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleAddWord = () => {
    setEditingWord(null);
    setOpenDialog(true);
  };

  const handleEditWord = (word: Word) => {
    setEditingWord(word);
    setOpenDialog(true);
  };

  const handleDeleteWord = (wordId: number) => {
    setWords(words.filter((w) => w.id !== wordId));
    setSnackbar({
      open: true,
      message: '单词删除成功',
      severity: 'success',
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const wordData = {
      id: editingWord?.id || words.length + 1,
      word: formData.get('word') as string,
      phonetic: formData.get('phonetic') as string,
      meaning: formData.get('meaning') as string,
      example: formData.get('example') as string,
      difficulty: Number(formData.get('difficulty')),
    };

    if (editingWord) {
      setWords(words.map((w) => (w.id === editingWord.id ? wordData : w)));
    } else {
      setWords([...words, wordData]);
    }

    setOpenDialog(false);
    setSnackbar({
      open: true,
      message: `单词${editingWord ? '修改' : '添加'}成功`,
      severity: 'success',
    });
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5">单词管理</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddWord}
          >
            添加单词
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>单词</TableCell>
                <TableCell>音标</TableCell>
                <TableCell>释义</TableCell>
                <TableCell>示例</TableCell>
                <TableCell>难度</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {words.map((word) => (
                <TableRow key={word.id}>
                  <TableCell>{word.word}</TableCell>
                  <TableCell>{word.phonetic}</TableCell>
                  <TableCell>{word.meaning}</TableCell>
                  <TableCell>{word.example}</TableCell>
                  <TableCell>{word.difficulty}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleEditWord(word)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteWord(word.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {editingWord ? '编辑单词' : '添加单词'}
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="word"
              label="单词"
              fullWidth
              defaultValue={editingWord?.word}
              required
            />
            <TextField
              margin="dense"
              name="phonetic"
              label="音标"
              fullWidth
              defaultValue={editingWord?.phonetic}
              required
            />
            <TextField
              margin="dense"
              name="meaning"
              label="释义"
              fullWidth
              defaultValue={editingWord?.meaning}
              required
            />
            <TextField
              margin="dense"
              name="example"
              label="示例"
              fullWidth
              defaultValue={editingWord?.example}
              required
            />
            <TextField
              margin="dense"
              name="difficulty"
              label="难度"
              type="number"
              fullWidth
              defaultValue={editingWord?.difficulty || 1}
              inputProps={{ min: 1, max: 5 }}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>取消</Button>
            <Button type="submit" variant="contained">
              确定
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
} 