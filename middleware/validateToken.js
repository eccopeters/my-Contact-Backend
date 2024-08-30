import jwt from "jsonwebtoken"

const validateToken = async (req, res, next)=>{
    const authToken = req.headers.authorization
    let accessToken
    // console.log(authToken)

    if(authToken){
        accessToken = authToken.split(" ")[1]

        await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
            if(err){
                res.status(500)
                throw new Error("Server Error")
            }
            req.user = decoded.user
            next()
        })
    }else{
        res.status(401)
        // throw new Error("User not Authorised")
    res.json({msg: "User not authorised"})
    }
}


export default validateToken