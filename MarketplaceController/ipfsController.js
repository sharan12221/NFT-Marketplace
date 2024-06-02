import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import axios from "axios";
import FormData from "form-data";
const __dirname = path.resolve();

dotenv.config();

const JWT = process.env.pinataJWT;
// console.log("🚀 ~ JWT:", JWT)

const imagePath = path.join(__dirname,'MarketplaceController','./ss.jpg')

export const uploadToIPFS=async(nftName, imagePath)=> {
  console.log("Uploading Image")
    try {
      const formData = new FormData();
      const file = fs.createReadStream(imagePath);
      formData.append("file", file);
  
      const pinataMetadata = JSON.stringify({
        name: nftName,
      });
      formData.append("pinataMetadata", pinataMetadata);
  
      const pinataOptions = JSON.stringify({
        cidVersion: 1,
      });
      formData.append("pinataOptions", pinataOptions);
  
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        }
      );
      console.log("IPFS Hash: ",res.data.IpfsHash);
      return res.data.IpfsHash;
    } catch (error) {
      console.log("Error: ",error);
      return Error;
    }
  }

  // uploadToIPFS("1st", imagePath);
  export default uploadToIPFS;