const express = require ('express');
require('dotenv').config();
const creteateNFT = require('./controller/createnft.js')
const getTokenUri = require('./controller/createnft.js')
const controller = require('./controller/createnft.js')
const getAllNFT = require('./controller/createnft.js')
const getMyNFT = require('./controller/createnft.js')
const listNFT = require('./controller/createnft.js')
const getListedNFT = require('./controller/createnft.js')
const app = express();
const ejs = require('ejs');


// app.set('view engine', "ejs");

// app.get('/profile', (req, resp) => {
//     const user = { name: "Sharan" };
//     resp.render('profile', { user }); // Render 'profile.ejs' with the user data
// });

app.get('/', (req, resp)=>{
    resp.send("Hello, Welcome");
}) 

app.post('/mint', async(req, resp)=> {
    const create = await creteateNFT("sandip", "./nft_Image.png");
    resp.status(200).send(create);
})

app.post('/listNFT', async (req, resp) => {
    const list = await listNFT(3, 0.01);
    console.log("🚀 ~ app.post ~ list:", list)
    resp.status(200).send(list);
})

app.get('/getUrl', async(req, resp)=> {
    const get = await getTokenUri(2);
    resp.status(200).send(get);
})

app.get('/getAllNFTs', async (req, res) =>{ 
    const getAll = await getAllNFT();
    res.status(200).send(getAll);
})

app.get('/getMyNFTs', async (req, res)=>{
    const MyNFT = await getMyNFT();
    res.status(200).send(MyNFT);
})


app.get('/getListedNFTs',async (req, resp)=>{
    const listed = await getListedNFT();
    resp.status(200).send(listed);
})




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

