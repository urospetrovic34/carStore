const jwt = require('jsonwebtoken')

function auth(req,res,next)
{
    const token = req.header('x-auth-token')

    if(!token)
    {
        return res.status(401).json({msg:'Nema dozvole za pristup'})
    }
    
    try 
    {
        const decoded = jwt.verify(token,process.env.JWT)
        req.user = decoded
        next()
    } 
    catch (error) 
    {
        res.status(400).json({msg:'Dozvola odbijena'})
    }

}

module.exports = auth