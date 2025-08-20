const { MongoClient } = require('mongodb');
require('dotenv').config();

async function main() {
  const client = new MongoClient(process.env.DATABASE_URL);
  try {
    await client.connect();
    console.log("✅ Conectado ao MongoDB!");
  } catch (e) {
    console.log("❌ Erro:", e);
  } finally {
    await client.close();
  }
}

main();
