const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

const User = require('../../models/User')

router.post('/', async (req,res)=>{

    const {username,email,password} = req.body

    try 
    {
        let user = await User.findOne({email})

        if(user)
        {
            return res.status(400).json({msg:"Korisnik postoji"})
        }

        user = new User({
            username,email,password
        })

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password,salt)

        await user.save()

        const payload = {
            user: {
                id:user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT,
            {expiresIn:3600},
            (error,token)=>{
                
                if(error)
                {
                    throw error
                }

                res.json({token})
            }
        )
    } 
    catch (error) 
    {
        console.error(error.message);
        res.status(500).send('Serverska greska')
    }

})

router.get('/', auth, async (req,res) => {

    try 
    {
        const user = await User.findById(mongoose.Types.ObjectId(req.user.id)).select('-password')

        res.json(user)
    } 
    catch (error) 
    {
        res.status(500).send('Serverska greska')        
    }

})

router.post('/login', async (req, res) => {

    const {email,password} = req.body

    try 
    {
        const user = await User.findOne({email})

        if(!user)
        {
            return res.status(400).json({msg:'Korisnik ne postoji'})
        }

        const match = await bcrypt.compare(password,user.password)

        if(!match)
        {
            return res.status(400).json({msg:'Neispravni email ili sifra'})
        }

        const payload = {
            user:{
                id:user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT,
            {expiresIn:3600},
            (error,token)=>{
                
                if(error)
                {
                    throw error
                }

                res.json({token})
            }
        )
    } 
    catch (error) 
    {
        res.status(500).send('Serverska greska')
    }

})

module.exports = router