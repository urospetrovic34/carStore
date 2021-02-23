const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CarSchema = new Schema({
    slike:[{
        type:String
    }],
    marka:{
        type:String,
        required: false
    },
    model:{
        type:String,
        required: false
    },
    godiste:{
        type:Number,
        required: false
    },
    gorivo:{
        type:String,
        default:'Benzin'
    },
    karoserija:{
        type:String,
        default:'Minivan'
    },
    obelezje:{
        type:String,
        default:"",
        required: false
    },
    datum: {
        type: Date,
        default: Date.now
    },
    kubikaza:{
        type:Number,
        required: false
    },
    snaga:{
        type:Number,
        required: false
    },
    kilometraza:{
        type:Number,
        required: false
    },
    menjac:{
        type:String,
        default:'Manuelni'
    },
    emisionaKlasaMotora:{
        type:String,
        default:'Euro 5'
    },
    pogon:{
        type:String,
        default:'Zadnji'
    },
    brojVrata:{
        type:String,
        default:'2/3'
    },
    brojSedista:{
        type:String,
        default:'5'
    },
    stranaVolana:{
        type:String,
        default:'Leva'
    },
    klima:{
        type:String,
        default:'Ima'
    },
    boja:{
        type:String,
        default:'Bela'
    },
    registrovanDo:{
        type:Date,
        required: false
    },
    ostecenje:{
        type:String,
        default:'Ima'
    },
    zamena:{
        type:String,
        default:'Bez zamene'
    },
    opisZamene:{
        type:String,
        required: false
    },
    brojSasije:{
        type:String,
        required:false
    },
    porekloVozila:{
        type:String,
        default:'Domaće tablice'
    },
    zemljaUvoza:{
        type:String,
        default:'Srbija',
        required: false
    },
    airbag:{
        type:String,
        required:false
    },
    abs:{
        type:String,
        required:false
    },
    alarm:{
        type:String,
        required:false
    },
    blokadaMotora:{
        type:String,
        required:false
    },
    kodiranKljuc:{
        type:String,
        required:false
    },
    centralnoZakljucavanje:{
        type:String,
        required:false
    },
    asr:{
        type:String,
        required:false
    },
    mehanickaZastita:{
        type:String,
        required:false
    },
    childLock:{
        type:String,
        required:false
    },
    metalikBoja:{
        type:String,
        required:false
    },
    servoVolan:{
        type:String,
        required:false
    },
    siber:{
        type:String,
        required:false
    },
    daljinskoZakljucavanje:{
        type:String,
        required:false
    },
    toniranaStakla:{
        type:String,
        required:false
    },
    elektricniPodizaci:{
        type:String,
        required:false
    },
    elektricniRetrovizori:{
        type:String,
        required:false
    },
    xenonSvetla:{
        type:String,
        required:false
    },
    krovniNosac:{
        type:String,
        required:false
    },
    kukaZaVucu:{
        type:String,
        required:false
    },
    kamera:{
        type:String,
        required:false
    },
    dpfFilter:{
        type:String,
        required:false
    },
    multimedija:{
        type:String,
        required:false
    },
    parkingSenzori:{
        type:String,
        required:false
    },
    podesivaSedista:{
        type:String,
        required:false
    },
    prviVlasnik:{
        type:String,
        required:false
    },
    garancija:{
        type:String,
        required:false
    },
    garaziran:{
        type:String,
        required:false
    },
    servisnaKnjiga:{
        type:String,
        required:false
    },
    rezervniKljuc:{
        type:String,
        required:false
    },
    restauiran:{
        type:String,
        required:false
    },
    oldtimer:{
        type:String,
        required:false
    },
    taxi:{
        type:String,
        required:false
    },
    tuning:{
        type:String,
        required:false
    },
    cena:{
        type:String,
        default:'Po dogovoru',
    },
    fiksnaCena:{
        type:String,
        required:false
    },
    licitiranje:{
        type:String,
        required:false
    },
    mesto:{
        type:String,
        required: false
    },
    adresa:{
        type:String,
        required: false
    },
    telefon:{
        type:String,
        required: false
    },
    ime:{
        type:String,
        required: false
    },
    dodatniOpis:{
        type:String,
        required:false
    },
    status:{
        type:String,
        default:"Neaktivan",
        required:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: false
    }
})

module.exports = Car = mongoose.model('car',CarSchema)