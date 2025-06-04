import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
} from '@mui/material';

interface RankingData {
  id: number;
  name: string;
  avatar: string;
  score: number;
  wordsLearned: number;
  winRate: number;
  rank: number;
}

// 模拟排行榜数据
const mockRankingData: RankingData[] = [
  {
    id: 1,
    name: '张三',
    avatar: 'https://mui.com/static/images/avatar/1.jpg',
    score: 1200,
    wordsLearned: 500,
    winRate: 0.75,
    rank: 1,
  },
  {
    id: 2,
    name: '李四',
    avatar: 'https://mui.com/static/images/avatar/2.jpg',
    score: 1100,
    wordsLearned: 450,
    winRate: 0.70,
    rank: 2,
  },
  {
    id: 3,
    name: '王五',
    avatar: 'https://mui.com/static/images/avatar/3.jpg',
    score: 1000,
    wordsLearned: 400,
    winRate: 0.65,
    rank: 3,
  },
  // 添加更多用户数据...
];

export default function Leaderboard() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#FFD700'; // 金色
      case 2:
        return '#C0C0C0'; // 银色
      case 3:
        return '#CD7F32'; // 铜色
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          排行榜
        </Typography>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="总积分" />
          <Tab label="单词量" />
          <Tab label="对战胜率" />
        </Tabs>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>排名</TableCell>
                <TableCell>用户</TableCell>
                <TableCell align="right">
                  {tabValue === 0 && '积分'}
                  {tabValue === 1 && '已学单词'}
                  {tabValue === 2 && '胜率'}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockRankingData
                .sort((a, b) => {
                  if (tabValue === 0) return b.score - a.score;
                  if (tabValue === 1) return b.wordsLearned - a.wordsLearned;
                  return b.winRate - a.winRate;
                })
                .map((user, index) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      backgroundColor:
                        index < 3 ? `${getRankColor(index + 1)}10` : 'inherit',
                    }}
                  >
                    <TableCell>
                      <Chip
                        label={index + 1}
                        size="small"
                        sx={{
                          bgcolor: getRankColor(index + 1),
                          color: index < 3 ? 'white' : 'inherit',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={user.avatar} />
                        <Typography>{user.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      {tabValue === 0 && `${user.score}分`}
                      {tabValue === 1 && `${user.wordsLearned}个`}
                      {tabValue === 2 && `${(user.winRate * 100).toFixed(1)}%`}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
} 