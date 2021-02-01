const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;

// здесь у нас происходит импорт пакетов и определяется порт нашего сервера
const app = express();

//здесь наше приложение отдаёт статику
app.use(express.json({ extended: true }));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

//простой тест сервера
app.use('/app/todoApp', require('./routes/task.routes'));
app.use('/app/auth', require('./routes/auth.routes'));

app.post('/ping', (req,res) => {
  res.status(200).json({trata:'ratata'})
})

//обслуживание html

app.get('/*', function (req, res) {
  console.log('tratata')
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);
