import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const uploadOnCloudinary = async (localFilePath) => {
        try {
            if(!localFilePath) return null
            const response = await cloudinary.uploader.upload(localFilePath,{
               resource_type : 'auto' 
            })
            //file has been uploaded successfully
            //console.log("File is uploaded on cloudinary" , response.url);
            fs.unlinkSync(localFilePath) //unlinkSync means synchronous deletion. Instead of doing it async
            return response;
        } catch (error) {
            fs.unlinkSync(localFilePath) //remove the locally saved temp file as the upload got failed
            console.log("File Upload Error")
            return null;
        }
    }
     
    export {uploadOnCloudinary}