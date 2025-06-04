// 模拟用户数据
export interface User {
  id: number;
  username: string;
  password: string;
  role: 'student' | 'admin';
}

export const users: User[] = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: 2,
    username: 'student',
    password: 'student123',
    role: 'student'
  }
];

// 用户登录验证
export const validateUser = (username: string, password: string): User | null => {
  const user = users.find(u => u.username === username && u.password === password);
  return user || null;
};

// 检查用户名是否已存在
export const isUsernameTaken = (username: string): boolean => {
  return users.some(u => u.username === username);
};

// 添加新用户
export const addUser = (username: string, password: string, role: 'student' | 'admin'): User => {
  const newUser: User = {
    id: users.length + 1,
    username,
    password,
    role
  };
  users.push(newUser);
  return newUser;
}; 