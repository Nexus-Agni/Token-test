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

    it("Should transfer tokens between accounts", async function () {
        const [owner, addr1] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        const hhtoken = await Token.deploy();

        await hhtoken.transfer(addr1.address, 100) 
        const bal1 = await hhtoken.balanceOf(owner.address);
        const bal2 = await hhtoken.balanceOf(addr1.address);

        expect(bal1).to.equal(900);
        expect(bal2).to.equal(100);
    })

})