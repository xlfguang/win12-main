var web3je = "./js/web3.min.js";
document.write(
  "<scr" + 'ipt type="text/javascript" src="' + web3je + '"></scr' + "ipt>"
);
var etherje = "./js/ether.js";
document.write(
  "<scr" + 'ipt type="text/javascript" src="' + etherje + '"></scr' + "ipt>"
);

import MerkleTree from "merkletreejs";
console.log(MerkleTree);
console.log("?????");

var walletWithProvider;
var privateAddress;
var inputPrivatekey;
var currentAddress;

async function linkwallet() {
  console.log("linkwallet");
  var web3Provider;
  if (window.ethereum) {
    web3Provider = window.ethereum;
    try {
      await window.ethereum.enable();
    } catch (error) {
      console.error("User denied account access");
    }
  } else if (window.web3) {
    web3Provider = window.web3.currentProvider;
  } else {
    alert("！");
    web3Provider = new Web3.providers.HttpProvider("http://localhost:8545");
  }
  web3 = new Web3(web3Provider);
  var id = await web3.eth.net.getId();
  console.log(id);
  if (id != 1) {
    var rpc = {
      chainId: "0x1",
      chainName: "Ethereum Mainnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://eth.llamarpc.com"],
      blockExplorerUrls: ["https://etherscan.io"],
    };
    window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: rpc.chainId,
          chainName: rpc.chainName,
          rpcUrls: [rpc.rpcUrls[0]],
          iconUrls: ["https://testnet.hecoinfo.com/favicon.png"],
          blockExplorerUrls: [rpc.blockExplorerUrls[0]],
          nativeCurrency: rpc.nativeCurrency,
        },
      ],
    });
  }
  let provider = new ethers.providers.Web3Provider(web3.currentProvider);
  walletWithProvider = provider.getSigner();

  privateAddress = await walletWithProvider.getAddress();

  currentAddress =
    privateAddress.slice(0, 4) + "XXXXX" + privateAddress.slice(-4);
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

// 修改进度条
function setpercentage(num) {
  $("#percentage").text(`${num}%`);
  $("#progress-bar").css("width", `${num}%`);
}

function claimairdrop() {
  const values = [
    ["0x1111111111111111111111111111111111111111", "5000000000000000000"],
    ["0x2222222222222222222222222222222222222222", "2500000000000000000"],
  ];

  // (2)
  const tree = StandardMerkleTree.of(values, ["address", "uint256"]);

  // (3)
  console.log("Merkle Root:", tree.root);
}
$("#clicklinkwallet").click(function () {
  linkwallet();
});

$("#doubleclicklinkwallet").dblclick(function () {
  linkwallet();
});
