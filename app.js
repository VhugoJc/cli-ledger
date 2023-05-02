#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const { register } = require('./helpers/functions')
const argv = yargs(hideBin(process.argv)).argv

const main = () => {
  if(argv._.includes('register')){
    return register();
  }
  if(argv._.includes('balance')){
    return console.log("Balance");
  }
  if(argv._.includes('print')){
    return console.log("Print");
  }
  
}

main();