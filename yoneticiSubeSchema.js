var mongoose =  require('mongoose');
var schema = mongoose.Schema;

var SubeSchema= new schema ({
        sube:{
            type: String,
            unique: true
        },
        telefon:String
});

var sube = mongoose.model('sube',SubeSchema);

module.exports = sube;