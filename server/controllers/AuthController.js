import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) =>{
    return jwt.sign({email,userId},process.env.JWT_KEY,{ expiresIn: maxAge })
}

export const signup = async (request , response , next) =>{
    try {
        const {email,password} = request.body;
        if(!email || !password) {
            return response.status(400).send("Email and Password Should be Filled.")
        }

        const user = await User.create({email,password})
        response.cookie("jwt", createToken(email,user.id),{
            maxAge,
            secure: true,
            sameSite: "None",
        })

        return response.status(201).json({
            user:{
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,

            },
        });

    }catch (error) {
        console.log('Backend signup error:', error)
        return response.status(500).send("Internal Server Errorrr")
    }
}


export const login = async (request , response , next) =>{
    try {
        const {email,password} = request.body;
        if(!email || !password) {
            return response.status(400).send("Email and Password Should be Filled.")
        }

        const user = await User.findOne({ email })
        if(!user){
            return response.status(404).send("User With The Given Email Not Found.")
        }
        const auth = await compare(password, user.password);

        if(!auth){
            return response.status(400).send("Password Incorrect.")
        }

        response.cookie("jwt", createToken(email,user.id),{
            maxAge,
            secure: true,
            sameSite: "None",
        })

        return response.status(200).json({
            user:{
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName : user.firstName,
                lastName: user.lastName,
                image: user.image,
                color:user.color,

            },
        });

    }catch (error) {
        console.log('Backend signup error:', error)
        return response.status(500).send("Login Server Errorrr")
    }
}

export const getUserInfo = async (request , response , next) =>{
    try {
        
        // return response.status(200).json({
        //     user:{
        //         id: user.id,
        //         email: user.email,
        //         profileSetup: user.profileSetup,
        //         firstName : user.firstName,
        //         lastName: user.lastName,
        //         image: user.image,
        //         color:user.color,

        //     },
        // });

    }catch (error) {
        console.log('Backend signup error:', error)
        return response.status(500).send("Login Server Errorrr")
    }
}