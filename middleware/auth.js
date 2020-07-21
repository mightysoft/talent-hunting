const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const token =  res.header('x-auth-token');

    // checking for token
    if(!token)
        return res.status(401).json({ msg : 'No token, authorization denied'});

    try{
        // Varify token
        const decoded = jwt.varify(token, process.env.JWT_SECRET);

        // Add user from payload
        req.user = decoded;
        next();
    }catch(error){
        res.status(400).json({ msg: 'Token is not valid'});
    }
}


module.exports = auth;

