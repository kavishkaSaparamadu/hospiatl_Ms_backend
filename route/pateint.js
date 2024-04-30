const router= require("express").Router();
const pateint = require("../models/hospital");
let Pateint = require("../models/hospital");

http://localhost:8070/pateint/add

router.route("/add").post((req,res) =>{

    
    const name =req.body.name;
    const age = Number(req.body.age);
    const gender =req.body.gender;
    const address =req.body.address;
    const disease =req.body.disease;
    const contac =req.body.contac;
    const email=req.body.email;

    const newPateint = new Pateint({
         
            name,
            age,
            gender,
            address,
            disease,
            contac,
            email

    })

    newPateint.save().then(()=>{
        res.json("Pateint Added")
    }).catch((err)=>{
        console.log(err);
    })

})
http://localhost:8070/pateint

router.route("/").get((req,res)=>{
    pateint.find().then((pateint)=>{
        res.json(pateint)
    }).catch((err)=>{
        console.log(err)
    })
})

htt://localhost:8070/pateint/update/5fuddhsjhdjshd
router.route("/update/:pateintid").put(async(req,res)=>{
    let userId =req.params.pateintid;
    const {name, age , gender, address, disease,contac,email}= req.body;

    const updatePateint ={
        name,
        age,
        gender,
        address,
        disease,
        contac,
        email
    }

    const update = await Pateint.findByIdAndUpdate(userId,updatePateint)
    .then(()=>{

        res.status(200).send({status: "user update",user: update})
   
    }).catch((err)=>{
        console.log(err);
    })

})

http://localhost:8070/pateint/delete/6vgsggsa

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

module.exports = router;