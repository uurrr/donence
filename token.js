var jwt = require('jsonwebtoken');
var cert = "wefgp823gig12p389fgq2823qbfo2qubcf2qpi"; //fs.readFileSync('private.key');  // get private key
var path=require('path');

module.exports.giris = function (userId, yoneticiMi) {
    var token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 saat sonra token suresi doluyor
        data: 'foobar',
        userId: userId,
        yoneticiMi: yoneticiMi
    }, cert);
    return token;
}

module.exports.girisKontrol = function (req, res, next) {
    if (!req.cookies.tkn || req.cookies.tkn.length < 1) {
        res.sendFile(path.join(__dirname,'index.html'));

    }
    var token = req.cookies.tkn;

    jwt.verify(token, cert, function (err, decoded) {
        if (err) {
            res.sendFile(path.join(__dirname,'index.html'));
        }
        else {
            next();
        }
    });
}

module.exports.yoneticiMi = function (req, res, next) {


    if (!req.cookies.tkn || req.cookies.tkn.length < 1) {
        res.sendFile(path.join(__dirname, 'yoneticiLogin.html'));
    }
    else {
        var token = req.cookies.tkn;
        var tokenData = jwt.decode(token);

        jwt.verify(token, cert, function (err, decoded) {
            if (err) {
                res.sendFile(path.join(__dirname,'yoneticiLogin.html'));
            }
        });

        var yoneticiMi = tokenData.yoneticiMi;

        if (!yoneticiMi) {
            res.sendFile(path.join(__dirname, 'yoneticiLogin.html'));
        }
        else {
                next();
            }
        }
    }

