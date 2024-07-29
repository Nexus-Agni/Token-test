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
})