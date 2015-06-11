module.exports = function (router) {
  // Start Competition
  router.post('/start', function (req, res) {
    req.db.collection('competitions').then(function (collection) {
      // Check if there is an active competition
      collection.findOne({ active: true }).then(function (doc) {
        if (doc != null) {
          res.status(400).json({
            error: 'competition_running',
            error_description: 'There is a competition already running'
          });
        } else {
          // Start a new competition is there is nothing running.
          collection.save({ active: true, started_at: new Date() }).then(function (doc) {
            res.json(doc);
          });
        }
      });
    });
  });

  // End Competition
  router.post('/stop', function (req, res) {
    req.db.collection('competitions').then(function (collection) {
      collection.findOne({ active: true }).then(function (doc) {
        if (doc != null) {
          doc.active = false;
          collection.save(doc).then(function () {
            res.json(doc);
          });
        } else {
          res.status(400).json({
            error: 'competition_ended',
            error_description: 'There is no competition running'
          });
        }
      });
    })
  });
}
