
document.addEventListener('DOMContentLoaded', async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    document.getElementById('connectWalletBtn').addEventListener('click', async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await provider.listAccounts();
            const address = accounts[0];
            document.getElementById('walletStatus').innerText = `Connected: ${address}`;
            // You can perform further actions here with the connected wallet
        } catch (error) {
            console.error('Error connecting to wallet:', error);
            document.getElementById('walletStatus').innerText = 'Error connecting to wallet';
        }
    });
});

