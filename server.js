const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const path = require('path')

const app = express();

app.use(express.json({ extended: true }));

app.use('/app/todoApp', require('./routes/task.routes'));
app.use('/app/auth', require('./routes/auth.routes'));

const PORT = process.env.PORT || config.get('port');

async function start(){
  try{
    await mongoose.connect(process.env.MONGODB_URI || config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log('mongo has been started');

    app.listen(PORT, () => console.log(`app has been started on port ${PORT}...`));

  }catch(e){

    console.log('Server Error', e.message);

    process.exit(1);
  }
}

start();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/sign_in', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
