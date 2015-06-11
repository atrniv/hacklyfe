module.exports = function (router) {

  // Get Competition Leaderboard
  router.get('/competitions/:competition_id', function (req, res) {
    // Fetch leaderboard from playlyfe
    req.pl.get('')
  });

  // Query Past Competitions
  router.get('/competitions', function (req, res) {
    req.db.collection('competitions').then(function (collection) {
      collection.find({}, { sort: { _id: -1 } }).toArray().then(function (data) {
        res.json(data);
      });
    })
  });

  // Query Questions
  router.get('/questions', function (req, res) {
    res.json(require('../questions.json'));
  });

  // Get App Status
  router.get('/status', function (req, res) {
    req.db.collection('competitions').then(function (collection) {
      collection.findOne({ active: true }).then(function (doc) {
        if (doc != null) {
          res.json(doc);
        } else {
          res.status(409).json({
            "error": "no_competition",
            "error_description": "no competition running"
          });
        }
      })
    })
  });

  // Register User
  router.post('/register', function (req, res) {
    req.pl.post('/admin/players', {}, req.body).then(function (player) {
      req.session.user = player;
      res.json(player);
    }).catch(function (err) {
      if (err.status === 409) {
        req.pl.get('/runtime/player', { player_id: req.body.id }).then(function (player) {
          req.session.user = player;
          res.json(player);
        });
      } else {
        res.status(err.status).json({
          error: err.name,
          error_description: err.message
        });
      }
    });
  });

  router.get('/profile', function (req, res) {
    res.json(req.session.user);
  })

  // Logout
  router.post('/logout', function (req, res) {
    delete req.session.user;
    res.json({ message: 'logged out successfully '});
  })

  // Submit Answer
  router.post('/submit', function (req, res) {
    try {
    } catch (e) {

    }



  });
}
