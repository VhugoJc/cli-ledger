#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const { register, balance , print} = require('./helpers/files')
const argv = yargs(hideBin(process.argv)).argv

const main = () => {
  if(argv._.includes('register')){
    return register();
  }
  if(argv._.includes('balance')){
    return balance();
  }
  if(argv._.includes('print')){
    return print();
    
  }
  
}

main();