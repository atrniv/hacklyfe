module.exports = function (router) {

  // Get Competition Leaderboard
  router.get('/competitions/:competition_id', function (req, res) {
    // Fetch leaderboard from playlyfe
    req.db.collection('competitions').then(function (collection) {
      collection.findOne({ active: true }).then(function (competition) {
        if (competition == null) {
          return res.status(404).json({
            error: "competition_not_found",
            error_description: "Competition does not exist"
          });
        } else {
          req.pl.get('/runtime/leaderboards/l33t_hackers', {
            player_id: req.session.user.id,
            cycle: 'alltime',
            skip: 0,
            limit: 10,
            scope_id: competition._id.toString()
          }).then(function (leaderboard) {
            res.json(leaderboard);
          }).catch(function (err) {
            res.status(err.status).json({
              error: err.name,
              error_description: err.message
            });
          });
        }
      });
    });
  });

  // Query Past Competitions
  router.get('/competitions', function (req, res) {
    req.db.collection('competitions').then(function (collection) {
      collection.find({}, { sort: { _id: -1 } }).toArray().then(function (data) {
        res.json(data);
      });
    });
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
    username = req.body.username;
    password = req.body.password;
    player = {alias: username, id: username};

    if (username == 'admin') {
      if (password == 'PlayLyfe') {
        req.session.user = player;
        return res.json(player);
      } else {
        return res.status(403).json({error: 'Access denied'});
      }
    }

    req.pl.post('/admin/players', {}, player).then(function (player_data) {
      req.session.user = player_data;
      res.json(player_data);
    }).catch(function (err) {
      if (err.status === 409) {
        req.pl.get('/runtime/player', { player_id: player.id }).then(function (player_data) {
          req.session.user = player_data;
          res.json(player_data);
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
