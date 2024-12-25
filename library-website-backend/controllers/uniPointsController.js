const UniPoints = require('../models/uniPointsSchema');

module.exports.checkUniPoints = async (req, res) => {
  const { username } = req.body;

  try {
    let user = await UniPoints.findOne({ username });

    if (!user) {
      user = new UniPoints({ username, uniPoints: 0 });
      await user.save();
    }

    res.status(200).json({ uniPoints: user.uniPoints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unexpected Error Occurred" });
  }
};
