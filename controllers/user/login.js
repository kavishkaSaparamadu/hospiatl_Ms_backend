const User = require('../../models/user');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json("User Not Found");
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(402).json("Password Incorrect");
    }

    // Login success
    const { userRole, name } = user;
    return res.json({ Login: true, role: userRole, userName: name, userId: customId });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

  
  exports.isAuth = async (req, res) => {
    try {
      // Here you can check if the user is authenticated based on your session mechanism
      // For example, you can check if req.session.userId exists or any other property you set during authentication
      // Then return the appropriate response
  
      // For demonstration purposes, let's assume the user is authenticated if they have a session property named userId
      const isAuthenticated = req.session.userId ? true : false;
  
      return res.json({ isAuthenticated });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };