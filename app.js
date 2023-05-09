#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const { register, balance , print} = require('./helpers/files')
const argv = yargs(hideBin(process.argv)).argv

const main = () => {
  if(argv._.includes('register')||argv._.includes('reg')){
    return register(argv);
  }
  if(argv._.includes('balance')||argv._.includes('bal')){
    return balance(argv);
  }
  if(argv._.includes('print')){
    return print();
    
  }
  
}

main();