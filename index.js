

const BonkClient = require("./module/Client.js");

const client = new BonkClient();

client.on("ready", async ({ setAdressByUrl, setAdressByName }) => {
  console.log("Cliente autenticado com sucesso.");
    let room = await setAdressByUrl("https://bonk.io/573688"); 
  console.log(room);
});

// Iniciar login
client.login({
  username: "RoomManager",
  password: "mR#84vX2!qLp@Zu9Wd"
});
