const mongoose = require('mongoose');
const CollegeSchema = new mongoose.Schema({
name: String,
location: {
type: { type: String, default: 'Point' },
coordinates: { type: [Number] } // [lon, lat]
},
address: String,
degrees: [String], // B.A, B.Sc, B.Com, etc.
cutoffs: Object,
facilities: [String],
medium: String,
contact: String
});
CollegeSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('College', CollegeSchema);