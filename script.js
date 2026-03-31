import { Client, Account, Databases, ID } from "https://cdn.jsdelivr.net/npm/appwrite@13.0.0/+esm";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("YOUR_PROJECT_ID");

const account = new Account(client);
const databases = new Databases(client);
