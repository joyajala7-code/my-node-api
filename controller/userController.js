import { userValidation, userValidationForLogin } from "../validator/userValidator.js"
import { userModel } from "../models/usersSchema.js" 
import { generateToken } from "../utils/generateToken.js";
export const getHome = (req, res) => {
     res.send(`<h1>Welcome to my Backend API!</h1>`)
}
import bcrypt from "bcryptjs";


export const Login = async (req, res) => {
    res.send("Login works");
};

export const getAbout = (req, res) => {
     res.send(`<h1>My name is Ajala Damilola. I am a backend developer learning Node.js</h1>`)
}

export const getGoals = (req, res) => {
     res.send(`<h1>My goal is to master Express and APIs.</h1>`)
}

export const postUser = async (req, res) => {
     const {username, email, password } = req.body;
     try{
          if(email !== "" && password !== ""){
               const { error } = userValidation.validate({ 
                    username,
                    email,
                    password
               });
               if(error){
                    return res.status(400).json({
                         message: error.details[0].message
                    });
               }    

               const newUser = await userModel.create({
                    username,
                    email,
                    password
               });

               const token = await generateToken(existingUser._id);

               res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000         
               });
               
               return res.status(201).json({
                    message: "User created successfully",
                    data : newUser
               });
     
             
          }
          const existingUser = await userModel.findOne({ email });
          if(existingUser){
               return res.status(400).json({
                    message: `User with email ${email} already exists, Please login instead or create a new account`
               });
          } 
          
          
        res.status(400).json({
                    message: "provide email and password",
                    
               });   
     }catch(err){
          console.error(err);
     //  if (email !== "" && password !== "") {
     //      res.send("Details Submitted Successfully!");
     //  } else {
     //      res.send("Email and Password are required!");
    }    //  }
}



export const login = async (req, res) => {
     const { email, password } = req.body;
     try {
         const { error } = userValidationForLogin.validate({ 
          email, 
          password });

               if(error){
                    return res.status(400).json({
                         message: error.details[0].message
                    });
               }
               const existingUser = await userModel.findOne({ email });
               if (!existingUser) {
                    return res.status(404).json({
                         message: `User with email ${email} not found, Please register instead or create a new account`
                    });
               }
               const isPasswordValid = await bcrypt.compare(password, existingUser.password);
               if (!isPasswordValid) {
                    return res.status(401).json({
                         message: "Invalid password, Please try again"
                    });
               }
               return res.status(200).json({
                    message: "Login successful",
                    data: existingUser
               });
     }catch(err){
          console.error(err);
     }}

export const getAllUsers = async (req, res) => {
     try {
          const users = await userModel.find().select("-password");

          if(users){
               return res.status(404).json({
                    message: " No users found",
                  
                    
               })
          }
          return res.status(200).json({
               message: "Users retrieved successfully"
          })
     } catch (err) {
          if(err instanceof Error){
          console.error(err);
         throw new Error(err.message);
          }
     }
}

export const getSingleUser = async (req, res) => {
     const { id } = req.params;
     try{
          const user = await userModel.findById(req.params.id).select("-password");
          if (!user) {
               return res.status(404).json({
                    message: `User with id ${id} not found`
               });
          }
          return res.status(200).json({
               message: "User retrieved successfully",
               data: user
          })
     }catch(err){
          if(err instanceof Error){
          console.error(err);
         throw new Error(err.message);
          }
     }
}

export const deleteSingle = async (req, res) => { 
     const { id } = req.params;
     try{
          const user = await userModel.findByIdAndDelete(id);
          if (!user) {
               return res.status(404).json({
                    message: `User with id ${id} not found`
               });
          }
          return res.status(200).json({
               message: "User deleted successfully",   
               data: user
          })
     }catch(err){
          if(err instanceof Error){
          console.error(err);
         throw new Error(err.message);
          }
     }
}

export const logout = (req, res) => {
     try{
          res.clearCookie("token", {
               httpOnly: true,
               secure: process.env.NODE_ENV === "production",
               sameSite: "lax"
          })
          return res.status(200).json({
               message: "Logout successful"
          })   
     }catch(err){  
          console.error(err);
          }
}