const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiOTZmMzVmZC01NGM4LTQyMTUtOGU2ZS1iYjBhOWIyYjIxY2EiLCJlbWFpbCI6InNoYXJhbndha2FkZTEyMzRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImM3ZjQwZmRmN2JhMTM4MmI4ZWUyIiwic2NvcGVkS2V5U2VjcmV0IjoiYzljMDY3MTFhNTRkZWJiZjE1OGU4YmRiMjY1ZDYyYzFlYjk3MjhhZWZiMDA1OTY2MjlmNmFmODVlZTM3ODNhNCIsImlhdCI6MTcxMzk2NjczNX0.7t77j48Ml90qyscZOYswK_S713u-B0RIXHFg5HozcQo";

async function main(nftName) {
  try {
    const formData = new FormData();

    const file = fs.createReadStream("./img/nft_Image.png");
    formData.append("file", file);

    const pinataMetadata = JSON.stringify({
      name: nftName,
    });
    formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 1,
    });
    formData.append("pinataOptions", pinataOptions);

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    console.log("IPFS Hash: ",res.data.IpfsHash);
  } catch (error) {
    console.log("Error: ",error);
  }
}


main("Monalisa");
