var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var routeYonetici = require('./yoneticiRoute');
var routeMusteri = require('./musteriRoute');
var guvenlik = require('./token');
var controllerYon = require('./yoneticiController');
var controllerMus = require('./musteriController');
var ejsLayouts = require('express-ejs-layouts');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Yonetici = require('./yoneticiSchema');
var Musteri = require('./musteriSchema');

mongoose.Promise = require('bluebird');

var db = 'mongodb://localhost/marketdb';

mongoose.connect(db, function (err) {
    if (err) {
        console.log('db baglanti hatali');
    }
    else {
        console.log('db baglanti basarili');
    }
});
    /*
var yeniyonetici = new Yonetici({
        ad: 'ugur',
    sifre: '12345'
});
    yeniyonetici.save(function (err) {
        if(err)
        {
            console.log("kayıtta hatavar");
        }
        else {
            console.log("yonetıcı kayıt basarılı.");
        }
    });
*/
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(cookieParser());
//public klasore erişime izin verdim
app.use('/public', express.static(path.join(__dirname, 'public')));

/*
 app.post('/yoneticiLogin', (req, res)=> {
    console.log("bilgiler:" ,req.body.ad , req.body.sifre);
    var bilgiler = {
        ad: req.body.ad,
        sifre: req.body.sifre
    }
    Yonetici.find({ad: bilgiler.ad, sifre: bilgiler.sifre}, function (err) {
        if (err) {
            res.send({message: "hatali giris"});
            console.log("hatali giris");
        }
        else {
            var userId = "userId";
            var yoneticiMi = false;

            var token = guvenlik.giris(userId, yoneticiMi);
            res.cookie('tkn', token);
            res.sendFile(__dirname + "/views/yoneticiPanel.html");

            // res.status(200,{data: 123123})
            // res.status(200, data)

            // res.render(__dirname + '/views/yoneticiPanel.html', token);
        }
    });
}); */

app.get('/giris', (req, res, next) => {

        // TODO

        // gelen formdaki veriler mongodb ye gonderilecek
        // eger ki mongo db de kayit varsa
        // asagidaki token isteme cagirlacak

        // var {ad, sifre} = req.body;
        // console.log(ad, sifre);
        // Yonetici.find({ad: ad, sifre: sifre}, function (err) {
        //     if (err) {
        //         res.send({message: "hatali giris"});
        //     }
        //     else {
        //         var userId = "userId";
        //         var yoneticiMi = false;
        //
        //         var token = guvenlik.giris(userId, yoneticiMi);
        //         res.cookie('tkn', token);
        //         res.status(200).send({token: token});
        //         //res.send({token: token});
        //         res.sendFile(__dirname + "/views/yoneticiPanel.html");
        //     }
        // });


    }
);

app.get('/cikis', function (req, res) {
    /*
    request(internalUrl).on('response', function (response) {
        response.removeHeader('Authorization');
    }).pipe(res)
    */
    res.cookie('tkn', '');
    res.status(200).send('cikis yapildi');

})

app.get('/dataCek', guvenlik.girisKontrol, (req, res, next) => {

    console.log("islemlar yapilacak");
    var token = req.cookies.tkn;
    var tokenData = jwt.decode(token);
    var userId = tokenData.userId;
    var yoneticiMi = tokenData.yoneticiMi;


    console.log("userId ", userId);
    console.log("yoneticiMi ", yoneticiMi);
    res.send("ok")
});


//app.get('/yoneticiPanel',  routeYonetici); //guvenlik.yoneticiMi
app.use('/musteriLogin', routeMusteri); //guvenlik.musteriMi yazılacak
//app.get('/yoneticiLogin', controllerYon.yoneticiLoginController);
app.use('/yoneticiLogin', routeYonetici);
//app.post('/yoneticiLogin',controllerYon.yoneticiLoginPost);
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8000);


