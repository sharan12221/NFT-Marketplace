// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNftMarketPlace is ERC721URIStorage{

    address payable owner;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    Counters.Counter private _listedNftCount;
    
    uint listPrice = 0.01 ether;

    constructor ()ERC721("MyNftMarketPlace", "xWings"){
        owner = payable(msg.sender);
    }

    struct Tokens {
        uint tokenId;
        address payable owner;
        address payable seller;
        uint price;
        bool currentlyListed;
    }

    event TokenCreatedSuccess (
            uint256 indexed tokenId,
            address owner,
            address seller,
            bool currentlyListed
        );

    event TokenListedSuccess (
            uint256 indexed tokenId,
            address owner,
            address seller,
            uint256 price,
            bool currentlyListed
        );

    mapping(uint => Tokens) private idToToken;
    uint[] public listedTokens;
    // mapping(uint => uint) private ListedToken;

    function updateListPrice(uint _listPrice)public payable {
        require (owner == msg.sender,"Only owner can Update the listing price");
        listPrice = _listPrice; 
    }

    function getListPrice()public view returns(uint){
        return listPrice;
    }

    function getTokenForId(uint256 tokenId) public view returns (Tokens memory) {
        return idToToken[tokenId];
    }

    function getCurrentToken() public view returns (uint256) {
        return _tokenIds.current();
    }


    function createToken(string memory tokenURI)public payable returns(uint){
        _tokenIds.increment();
        uint newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);  

        _setTokenURI(newTokenId, tokenURI);

        idToToken[newTokenId] = Tokens(
            newTokenId,
            payable(address(this)),
            payable(msg.sender),
            0,
            false
        );

        emit TokenCreatedSuccess (
            newTokenId,
            address(this),
            msg.sender,
            false
        );

        return newTokenId;
    }

    function ListToken(uint256 tokenId, uint256 price) public payable  {
        //Make sure the sender sent enough ETH to pay for listing
        // console.log(idToToken[tokenId].seller);
        require(msg.value == listPrice, "Hopefully sending the correct price");
        require(tokenId <= _tokenIds.current(), "Token Not Minted");
        require(idToToken[tokenId].seller == msg.sender, "only token Owner can List the token");
        require(idToToken[tokenId].currentlyListed == false, "NFT is Already Listed");
        //Just sanity check
        require(price > 0, "Make sure the price isn't negative");

        _listedNftCount.increment();
        idToToken[tokenId].currentlyListed = true;
        listedTokens.push(tokenId);
        _transfer(msg.sender, address(this), tokenId);

        //Emit the event for successful transfer. The frontend parses this message and updates the end user
        emit TokenListedSuccess(
            tokenId,
            address(this),
            msg.sender,
            price,
            true
        );
    }

    function getAllNFTs() public view returns (Tokens[] memory) {
        uint nftCount = _tokenIds.current();
        Tokens[] memory tokens = new Tokens[](nftCount);
        uint currentIndex = 0;
        uint currentId;

        for(uint i=0;i<nftCount;i++)
        {
            currentId = i + 1;
            Tokens storage currentItem = idToToken[currentId];
            tokens[currentIndex] = currentItem;
            currentIndex += 1;
        }
        //the array 'tokens' has the list of all NFTs in the marketplace
        return tokens;
    }

    function getListedNFTs()public view returns(Tokens[] memory){
        uint nftCount = listedTokens.length;
        Tokens[] memory tokens = new Tokens[](nftCount);
        uint currentIndex = 0;
        uint currentId;

        for(uint i=0;i<nftCount;i++)
        {
            currentId = i + 1;
            Tokens storage currentItem = idToToken[currentId];
            tokens[currentIndex] = currentItem;
            currentIndex += 1;
        }
        //the array 'tokens' has the list of all NFTs in the marketplace
        return tokens;
    }

    function getMyNFTs()public view returns (Tokens[] memory){
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        uint currentId;
        //Important to get a count of all the NFTs that belong to the user before we can make an array for them
        for(uint i=0; i < totalItemCount; i++)
        {
            if(idToToken[i+1].owner == msg.sender || idToToken[i+1].seller == msg.sender){
                itemCount += 1;
            }
        }

        //Once you have the count of relevant NFTs, create an array then store all the NFTs in it
        Tokens[] memory items = new Tokens[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
            if(idToToken[i+1].owner == msg.sender || idToToken[i+1].seller == msg.sender) {
                currentId = i+1;
                Tokens storage currentItem = idToToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }


    function executeSale(uint256 tokenId) public payable {
        uint price = idToToken[tokenId].price;
        address seller = idToToken[tokenId].seller;
        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        //update the details of the token
        idToToken[tokenId].currentlyListed = true;
        idToToken[tokenId].seller = payable(msg.sender);
        _itemsSold.increment();
        
        ///after executing sale the saatus of listedt nft got false
        idToToken[tokenId].currentlyListed = false;
        //Actually transfer the token to the new owner
        _transfer(address(this), msg.sender, tokenId);
        //approve the marketplace to sell NFTs on your behalf
        approve(address(this), tokenId);

        //Transfer the listing fee to the marketplace creator
        payable(owner).transfer(listPrice);
        //Transfer the proceeds from the sale to the seller of the NFT
        payable(seller).transfer(msg.value);
    }

}