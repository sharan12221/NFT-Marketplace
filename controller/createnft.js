const {ethers} = require ('ethers');
require('dotenv').config();
const fs = require ('fs');
const path = require ('path')
const axios = require("axios");
const FormData = require("form-data");

const pvtKey = process.env.privateKey;
const contractAddress = process.env.contractAddress;
const httpUrl = process.env.infuraUrl;
const JWT = process.env.pinataJWT;


let current = path.join(__dirname,'./../contract/abi.json') 
const abi = JSON.parse(fs.readFileSync(current))


const provider = new ethers.providers.JsonRpcProvider(httpUrl);
const signer = new ethers.Wallet(pvtKey, provider);
const MarketPlaceContract = new ethers.Contract(contractAddress, abi, signer);

module.exports = async function creteateNFT (nftName, imagePath){
    const create =await MarketPlaceContract.createToken(uploadToIPFS(nftName, imagePath));
    console.log(create);
    return create;
}

module.exports = async function listNFT (tokenId, price){                 
    const list = MarketPlaceContract.ListToken(tokenId, price, {value : 0.001});      //// if in contract function used msg.value then we have to assign like this 
    console.log("🚀 ~ listNFT ~ list:", list)
    return list;
}

async function uploadToIPFS(nftName, imagePath) {
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
    //   console.log("IPFS Hash: ",res.data.IpfsHash);
      return res.data.IpfsHash;
    } catch (error) {
    //   console.log("Error: ",error);
      return Error;
    }
  }

module.exports = async function getTokenUri(id){
    const get = await MarketPlaceContract.tokenURI(id);
    console.log("🚀 ~ getTokenUri ~ get:", get)
    return get;
  }

module.exports = async function getAllNFT(){
    const getNFTS = await MarketPlaceContract.getAllNFTs();
    return getNFTS;
} 

module.exports = async function getMyNFT() {
    const MyNFT = await MarketPlaceContract.getMyNFTs();
    return MyNFT;
}

module.exports = async function getListedNFT() {
  const listed = await MarketPlaceContract.getListedNFTs();
  return listed;
}




// creteateNFT()