
const SHA256= require('crypto-js/sha256')
class Block{
    constructor(index,timestamp,data,previousHash=''){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
    }
    
    calculateHash(){
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)).toString();
    }
}

class Blockchain
{
    constructor(){
        this.chain=[this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2017", "Genesis Block","0")
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.previousHash= this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let Tuhincoin= new Blockchain();
Tuhincoin.addBlock(new Block(1,"16/12/2022",{amount:10}));
Tuhincoin.addBlock(new Block(2,"16/12/2022",{amount:20}));
Tuhincoin.addBlock(new Block(3,"16/12/2022",{amount:500}));


console.log(JSON.stringify(Tuhincoin,null,4));