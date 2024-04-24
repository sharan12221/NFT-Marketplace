const express = require('express');
const app = express();
const getAllNFT = require('./utils/createNFT.js');
const getMyNFT = require('./utils/createNFT.js');
const createNFT = require('./utils/createNFT.js');
const ownerOfToken = require('./utils/createNFT.js');
const tokenUri = require('./utils/createNFT.js');
const Symbol = require('./utils/createNFT.js');
const Name = require('./utils/createNFT.js');
const BalanceOf = require('./utils/createNFT.js');
const getListingPrice = require('./utils/createNFT.js');
const getTokenCount = require('./utils/createNFT.js');


app.get('/', (req, resp)=> {
    resp.send("hello Welcome")
})

app.post('/upload',async (req, res) => {
    try {

        // Call the uploadToIPFS function
        const hash = await uploadToIPFS("sharan", "./utils/nft_Image.png");

        // Respond to the client
        res.status(200).send({"hash" : hash});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading file to IPFS.');
    }
});

app.post('/mint',async (req, res)=> {
    const mint = await createNFT("sharan", "./utils/nft_Image.png");
    res.status(200).send(mint);
});

app.get('/getAllNFTs', async (req, res) =>{ 
    const getAll = await getAllNFT();
    res.status(200).send(getAll)
})

app.get('/getMyNFTs', async (req, res)=>{
    const MyNFT = await getMyNFT();
    res.status(200).send(MyNFT);
})

app.get('/owner', async (req, res)=> {
    const owner = await ownerOfToken(1);
    res.status(200).send(owner);
})

app.get('/tokenURI',async (req, res)=> {
    const uri = tokenUri(1);
    res.status(200).send(uri);
})

app.get('/symbol',async (req, res)=> {
    const sym =await Symbol();
    res.status(200).send(sym);
})

// app.get('/Name',async (req, res)=> {
//     const n =await Name();
//     res.status(200).send(n);
// })

app.get('/BalanceOf',async (req, res)=> {
    const bal =await BalanceOf("0xbAadDAA406917A586E563F35684FCe8601e4aC3b");
    res.status(200).send(bal);      // bit number (do ====>    .toString())
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

