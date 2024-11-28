// 0xcb6C0b6C6EAAB9a35c75Ca33d0eAFcd052119Ef0
import { client } from "./get_receipt";

async function getReceipt() {
  const balance = await client.getBalance({
    address: "0xcb6C0b6C6EAAB9a35c75Ca33d0eAFcd052119Ef0",
  });

  return balance;
}

getReceipt().then((res) => console.log(`balance:`, res));
