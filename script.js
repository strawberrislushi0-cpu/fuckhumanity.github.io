import { Client, Account, Databases, ID } from "https://cdn.jsdelivr.net/npm/appwrite@13.0.0/+esm";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("YOUR_PROJECT_ID");

const account = new Account(client);
const databases = new Databases(client);

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await account.createEmailSession(email, password);

  document.getElementById("auth").style.display = "none";
  document.getElementById("chat").style.display = "block";
}

async function sendMessage() {
  const text = document.getElementById("messageInput").value;

  await databases.createDocument(
    "DB_ID",
    "messages",
    ID.unique(),
    {
      text: text,
      senderId: "TEMP_USER",
      pairId: "TEMP_PAIR"
    }
  );

  loadMessages();
}

async function loadMessages() {
  const res = await databases.listDocuments(
    "DB_ID",
    "messages"
  );

  const container = document.getElementById("messages");
  container.innerHTML = "";

  res.documents.forEach(msg => {
    const div = document.createElement("div");
    div.textContent = msg.text;
    container.appendChild(div);
  });
}
