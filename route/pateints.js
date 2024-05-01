const router = require("express").Router();
let Pateint = require('../models/pateint');



router.route("/add").post((req,res) =>{

    
    const name =req.body.name;
    const age =(req.body.age);
    const gender =req.body.gender;
    const address =req.body.address;
    const disease =req.body.disease;
    
    const email=req.body.email;
    const password=req.body.password;

    const newPateint = new Pateint({
         
            name,
            age,
            gender,
            address,
            disease,
            email,
            password

    })

    newPateint.save().then(()=>{
        res.json("Pateint Added")
    }).catch((err)=>{
        console.log(err);
    })

})


router.route("/").get((req,res)=>{
    pateint.find().then((pateint)=>{
        res.json(pateint)
    }).catch((err)=>{
        console.log(err)
    })
})


router.route("/update/:pateintid").put(async(req,res)=>{
    let userId =req.params.pateintid;
    const {name ,age, gender, address, disease,email}= req.body;

    const updatePateint ={
        name,
        age,
        gender,
        address,
        disease,
        email
    }

    const update = await Pateint.findByIdAndUpdate(userId,updatePateint)
    (()=>{

        res.status(200).send({status: "user update",user: update})
   
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/delete/:pateintid").delete(async (req,res)=>{
    let userId = req.params.pateintid;
    await Pateint.findByAndDelete(userId)
    .then(()=>{
        req.status(200).send({status: "user deleted"});
    }).catch((err)=>{
        console.log(err.message);
    })
})

router.route("/get/:pateintid").get(async(req,res)=>{
    let userId =req.params.pateintid;
  const user =  await Pateint.findById(userId)
  .then(()=>{
    res.status(200).send({status: "User fetched", user: user})
  }).catch(()=>{
    console.log(err.message);
    
  })
})
router.route("/patients").get((req, res) => {
    Pateint.find()
        .then((patients) => {
            res.json(patients); // Return the array of patients as JSON
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "An error occurred while retrieving patients" });
        });
});
module.exports = router;