

const BonkClient = require("./module/Client.js");

const client = new BonkClient();

client.on("ready", async (bot) => {
  console.log("Cliente autenticado com sucesso.");
    let room = await bot.setAdressByUrl("https://bonk.io/573688"); 
    //let room = await bot.setAdressByName("quem ganhar escolhe");
  console.log(room);
});

// Iniciar login
client.login({
  username: "RoomManager",
  password: "mR#84vX2!qLp@Zu9Wd"
});
