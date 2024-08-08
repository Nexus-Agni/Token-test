const { ethers } = require("hardhat")
const {expect} = require("chai")

describe ("Token", function () {
    it("Once deployed onwer should have 1000 tokens", async function () {
        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        const hhtoken = await Token.deploy();

        const ownerBalance = await hhtoken.balanceOf(owner.address);

        expect(await hhtoken.totalSupply()).to.equal(ownerBalance);
    })

    // it("Should transfer tokens between accounts", async function (params) {
    //     const [owner, addr1, addr2] = await ethers.getSigners();
    //     const Token = await ethers.getContractFactory("Token");
    //     const hhtoken = await Token.deploy();

    //     await hhtoken.transfer(addr1.address, 100) 
    //     const bal1 = await hhtoken.balanceOf(owner.address);
    //     const bal2 = await hhtoken.balanceOf(addr1.address);

    //     expect(bal1).to.equal(900);
    //     expect(bal2).to.equal(100);
    // })

    it("Should transfer tokens between accounts", async function () {
        // Initial balances
        const [owner, addr1, addr2] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        const hhtoken = await Token.deploy();
        const initialOwnerBalance = await hhtoken.balanceOf(owner.address);
        const initialAddr1Balance = await hhtoken.balanceOf(addr1.address);

        console.log("Initial owner balance:", initialOwnerBalance.toString());
        console.log("Initial addr1 balance:", initialAddr1Balance.toString());

        await hhtoken.transfer(addr1.address, 100);

        const finalOwnerBalance = await hhtoken.balanceOf(owner.address);
        const finalAddr1Balance = await hhtoken.balanceOf(addr1.address);

        console.log("Final owner balance:", finalOwnerBalance.toString());
        console.log("Final addr1 balance:", finalAddr1Balance.toString());

        expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(100));
        expect(finalAddr1Balance).to.equal(initialAddr1Balance.add(100));
    });
    
})