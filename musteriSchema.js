var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var musteriSchema= new Schema({
    ad: String,
    soyad: String,
    telefon: String,
    adres: String,
    kadi: {
        type: String,
        unique:true,
        required:[true,'lütfen giriş için kullanıcı adı giriniz..']
    },
    sube: String,
    sifre: String

});

var musteri = mongoose.model('musteri', musteriSchema);
module.exports = musteri;
