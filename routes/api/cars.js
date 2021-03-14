const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../../middleware/auth')
const checkObjectId = require('../../middleware/checkObjectId')
const Car = require('../../models/Car')
const {Storage} = require('@google-cloud/storage')
const upload = require('../../middleware/multer')
const {format} = require('util')
const { v4: uuid } = require("uuid")

router.get('/', async (req,res) => {

    try 
    {
        const query = {}
        const sortBy = req.query.sortBy
        const orderBy = req.query.orderBy
        const marka = req.query.marka
        const model = req.query.model
        const karoserija = req.query.karoserija
        const maxKilometraza = req.query.maxKilometraza

        const stranaSize = 9
        const strana = Number(req.query.brojStrane) || 1

        if(marka !== undefined)
        {
            query['marka']=marka
        }
        if(model !== undefined)
        {
            query['model']=model
        }
        if(karoserija !== undefined)
        {
            query['karoserija']=karoserija
        }

        const count = await Car.countDocuments(query)
        const cars = await Car.find(query).sort([[orderBy,sortBy]]).limit(stranaSize).skip(stranaSize * (strana - 1))
        const cene = await Car.find(query).select('cena -_id')
        const kilometraza = await Car.find().select('kilometraza -_id').sort({"kilometraza":-1}).limit(1)
        const maxGodina = await Car.find().select('godiste -_id').sort({"godiste":-1}).limit(1)
        const minGodina = await Car.find().select('godiste -_id').sort({"godiste":1}).limit(1)
        const maxCena = await Car.find().select('cena -_id').sort({"cena":-1}).limit(1)
        const minCena = await Car.find().select('cena -_id').sort({"cena":1}).limit(1)
        const maxKubikaza = await Car.find().select('kubikaza -_id').sort({"kubikaza":-1}).limit(1)
        const minKubikaza = await Car.find().select('kubikaza -_id').sort({"kubikaza":1}).limit(1)
        const ucitano = true

        res.json({cars,cene,kilometraza,maxGodina,minGodina,maxCena,ucitano,minCena,maxKubikaza,minKubikaza,strana,strane: Math.ceil(count/stranaSize)})
    } 
    catch (error) 
    {
        console.error(error.message)
        res.status(500).send('Serverska greska')
    }

})

router.get('/myCars', auth, async (req,res) => {

    try 
    {
        const cars = await Car.find({user:mongoose.Types.ObjectId(req.user.id)})

        res.json(cars)
    } 
    catch (error) 
    {
        console.error(error.message)
        res.status(500).send('Serverska greska')
    }

})

router.get('/last20cars', async (req,res) => {

    try 
    {
        const cars = await Car.find().sort({datum:-1}).limit(20)

        res.json(cars)
    } 
    catch (error) 
    {
        console.error(error.message)
        res.status(500).send('Serverska greska')
    }

})

const storage = new Storage({
    projectId:process.env.GOOGLE_PROJECT_ID,
    keyFileName:process.env.GOOGLE_APPLICATION_CREDENTIALS
})

const bucket = storage.bucket(process.env.GOOGLE_BUCKET_PATH)

const imageUpload = (fajl) => {
    return new Promise((resolve,reject) => {

        if(!fajl)
        {
            reject("No file")
        }

        let newName = `${fajl.originalname}_${Date.now()}`
    
        let fileUpload = bucket.file(newName)

        let niz = []
    
        const blobStream = fileUpload.createWriteStream({
            metadata:{
                contentType: fajl.mimetype,
                metadata:{
                    firebaseStorageDownloadTokens:uuid()
                }
            }
        })
    
        blobStream.on('error',(error) => {
            reject("Lionel Ritchie")
            console.error(error.message)
        })
    
        blobStream.on('finish',() => {
            fileUpload.getSignedUrl({action:'read',expires:'01-01-2999'},function(error,url){
                resolve(url)
            })
        })
    
        blobStream.end(fajl.buffer)
    })
}

//stoji samo p zato sto javlja gresku unexpected field, umesto slika
router.post('/', auth, upload.array('photoFiles',8), async (req,res) => {

    try 
    {
        const nizFajlova = req.files

        const niz = []

        if(nizFajlova)
        {
            for(let i=0;i<nizFajlova.length;i++)
            {
                let a = await imageUpload(nizFajlova[i])
                console.log(a)
                niz.push(a)
            }
        }

        console.log(niz)

        const newCar = new Car({
            marka:req.body.marka,
            model:req.body.model,
            godiste:req.body.godiste,
            karoserija:req.body.karoserija,
            gorivo:req.body.gorivo,
            obelezje:req.body.obelezje,
            kubikaza:req.body.kubikaza,
            snaga:req.body.snaga,
            kilometraza:req.body.kilometraza,
            pogon:req.body.pogon,
            emisionaKlasaMotora:req.body.emisionaKlasaMotora,
            menjac:req.body.menjac,
            brojVrata:req.body.brojVrata,
            brojSedista:req.body.brojSedista,
            stranaVolana:req.body.stranaVolana,
            klima:req.body.klima,
            boja:req.body.boja,
            registrovanDo:req.body.registrovanDo,
            ostecenje:req.body.ostecenje,
            zamena:req.body.zamena,
            porekloVozila:req.body.porekloVozila,
            zemljaUvoza:req.body.zemljaUvoza,
            brojSasije:req.body.brojSasije,
            airbag:req.body.airbag,
            abs:req.body.abs,
            alarm:req.body.alarm,
            blokadaMotora:req.body.blokadaMotora,
            kodiranKljuc:req.body.kodiranKljuc,
            centralnoZakljucavanje:req.body.centralnoZakljucavanje,
            asr:req.body.asr,
            mehanickaZastita:req.body.mehanickaZastita,
            childLock:req.body.childLock,
            metalikBoja:req.body.metalikBoja,
            servoVolan:req.body.servoVolan,
            siber:req.body.siber,
            daljinskoZakljucavanje:req.body.daljinskoZakljucavanje,
            toniranaStakla:req.body.toniranaStakla,
            elektricniPodizaci:req.body.elektricniPodizaci,
            elektricniRetrovizori:req.body.elektricniRetrovizori,
            xenonSvetla:req.body.xenonSvetla,
            krovniNosac:req.body.krovniNosac,
            kukaZaVucu:req.body.kukaZaVucu,
            kamera:req.body.kamera,
            dpfFilter:req.body.dpfFilter,
            multimedija:req.body.multimedija,
            parkingSenzori:req.body.parkingSenzori,
            podesivaSedista:req.body.podesivaSedista,
            prviVlasnik:req.body.prviVlasnik,
            garancija:req.body.garancija,
            garaziran:req.body.garaziran,
            servisnaKnjiga:req.body.servisnaKnjiga,
            rezervniKljuc:req.body.rezervniKljuc,
            restauiran:req.body.restauiran,
            oldtimer:req.body.oldtimer,
            taxi:req.body.taxi,
            tuning:req.body.tuning,
            cena:req.body.cena,
            fiksnaCena:req.body.fiksnaCena,
            licitiranje:req.body.licitiranje,
            opisZamene:req.body.opisZamene,
            dodatniOpis:req.body.dodatniOpis,
            ime:req.body.ime,
            adresa:req.body.adresa,
            telefon:req.body.telefon,
            mesto:req.body.mesto,
            slike:niz,
            user:mongoose.Types.ObjectId(req.user.id),
        })

        const car = await newCar.save()

        console.log(car)
    } 
    catch (error) 
    {
        console.error(error.message)
        res.status(500).send('Serverska greska')
    }
})

router.get('/:id', async (req,res) => {

    try 
    {
        const car = await Car.findById(req.params.id)

        if(!car)
        {
            return res.status(404).json({msg:'Auto nije nađen'})
        }

        res.json(car)
    } 
    catch (error) 
    {
        console.error(error.message)
        res.status(500).send('Serverska greska')
    }

})

router.delete('/:id', auth, checkObjectId('id'), async(req,res) => {

    try 
    {
        const car = await Car.findById(req.params.id)

        if(!car)
        {
            return res.status(404).json({msg:'Auto nije nađen'})
        }

        if(car.user.toString() !== req.user.id)
        {
            return res.status(401).json({msg:'Nemate dozvolu za brisanje'})
        }

        await car.remove()

        res.json({success:true})
    } 
    catch (error) 
    {
        console.error(error.message)
        res.status(500).send('Serverska greska')
    }

})

router.put('/:id', auth, checkObjectId('id'), async(req,res) => {

    try 
    {
        let car = await Car.findById(req.params.id)

        if(!car)
        {
            return res.status(404).json({msg:'Auto nije nađen'})
        }

        if(car.user.toString() !== req.user.id)
        {
            return res.status(401).json({msg:'Nemate dozvolu za izmenu'})
        }

        car = await Car.findOneAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true})

        res.json({success:true})
    } 
    catch (error) 
    {
        console.error(error.message)
        res.status(500).send('Serverska greska')
    }

})

module.exports = router