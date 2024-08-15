require('dotenv').config({ path: './config.env' });  // config.envファイルを指定して読み込む

const express = require('express');  // expressモジュールをインポート
const mongoose = require('mongoose');  // mongooseモジュールをインポート
const User = require('./models/User');  // ユーザーモデルをインポート

const app = express();
const port = process.env.PORT || 5001;

// JSONボディの解析用ミドルウェア
app.use(express.json());

// MongoDBに接続
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// ユーザー登録のエンドポイント
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;

  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error details:', error);  // エラーの詳細を出力
    res.status(500).json({ error: 'Error creating user' });
  }
});

// ユーザー取得のエンドポイント
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// サーバーの起動
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
