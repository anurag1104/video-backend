import {asyncHandler} from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js"

const registerUser = asyncHandler( async(req, res) =>{

    //get user details from frontend
    //validation
    //Check if user already exists : username, email
    //Check for images, check for avatar
    //Upload images to cloudinary, check avatar
    //Create user object - create entry in db
    //Remove password and refresh token field from response
    //Check for user creation
    //Return Response

    const {fullName, username, email, password} = req.body  //destructuring the body
    console.log("email :", email)
    if (
        [fullName, email, username, password].some( (field)=> field?.trim() === "" ) //as soon as any empty fields enters this cb, we receive a true boolean
        ){
            throw new apiError(400, "All fields are required")
        }  
    const existedUser = User.findOne({
        $or : [{username},{email}]
    })
    if (existedUser){
        throw new apiError(409, "User with this email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;  //to validate file upload. The req.files is made available by multer middleware
    const coverLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath){
        throw new apiError(400, "Avatar File is required")
    }
    if (!coverLocalPath){
        throw new apiError(400, "Cover image is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath) //await because this might take time
    const coverImage = await uploadOnCloudinary(coverLocalPath)
    if (!avatar) {
        throw new apiError(400,"Avatar file is required")
    }
    if (!coverImage){
        throw new apiError(400,"Cover image is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage : coverImage.url || "",
        email,
        password,
        username : username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password, -refreshToken"
    ) //this removes these fields from the response

    if(!createdUser){
        throw new apiError(500,"Something went wrong while registering the user")
    }
    
    return res.status(201).json(
        new ApiResponse(200, createdUser,"User registered successfully") //Use the API response 
    )

    })

export {registerUser}
