const router = require('express').Router();

router.get('/list', (req, res) => {
  const apps = ['game 1', 'game 2', 'game 3'];
  res.json(apps);
});

router.get('/list2', (req, res) => {
  const apps = ['game 1', 'game 2', 'game 3'];
  res.json(apps);
});

module.exports = router;