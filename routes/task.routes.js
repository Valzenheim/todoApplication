const {Router} = require('express');
const router = Router();
const auth = require('../middleware/auth.middleware');
const Task = require('../models/Task');


router.get('/getList', auth, async (req, res) => {
  try {
    let tasks = await Task.find({owner: req.user.userId});

    res.status(201).json(tasks);

  } catch (e) {
    res.status(500).json({message: e.message});
  }
});

router.post('/newTask', auth, async (req, res) => {
  try {
    const task = new Task({
      taskValue: req.body.value,
      checks: false,
      owner: req.user.userId
    });

    await task.save();

    res.status(200).json(task);

  } catch (e) {
    res.status(500).json({message: e.message});
  }

});

router.put('/setTaskStatus', async (req, res) => {
  try {
    await Task.updateOne({_id: req.body.id}, {$set: {checks: req.body.value}});

    res.status(200).json();

  } catch (e) {
    res.status(500).json({message: e.message});
  }
});

router.delete('/removeOne', async (req, res) => {
  try {
    await Task.deleteOne({_id: req.body.id});

    res.status(200).json();

  } catch (e) {
    res.status(500).json({message: e.message});
  }
});

router.put('/changeEveryOneStatus', auth, async (req, res) => {
  try {
    await Task.updateMany({owner: req.user.userId}, {$set: {checks: req.body.status}});

    res.status(200).json();

  } catch (e) {
    res.status(500).json({message: e.message});
  }
});

router.delete('/removeAllOfDone', auth, async (req, res) => {
  try {
    await Task.deleteMany({owner: req.user.userId, checks: true});

    res.status(200);

  } catch (e) {
    res.status(500).json({message: e.message});
  }
});

module.exports = router;
