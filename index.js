const express = require('express');
const { ethers } = require('ethers');
const path = require('path');


const app = express(); // Correct way to create an Express app

const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));

app.get("/",(req,res)=>{
    res.send('Hello World');
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
