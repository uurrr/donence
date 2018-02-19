var path=require('path');
var Yonetici = require('./yoneticiSchema');
var Sube = require('./yoneticiSubeSchema');

module.exports.yoneticiLoginController= function(req,res) {
   res.sendFile(path.join(__dirname,'/yoneticiLogin.html'));
}
module.exports.yoneticiLoginPost = function (req,res) {
    console.log(req.body);
    var  {ad,sifre}=req.body;
    Yonetici.findOne({ad: ad}).then((user) => {
        if (!user) {
            res.send({message: "hatali giris"});
            console.log("hatali giris");
        }
        else
        {
            if(user.sifre == sifre){
                console.log("basarili giris");
                res.sendFile(__dirname + "/yoneticiPanel.html");
            }
            else {
                console.log("hatali sifre..");
            }

        }
    })

}

module.exports.yoneticiPanelController= function(req,res) {
    res.sendFile(path.join(__dirname,'yoneticiPanel.html'));
}
module.exports.yoneticiYeniSubePost= function(req,res) {
    console.log(req.body);
    var SubeBilgiler =new Sube({
        sube: req.body.sube,
        telefon: req.body.telefon
    });
    SubeBilgiler.save().then(
        (data) => {
            console.log("Sube kayit islemi basarili..");
            res.sendFile(path.join(__dirname,'yoneticiYeniSube.html'));
        },
        (err) =>{
            console.log("Sube kayit islemi basarisiz..");
        }
    )
}
module.exports.yoneticiYeniSubeController= function(req,res) {
    res.sendFile(path.join(__dirname,'yoneticiYeniSube.html'));
}

module.exports.yoneticiSubeListeleController= function(req,res) {
    res.sendFile(path.join(__dirname,'yoneticiSubeler.html'));
}
module.exports.yoneticiMusteriListeleController= function(req,res) {
    res.sendFile(path.join(__dirname,'yoneticiMusteriler.html'));
}
module.exports.yoneticiSiparisListeleController= function(req,res) {
    res.sendFile(path.join(__dirname,'yoneticiSiparisler.html'));
}

