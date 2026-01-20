const jwt=require('jsonwebtoken');
const generateToken=(id)=>{                                     //Function to generate JWT token
    return jwt.sign({id},process.env.JWT_SECRET,{               //Signing the token with user id and secret key
        expiresIn:'30d',                                        //Token will expire in 30 days
    });
}

module.exports=generateToken;