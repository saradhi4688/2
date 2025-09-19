const College = require('../models/College');

// list colleges; if geolocation provided, use 2dsphere query
exports.list = async (req, res) => {
  try {
    const { lat, lon, radius } = req.query;
    if (lat && lon) {
      // convert km to meters
      const meters = (parseFloat(radius) || 50) * 1000;
      const docs = await College.find({
        location: {
          $near: {
            $geometry: { type: 'Point', coordinates: [parseFloat(lon), parseFloat(lat)] },
            $maxDistance: meters
          }
        }
      }).limit(100);
      return res.json(docs);
    } else {
      const docs = await College.find().limit(200);
      return res.json(docs);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getById = async (req, res) => {
  try {
    const c = await College.findById(req.params.id);
    if (!c) return res.status(404).json({ msg: 'College not found' });
    res.json(c);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
