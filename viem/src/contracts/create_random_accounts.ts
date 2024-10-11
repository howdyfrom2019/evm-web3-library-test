const {
  english,
  generateMnemonic,
  mnemonicToAccount,
} = require("viem/accounts");
const { createObjectCsvWriter } = require("csv-writer");

interface Account {
  id: number;
  address: string;
  mnemonic: string;
}

function createRandomAccounts() {
  const accounts: Account[] = [];

  for (let i = 0; i < 10; i++) {
    const mnemonic = generateMnemonic(english);
    const account = mnemonicToAccount(mnemonic);

    accounts.push({
      id: i,
      address: account.address,
      mnemonic: mnemonic,
    });
  }

  return accounts;
}

const saveAccountsToCSV = async (accounts: Account[]) => {
  const csvWriter = createObjectCsvWriter({
    path: "accounts.csv",
    header: [
      { id: "id", title: "Index" },
      { id: "address", title: "Address" },
      { id: "mnemonic", title: "Mnemonic" },
    ],
  });

  await csvWriter.writeRecords(accounts);

  console.log("Accounts saved to accounts.csv");
};

(async () => {
  const accounts = createRandomAccounts();
  await saveAccountsToCSV(accounts);
})();
