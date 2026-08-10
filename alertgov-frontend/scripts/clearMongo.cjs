const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://rv75749d_db_user:HF5FRKjlhllLYGcF@cluster0.7efvpxm.mongodb.net/?appName=Cluster0&tls=true&tlsAllowInvalidCertificates=true";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('alertgov_media');
    const collection = database.collection('incidents');
    
    const result = await collection.deleteMany({});
    console.log("Deleted " + result.deletedCount + " incidents.");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
