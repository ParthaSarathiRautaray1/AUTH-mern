import jwt from 'jsonwebtoken'

export const verifyToken = (request , response, next) =>{
    
    const token = request.cookies.jwt
    if(!token) return response.status(401).send("You are not authorized...")
    jwt.verify(token,process.env.JWT_KEY, async (err,payload) =>{

        if(err) return response.stasus(403).send("Token is not valid...")
        request.userId = payload.userId
        next()

    })

}