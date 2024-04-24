const {ethers} = require ('ethers');
require('dotenv').config();
const fs = require ('fs');
const path = require ('path')
const axios = require("axios");
const FormData = require("form-data");
// const JWT = process.env.pinataJWT; 

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiOTZmMzVmZC01NGM4LTQyMTUtOGU2ZS1iYjBhOWIyYjIxY2EiLCJlbWFpbCI6InNoYXJhbndha2FkZTEyMzRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImM3ZjQwZmRmN2JhMTM4MmI4ZWUyIiwic2NvcGVkS2V5U2VjcmV0IjoiYzljMDY3MTFhNTRkZWJiZjE1OGU4YmRiMjY1ZDYyYzFlYjk3MjhhZWZiMDA1OTY2MjlmNmFmODVlZTM3ODNhNCIsImlhdCI6MTcxMzk2NjczNX0.7t77j48Ml90qyscZOYswK_S713u-B0RIXHFg5HozcQo";

let current = path.join(__dirname,'./../abis/myNftMarketplaceAbi.json') 

const abi = JSON.parse(fs.readFileSync(current))
// const pvtKey = process.env.privateKey;
// const contractAddress = process.env.contractAddress;
// const httpUrl = process.env.infuraUrl;

const pvtKey = "035e3c4864209b7f751ad27138a14359d8c4615f3d63ca8a96d015ba740a14f8"
const contractAddress = "0x16d20950C681F5b59Ae2B3884e293EeEcb8167B7"
const httpUrl = "https://sepolia.infura.io/v3/9b2c8fbbdd6c4e67af87bc743dcafe0d"


const provider = new ethers.providers.JsonRpcProvider(httpUrl);
const signer = new ethers.Wallet(pvtKey, provider);
const MarketPlaceContract = new ethers.Contract(contractAddress, abi, signer);


const baseURI = "ipfs://";

module.exports = async function createNFT(nftName, imagePath){

    const ipfsid = await uploadToIPFS(nftName, imagePath)
    const create = await MarketPlaceContract.createToken("sharan")
    return create;
}
 
// createNFT("Sharan", "./img/nft_Image.png")


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
  



// module.exports = async function getAllNFT(){
//     const getNFTS = await MarketPlaceContract.getAllNFTs();
//     return getNFTS;
// }


// module.exports = async function getMyNFT() {
//     const MyNFT = await MarketPlaceContract.getMyNFTs();
//     return MyNFT;
// }

// module.exports = async function ownerOfToken(id){
//     const owner = MarketPlaceContract.ownerOf(id);
//     return owner;    
// }

// module.exports = async function tokenUri(id){
//     const uri = MarketPlaceContract.tokenURI(id);
//     return uri;    
// }

// module.exports = async function Symbol(){
//     const sym =await MarketPlaceContract.symbol();
//     return sym;    
// }

// module.exports = async function Name(){
//     const n =await MarketPlaceContract.name();
//     return n;    
// }

// module.exports = async function BalanceOf(address){
//     const bal =await MarketPlaceContract.balanceOf(address);
//     return bal;    
// }


