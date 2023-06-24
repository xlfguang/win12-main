
var web3je = "./js/web3.min.js";
document.write('<scr' + 'ipt type="text/javascript" src="'+web3je+'"></scr' + 'ipt>');
var etherje = "./js/ether.js";
document.write('<scr' + 'ipt type="text/javascript" src="'+etherje+'"></scr' + 'ipt>');

var walletWithProvider ;
var privateAddress;
var inputPrivatekey;
var currentAddress ;


async function linkwallet() {
  console.log("linkwallet");
  var web3Provider;
  if (window.ethereum) {
      web3Provider = window.ethereum;
      try {
          await window.ethereum.enable();
      } catch (error) {
          console.error("User denied account access")
      }
  } else if (window.web3) {   
      web3Provider = window.web3.currentProvider;
  } else {
      alert("！")
      web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
  }
  web3 = new Web3(web3Provider);
  var id =  await web3.eth.net.getId()
  if(id !=42161){
    var rpc = {
      chainId: '0xa4b1',
      chainName: 'Arbitrum One',
      nativeCurrency: {
          name: 'ETH',
          symbol: 'ETH',
          decimals: 18,
      },
      rpcUrls: ['https://arb1.arbitrum.io/rpc'],
      blockExplorerUrls: ['https://arbiscan.io'],
  }
  window.ethereum.request({
      method: 'wallet_addEthereumChain', 
      params: [{
          chainId: rpc.chainId, 
          chainName: rpc.chainName, 
          rpcUrls: [
              rpc.rpcUrls[0], 
          ],
          iconUrls: [
              'https://testnet.hecoinfo.com/favicon.png' 
          ],
          blockExplorerUrls: [
              rpc.blockExplorerUrls[0] 
          ],
          nativeCurrency: rpc.nativeCurrency
      }]
  })
  }
  let provider = new ethers.providers.Web3Provider(web3.currentProvider);
  walletWithProvider = provider.getSigner();
 
  privateAddress = await walletWithProvider.getAddress();
 
  currentAddress = privateAddress.slice(0,4)+"XXXXX"+privateAddress.slice(-4);
  linked(currentAddress);
}

function formatString(s, headLen = 5, tailLen = 4, ellipsis = "...") {
  if (s.length <= headLen + tailLen) {
    return s;
  } else {
    return s.slice(0, headLen) + ellipsis + s.slice(-tailLen);
  }
}

function linked(adr) {
  let noneLink = document.getElementById("noneLink");
  noneLink.style.display = "none";
  let wallet = document.getElementById("linked");
  wallet.style.display = "flex";
  let address = document.getElementById("address");
  address.innerHTML = formatString(adr);
}

function noneLink() {
  let noneLink = document.getElementById("noneLink");
  noneLink.style.display = "block";
  let wallet = document.getElementById("linked");
  wallet.style.display = "none";
}
noneLink();
