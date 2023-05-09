# CLI Ledger

CLI Ledger is a command-line interface (CLI) application built with Node.js that allows you to keep track of your personal expenses. You can view your balance, generate reports, and sort transactions by date.

## Installation

Node **v18.16.0**
To use CLI Ledger, you must have Node.js installed on your computer. Once you have installed Node.js, follow these steps:

1. Clone this repository:

```
git clone https://github.com/VhugoJc/cli-ledger.git
```

2. Install the dependencies:
```
cd cli-ledger
npm install
```

## Usage

To start using CLI Ledger, open your terminal and navigate to the cli-ledger directory. From there, you can run the following commands:

- `npm start balance [file]`: displays your current balance
- `npm start register [file] [--sort=d]`: displays a register of all transactions, sorted by date or amount
- `npm start print [file]`: generates a report of your transactions
- `npm start --help`: displays help information

The [file] argument is optional and specifies the file where the transactions will be stored. If no file is specified, CLI Ledger will use the default file ledger.json.

The `balance` command displays your current balance. If a file is specified, the command will display the balance of that file.

The `register` command displays a register of all transactions. If a file is specified, the command will display the transactions of that file. The --sort flag can be used to sort the transactions by date or amount.

The `print` command generates a report of your transactions. If a file is specified, the report will be generated for that file.

## Libraries
CLI Ledger uses the following Node.js libraries:

- `yargs`: A library that makes it easy to parse command-line arguments.
- `colors`: A library that adds color to the terminal output.
## Contributing

If you find a bug or want to suggest a new feature, please open an issue on GitHub. Pull requests are also welcome.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
