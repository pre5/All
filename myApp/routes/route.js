const express = require('express')
const router = express.Router()

router.route("/hh").get((req,res)=>{
    res.send("hellp")
})

module.exports= router