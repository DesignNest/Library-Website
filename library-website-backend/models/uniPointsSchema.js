const mongoose = require('mongoose');

const UniPointsSchema = new mongoose.Schema({
username:{
    type:String,
    required:true,

},
uniPoints:{
    type:Number,
    required:true
}
});

module.exports = mongoose.model("UniPoints", UniPointsSchema);
