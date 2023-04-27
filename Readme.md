# CLI-ledger using Inquirer

This is a command line interface (CLI) tool built using Node.js that allows users to keep track of their expenses and income using a ledger. The tool is designed to be simple and easy to use, with a user-friendly interface provided by the Inquirer dependency.

## Installation

To use this tool, you must have Node.js installed on your system. You can then install the required dependencies by running the following command in your terminal:

```
npm install
```

## Usage

To use the tool, navigate to the project directory in your terminal and run the following command:


```
npm start
```

This will start the CLI interface, and you will be prompted to enter various details about your expenses and income. The tool will then add these transactions to the ledger and display a summary of your current balance.

## Features

The CLI-ledger tool includes the following features:

### Add new transactions

You can add new transactions to the ledger by selecting the "Add transaction" option from the main menu. You will be prompted to enter the transaction amount, category, and date.

### View summary

You can view a summary of your current balance by selecting the "View balance" option from the main menu. The tool will display your current balance, as well as the total income and expenses for the current month.

### View detailed report

You can view a detailed report of all your transactions by selecting the "View report" option from the main menu. The tool will display a table with all the transactions in the ledger, sorted by date.

### Search transactions

You can search for transactions by date or category by selecting the "Search transactions" option from the main menu. You will be prompted to enter the search criteria, and the tool will display all transactions that match your search.

### Delete transactions

You can delete transactions by selecting the "Delete transaction" option from the main menu. You will be prompted to enter the transaction ID of the transaction you want to delete, and the tool will remove it from the ledger.

## Dependencies

This project relies on the following dependencies:

- Inquirer: provides the user interface for the CLI tool.
- Moment.js: used for formatting and manipulating dates in the ledger.
- Chalk: used for adding color to the CLI output.

## Contributing

If you would like to contribute to this project, feel free to submit a pull request or open an issue on GitHub.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
