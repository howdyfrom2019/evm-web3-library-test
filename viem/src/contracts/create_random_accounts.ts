import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

const {
  english,
  generateMnemonic,
  mnemonicToAccount,
} = require("viem/accounts");
const { createObjectCsvWriter } = require("csv-writer");

interface Account {
  id: number;
  address: string;
  privateKey: string;
}

function createRandomAccounts() {
  const accounts: Account[] = [];

  for (let i = 0; i < 10; i++) {
    const pk = generatePrivateKey();
    const account = privateKeyToAccount(pk);

    accounts.push({
      id: i,
      address: account.address,
      privateKey: pk,
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
      { id: "privateKey", title: "Private Key" },
    ],
  });

  await csvWriter.writeRecords(accounts);

  console.log("Accounts saved to accounts.csv");
};

(async () => {
  const accounts = createRandomAccounts();
  await saveAccountsToCSV(accounts);
})();
