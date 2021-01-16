const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../../middleware/auth')
const checkObjectId = require('../../middleware/checkObjectId')
const Car = require('../../models/Car')
const upload = require('../../middleware/multer')

router.get('/', async (req,res) => {

    try 
    {
        const query = {}
        const sortBy = req.query.sortBy
        const orderBy = req.query.orderBy
        const marka = req.query.marka
        const model = req.query.model
        const karoserija = req.query.karoserija

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
        const cars = await Car.find(query).sort([[sortBy,orderBy]])

        res.json(cars)
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

//stoji samo p zato sto javlja gresku unexpected field, umesto slika
router.post('/', auth, upload.single('p'), async (req,res) => {
    
    try 
    {    
        const newCar = new Car({
            marka:req.body.marka,
            model:req.body.model,
            godiste:req.body.godiste,
            kilometraza:req.body.kilometraza,
            karoserija:req.body.karoserija,
            gorivo:req.body.gorivo,
            kubikaza:req.body.kubikaza,
            snagaMotora:req.body.snagaMotora,
            cena:req.body.cena,
            slika:req.file.path,
            user:mongoose.Types.ObjectId(req.user.id),
        })

        const car = await newCar.save()

        if(car) 
        {
            res.json(car)    
        }
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