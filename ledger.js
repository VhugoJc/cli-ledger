#!/usr/bin/env node

// Import required modules
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const { register, balance , print} = require('./helpers/inputs')

// Parse command-line arguments using yargs
const argv = yargs(hideBin(process.argv)).argv

// Define the main function
const main = () => {

    // Check if the command is 'register' or 'reg'
  if(argv._.includes('register')||argv._.includes('reg')){
    return register(argv);
  }

  // Check if the command is 'balance' or 'bal'
  if(argv._.includes('balance')||argv._.includes('bal')){
    return balance(argv);
  }
  // Check if the command is 'print'
  if(argv._.includes('print')){
    return print(argv);
    
  }
  
}
// Call the main function
main();