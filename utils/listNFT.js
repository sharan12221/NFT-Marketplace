import getConnect from './../networkConfig/connection.js'

async function ListNFT(tokenID, Price){
    try {
        const list =await getConnect.ListToken(tokenID, Price,{
            gasLimit:200000
        });
        console.log("tx hash:",list.hash)
        return list;
    } catch (error) {
        console.log(error)
    }
}

export default ListNFT;