const Web3 = require('web3');

/*
* connect to ethereum node
*/ 
const ethereumUri = 'http://localhost:8545';

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(ethereumUri));

let ac_abi =[ { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "stocks", "outputs": [ { "name": "stockId", "type": "uint256" }, { "name": "name", "type": "string" }, { "name": "totalRemain", "type": "uint256" }, { "name": "lastRecordId", "type": "uint256" }, { "name": "lastSelledRecordId", "type": "uint256" }, { "name": "price", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balances", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "records", "outputs": [ { "name": "recordId", "type": "uint256" }, { "name": "stockId", "type": "uint256" }, { "name": "timestamp", "type": "uint256" }, { "name": "amount", "type": "uint256" }, { "name": "remain", "type": "uint256" }, { "name": "supplyer", "type": "address" }, { "name": "nextRecordId", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "stockId", "type": "uint256" }, { "name": "amount", "type": "uint256" }, { "name": "index", "type": "uint256" } ], "name": "restock", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "stockAmount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "name", "type": "string" }, { "name": "price", "type": "uint256" } ], "name": "newStock", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_address", "type": "address" }, { "name": "license", "type": "uint256" } ], "name": "setLicese", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "stockId", "type": "uint256" }, { "name": "amount", "type": "uint256" } ], "name": "newRecord", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "recordAmount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "stockId", "type": "uint256" }, { "name": "_amount", "type": "uint256" } ], "name": "sell", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [ { "name": "license", "type": "uint256" }, { "name": "flag", "type": "uint256" } ], "name": "checkLicense", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "licenses", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "recordId", "type": "uint256" }, { "indexed": false, "name": "stockId", "type": "uint256" }, { "indexed": false, "name": "totalRemain", "type": "uint256" } ], "name": "NewRecord", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "stockId", "type": "uint256" }, { "indexed": false, "name": "name", "type": "string" }, { "indexed": false, "name": "price", "type": "uint256" } ], "name": "NewStock", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "stockId", "type": "uint256" }, { "indexed": false, "name": "amount", "type": "uint256" }, { "indexed": false, "name": "index", "type": "uint256" } ], "name": "StockArrival", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "stockId", "type": "uint256" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "StockShortage", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "stockId", "type": "uint256" }, { "indexed": false, "name": "amount", "type": "uint256" }, { "indexed": false, "name": "totalRemain", "type": "uint256" } ], "name": "Selled", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" } ];
let AC = web3.eth.contract(ac_abi)
let ACinstance = AC.at("0xE7D25D35e52AA691a5e94968c16EF60bA0264EAE")

var eNewRecord = ACinstance.NewRecord()
var eNewStock = ACinstance.NewStock()
//var eStcokArrival = ACinstance.StockArrival()
var eStockShortage = ACinstance.StockShortage()
var eSelled = ACinstance.Selled()

const showStock = async function () {
    var stockAmount = await ACinstance.stockAmount.call();
    console.log("==============================================")
    for (i=1; i <= stockAmount; i++){
        var stock = await ACinstance.stocks(i)
        console.log("stock id: " + stock[0].toNumber())
        console.log("name: " + stock[1])
        console.log("price: " + web3.fromWei(stock[5].toNumber(), 'ether'))
        console.log("remain: " + stock[2].toNumber())
        console.log("************************************************")
    }
    console.log("==============================================")
}

eNewRecord.watch( function (error, result) {
    if(!error) {
     showStock();
    }
})