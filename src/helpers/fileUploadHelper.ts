import multer from "multer";
import path from "path";
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import fs from "fs"

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        // console.log(file)
        const fileExt = path.extname(file.originalname);
        const filename = file.originalname.replace(fileExt,"")
        .toLowerCase()
        .split(" ")
        .join("-")+"-"+ Date.now()
        
        cb(null,filename+fileExt)
    }
})

export const upload = multer({ storage: storage })



cloudinary.config({ cloud_name: 'dbgrq28js', api_key: '173484379744282', api_secret: 'eHKsVTxIOLl5oaO_BHxBQWAK3GA', })



export const sendImageCloudinary = (imageName:string,path:string):Promise<Record<string,unknown>>=>{

    return new Promise((resolve,rejects)=>{
        cloudinary.uploader.upload(path,{public_id:imageName.trim()},(error,result)=>{
            fs.unlinkSync(path)
 
            if(error){
                rejects(error)
            }
            resolve(result as UploadApiResponse)
        })
    })
}