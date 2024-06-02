import getConnect from '../networkConfig/connection.js'


async function getNFT(){
    const getNFTS = await getConnect.getAllNFTs();
    // console.log("🚀 ~ getNFT ~ getNFT:", getNFTS)
    return getNFTS.toString();
}

async function getMyNFT(){
    const getNFT = await getConnect.getMyNFTs();
    return getNFT.toString();
}

async function getListedNFT(){
try {
        const listedNFT = await getConnect.getListedNFTs();
        return listedNFT;
    
} catch (error) {
    return error;
}}

async function getListedPrice(){
    const price = await getConnect.getListPrice();
    return price;
}

export {
    getNFT,
    getMyNFT,
    getListedNFT,
    getListedPrice
};

