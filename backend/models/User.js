const mongoose = require('mongoose');

// ユーザーのスキーマを定義
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

// モデルを作成
const User = mongoose.model('User', userSchema);

module.exports = User;

