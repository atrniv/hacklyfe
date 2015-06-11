module.exports = function (router) {

  // Get Competition Leaderboard
  router.get('/competitions/:competition_id', function (req, res) {

  });

  // Query Past Competitions
  router.get('/competitions', function (req, res) {

  });

  // Query Questions
  router.get('/questions', function (req, res) {
    res.json(require('../questions.json'));
  });

  // Get App Status
  router.get('/status', function (req, res) {

  });

  // Register User
  router.post('/register', function (req, res) {
    req.session.user = req.body.user
    res.json({})
  });

  // Submit Answer
  router.post('/submit', function (req, res) {
    try {
    } catch (e) {

    }
  });
}
