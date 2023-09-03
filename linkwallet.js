var web3je = "./js/web3.min.js";
document.write(
  "<scr" + 'ipt type="text/javascript" src="' + web3je + '"></scr' + "ipt>"
);
var etherje = "./js/ether.js";
document.write(
  "<scr" + 'ipt type="text/javascript" src="' + etherje + '"></scr' + "ipt>"
);

// import MerkleTree from "merkletreejs";
// console.log(MerkleTree);
// console.log("?????");

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

async function claimairdrop() {

  if (!walletWithProvider) {
    alert("No wallet connected！");
    return;
  }
  var abi = [
    {
      "inputs": [],
      "name": "idoHandle",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "setMaxAmount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "adrs",
          "type": "address[]"
        },
        {
          "internalType": "bool",
          "name": "bools",
          "type": "bool"
        }
      ],
      "name": "setWhiteList",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "adminAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "devAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "idoEtherAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isBuy",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "maxAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nftAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "whiteList",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  const contracts = new ethers.Contract(
    "0x1633EbD6da8AA21e624921E0e52d5D8d4dD8e60C",
    abi,
    walletWithProvider
  );
  try {
    const tx = await contracts.idoHandle( {
      value: ethers.utils.parseUnits("0.05", "ether"),
    });
    await tx.wait();
  } catch (error) {
    alert("mint error");
  }

}
// window.onload= function(){
//   console.log("sssss");
//   return
// }



$(window).on('load', async function() {
 const currentProvider = new Web3.providers.HttpProvider(
    "https://eth.llamarpc.com"
  );
  const web3Provider = new ethers.providers.Web3Provider(currentProvider);
  var abi = [
    {
      "inputs": [],
      "name": "idoHandle",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "setMaxAmount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "adrs",
          "type": "address[]"
        },
        {
          "internalType": "bool",
          "name": "bools",
          "type": "bool"
        }
      ],
      "name": "setWhiteList",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "adminAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "devAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "idoEtherAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isBuy",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "maxAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nftAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "whiteList",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  const contracts = new ethers.Contract(
    "0x1633EbD6da8AA21e624921E0e52d5D8d4dD8e60C",
    abi,
    web3Provider
  );
    try {
      var amount = await contracts.totalAmount();
    
     // amount = ethers.utils.parseUnits("1", "ether");
    //  console.log(amount.toString(),"ssss");
    } catch (error) {
     // alert(error);
    }
   
    var newAmount = (
      amount.div(ethers.utils.parseUnits("0.00001", "ether")).toNumber() /
      100000
    ).toFixed(5);
    // var newAmount = 0;
    const seli = (newAmount * 100) / 5;
    console.log(22211);
    setpercentage(seli.toFixed(5));
});

$("#clicklinkwallet").click(function () {
  linkwallet();
});

$("#doubleclicklinkwallet").dblclick(function () {
  linkwallet();
});
$("#Claim").click(function () {
  claimairdrop();
});
