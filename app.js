#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const main = () => {
  if(argv._.includes('register')){
    console.log("Register");
  }
  if(argv._.includes('balance')){
    console.log("Balance");
  }
  if(argv._.includes('print')){
    console.log("Print");
  }
  
}

main();