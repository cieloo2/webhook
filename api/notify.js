const express = require("express");
const router = express();
const CryptoJS = require("crypto-js");
const moment = require("moment");

var secret = "5a120Yn7eSwt3nrs";


// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
router.use(express.json());

router.get('api/notify', (req, res)=>{
    res.send('Right route 🫡💚')
})

router.post("/api/notify", (req, res) => {
  var date = moment().format();
  var statusStr = req.body.status.status;
  var requestId = req.body.requestId;
  var hash = CryptoJS.SHA1(requestId+statusStr+date+secret);
  var signatureStr = hash.toString();
  if (signatureStr === req.body.signature) {
    console.log(signatureStr, " // vs   //  ", req.body.signature);
    res.status(201).json({response: `OK: Correct to signature ${hash}`});
  } else {
    console.log(signatureStr, " // vs   //  ", req.body.signature);
    res.status(401).json({response: "Error: no estas haciendo bien el hash."});
  }
});

module.exports = router;
