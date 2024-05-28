
const {Router} = require('express')
const bcrypt = require("bcrypt");
// const users =require("../../models/user");
const router = Router();
// router.post('/register', async(req, res) => {

//     console.log(req.body);
//     try {
//         const userExists = await users.findOne({ email: req.body.email});
//         if (userExists) {
//             return res.status(200).send({message : "User already exists", success:false});
//         }
//             const password = req.body.password;
//             const salt =await bcrypt.genSalt(10);
//             const hashedPassword = await bcrypt.hash(password, salt);
//             req.body.password = hashedPassword;
//             const newUser = new users(req.body);
//             await newUser.save();
//         res.status(200).send({ message:"User Created successfully",success: true });
//     }catch(error) {
//         res.status(500).send({message:"Error creating user",success: false,error});
//     }
// })
// Route for registering a new user

const User = require("../../models/user"); // Adjust the path as necessary


// Route for registering a new user
router.post('/register', async (req, res) => {
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.Password, 10);

    // Create the new user with the hashed password and provided role
    const newUser = new User({
      customId: req.body.customId,
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      address: req.body.address,
      email: req.body.email,
      Password: hashedPassword,
      role: req.body.role
    });

    // Save the user to the database
    await newUser.save();

    res.status(200).json({ success: true, message: 'User added successfully' });
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ success: false, message: 'Error registering user: ' + err.message });
  }
});

module.exports = router;


router.post('/login', async(req, res) => {
    try {

    }catch(error) {

    }
})

module.exports=router;
