const express = require('express');
const { getUsers, createUser } = require('../controllers/userController');
const router = express.Router();

// ユーザー取得
router.get('/users', getUsers);

// ユーザー登録
router.post('/users', createUser);

module.exports = router;
