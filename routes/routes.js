import express from "express";
const router = express.Router();

import * as MarketplaceController from './../MarketplaceController/MarketplaceController.js';

router.post('/mint', MarketplaceController.mintController);
router.post('/listNFT',MarketplaceController.listNFTController)
router.get('/getMyNFT', MarketplaceController.getMyNFTController);
router.get('/getListedNFT', MarketplaceController.getListedNFTController);
router.get('/getNFTs',MarketplaceController.getNFTController);
router.get('/getListedPrice',MarketplaceController.getListedPriceController);

console.log("router file")


export default router;