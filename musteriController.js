var path=require('path');
var Musteri = require('./musteriSchema');

module.exports.musteriAlisverisController= function(req,res) {
    res.sendFile(path.join(__dirname,'musteriAlisveris.html'));
}
module.exports.musteriSignupController= function(req,res) {
    res.sendFile(path.join(__dirname,'musteriSignup.html'));
}
module.exports.musteriLoginController= function(req,res) {
    res.sendFile(path.join(__dirname,'musteriLogin.html'));
}
module.exports.musteriSignupPost = function (req,res) {
    console.log(req.body);
    var Musteribilgiler =new Musteri({
        ad: req.body.ad,
        soyad: req.body.soyad,
        telefon: req.body.telefon,
        adres: req.body.adres,
        kadi: req.body.kadi,
        sube: req.body.sube,
        sifre:req.body.sifre
    });
    Musteribilgiler.save().then(
        (data) => {
            console.log("müsteri kayit islemi basarili..");
            res.sendFile(path.join(__dirname,'musteriLogin.html'));
        },
        (err) =>{
            console.log("müsteri kayit islemi basarisiz..");
        }
    )
}

module.exports.musteriLoginPost = function (req,res) {
    console.log(req.body);
    var {kadi,sifre}=req.body;

    Musteri.findOne({kadi: kadi}).then((user) => {
        if (!user) {
            res.send({message: "hatali giris, Boyle bir kullanici adi yok."});
            console.log("HATA..boyle bir kullanici adi yok.");
        }
        else
        {
            if(user.sifre == sifre){
                console.log("kullanici girisi basarili. ");
                res.sendFile(path.join(__dirname,'musteriAlisveris.html'));
            }
            else {
                console.log("hatali kullanici giris sifresi..");
            }

        }
    })
}

