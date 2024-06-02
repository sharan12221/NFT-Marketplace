import {getNFT, getMyNFT, getListedNFT, getListedPrice} from "../utils/getFunctions.js";
import mintNFT from "./../utils/mintNFT.js";
import ListNFT from "./../utils/listNFT.js"

console.log("getNFTController file")

export const getNFTController = async(req, res)=>{
    try {
        const nft =await getNFT();
        res.send({ status: "success", message: nft });
    }catch(e){
        res.status(500).send(e);
    }
}

export const mintController = async(req, res)=>{
    const nftName = req.body;
    const name = nftName.nftName
    try{
        const mint = await mintNFT(name);
        res.send({ status: "success", message: mint.hash });
    }catch(e){
        res.status(500).send(e);
    }
}

export const getMyNFTController = async(req, res)=>{
    try{
        const getToken = await getMyNFT();
        res.send({status:"success", message:getToken});
    }catch(e){
        res.send(e)
    }
}


export const listNFTController = async(req, res)=>{
    const {tokenID, Price} = req.body;
    try{
        const list = await ListNFT(tokenID, Price);
        res.send({status:"success", message:list});
    }catch(e){
        res.send(e);
    }
}


export const getListedPriceController= async(req,res)=>{
    try{
        const price = await getListedPrice();
        res.send({status:"success", message:price})
    }catch(e){
        console.log("🚀 ~ getListedPriceController ~ e:", e)
    }
}

export const getListedNFTController= async(req,res)=>{
    try{
        const listed = await getListedNFT();
        res.send({status:"success", message:listed});
    }catch(e){
        res.send(e);
    }
}