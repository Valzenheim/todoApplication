const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 8080;
const User = require('../models/User');

// здесь у нас происходит импорт пакетов и определяется порт нашего сервера
const app = express();

//здесь наше приложение отдаёт статику
app.use(express.json({ extended: true }));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

//простой тест сервера
app.get('/ping', function (req, res) {
  return res.json('pong');
});

app.post(
  '/createUser',
  async (req, res) => {
    try{

      console.log('logintratatata')


      // let oldUser = await User.findOne({Login: req.body.login});
      //
      // if(oldUser){
      //   return res.status(400).json({ message: `This user already exists` });
      // }

      const user = new User ({
        Login: req.body.login,
        Password: req.body.password,
        filter: 'all'
      });



      const token = jwt.sign(
        { userId: user._id },
        'mikeYarutische',
        { expiresIn: '1h' }
      );

      //await user.save();

      res.status(200).json({token, userId: user._id, userName: user.Login, filter: user.filter});

    }catch (e) {

      res.status(500).json({ message: e.message});

    }
  });

//обслуживание html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);
