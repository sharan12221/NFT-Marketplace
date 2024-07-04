import ethers from "ethers";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const __dirname = path.resolve();


// const pvtKey = process.env.privateKey;
const pvtKey = /* Private key */
// const contractAddress = process.env.contractAddress
const contractAddress = "0x16d20950C681F5b59Ae2B3884e293EeEcb8167B7"
// const httpUrl = process.env.infuraPolygonApi // (for amoy polygon)
const httpUrl = "https://polygon-amoy.infura.io/v3/c75019ae2766435ab5789c25eb1b3906"


function getConnect(){
    let abiPath = path.join(__dirname,'./abi.json');
    const abi = JSON.parse(fs.readFileSync(abiPath));
    const provider = new ethers.providers.JsonRpcProvider(httpUrl);
    const signer = new ethers.Wallet(pvtKey, provider)
    const MarketPlaceContract = new ethers.Contract(contractAddress, abi, signer);
    
    return MarketPlaceContract;
}



export default getConnect();

