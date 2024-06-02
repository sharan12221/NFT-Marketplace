import uploadToIPFS from "./../MarketplaceController/ipfsController.js"
import getConnect from './../networkConfig/connection.js'
import path from 'path';

const __dirname = path.resolve();
const imagePath = path.join(__dirname,'MarketplaceController','./ss.jpg')


async function mintNFT(nftName){
    console.log("Started minting")
    try {
        const create =await getConnect.createToken(uploadToIPFS(nftName, imagePath));
        console.log("tx hash:",create.hash)
        return create;
    } catch (error) {
        console.log(error)
    }
}

export default mintNFT;

