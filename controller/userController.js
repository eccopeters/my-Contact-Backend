import asyncHandler from "express-async-handler";
import User from "../model/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const loginUser = asyncHandler(async (req, res)=>{
   const {email, password} = req.body

   const user = await User.findOne({email})
   console.log(user)
   if(user && bcrypt.compare(password, user.password)){
        const accessToken = jwt.sign(
            {
                user:{
                    username: user.username,
                    email: user.email,
                    id: user.id
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "15m"}
        )
        res.status(200)
        res.json(accessToken)
   }else{ res.status(401)
   throw new Error("Unable to login")}

})

const signUpUser = asyncHandler(async (req, res)=>{
    const {username, email, password} = req.body


    const checkUser = await User.find({email})
    
    if(!checkUser){
        res.json(400)
        throw new Error("User with email already exists")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create(
        {
            username,
            email,
            password: hashedPassword

        }
    )
    res.status(200).json({user})
})

const currentUser = asyncHandler(async (req, res)=>{
    // res.json("current USER")
    const userid = req.user.id 

    const user = User.find({_id: userid})
    res.json({user})
})

export {signUpUser, loginUser, currentUser}