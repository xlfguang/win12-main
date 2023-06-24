function linkwallet() {
  console.log("linkwallet");
}

function formatString(s, headLen = 5, tailLen = 4, ellipsis = "...") {
  if (s.length <= headLen + tailLen) {
    return s;
  } else {
    return s.slice(0, headLen) + ellipsis + s.slice(-tailLen);
  }
}
// 已经链接了钱包
function linked() {
  let noneLink = document.getElementById("noneLink");
  noneLink.style.display = "none";
  let wallet = document.getElementById("linked");
  // formatString函数中填写钱包地址
  wallet.innerHTML = formatString("xxxxxxxxxxxxxxxxxxx");
}
/**
 * 未链接钱包
 * 每次初始化都会执行noneLink 可以另外写函数来判断是否已经链接钱包 有则执行linked 没有则执行noneLink
 * */
function noneLink() {
  let noneLink = document.getElementById("noneLink");
  noneLink.style.display = "block";
  let wallet = document.getElementById("linked");
  wallet.style.display = "none";
}
noneLink();
