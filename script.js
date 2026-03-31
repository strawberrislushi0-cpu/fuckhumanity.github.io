import { Client, Account, Databases, ID } from "https://cdn.jsdelivr.net/npm/appwrite@13.0.0/+esm";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("freelemonsrom");

const account = new Account(client);
const databases = new Databases(client);

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await account.createEmailSession(email, password);

  document.getElementById("auth").style.display = "none";
  document.getElementById("chat").style.display = "block";
}

async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const user = await account.create(
      ID.unique(),
      email,
      password
    );

    console.log("User created:", user);

    // Automatically log them in
    await account.createEmailSession(email, password);

    // Switch UI
    document.getElementById("auth").style.display = "none";
    document.getElementById("chat").style.display = "block";

  } catch (err) {
    alert("Signup failed: " + err.message);
  }
}

async function sendMessage() {
  const text = document.getElementById("messageInput").value;

  await databases.createDocument(
    "69cbfdfd000805ac7533",
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
    "69cbfdfd000805ac7533",
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
