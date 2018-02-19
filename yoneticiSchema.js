var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var yoneticiSchema= new Schema({
    ad: String,
    sifre: String
});

// export mongoose.model('User', userSchema);
//module.exports(mongoose.model('User', userSchema));

var yonetici = mongoose.model('yonetici', yoneticiSchema);
module.exports = yonetici;
