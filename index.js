const BonkClient = require("./module/Client.js");
const WebhookLogger = require("./module/services/webhook");
const client = new BonkClient();
const webhook = new WebhookLogger("https://discord.com/api/webhooks/1391440610421899396/16Ji8isCQDBgM5uQxJ916RfTBTv5UHEsEQ_bVA03dgduXM7UC_VXm1TxFrcZjEYev_xj");

process.on("uncaughtException", (err) => {
  console.error("[ERRO GLOBAL]", err.message, err.stack);
});

process.on("unhandledRejection", (err) => {
  console.error("[PROMISE NÃO TRATADA]", err.message, err.stack);
});

client.on("ready", async (bot) => {
  console.log("Bot está pronto!");
  client.addAdminAccount("Error_504");
  client.addAdminAccount("Eyafrin");
  client.addAdminAccount("cappozin");
  client.addAdminAccount("xnef");
  client.addAdminAccount("decredox");

  const roomByURL = await bot.setAdressByUrl("https://bonk.io/712776");
  await bot.connect(roomByURL);
});

client.on("bonk_chat_message", async (ctx) => {
  console.log(`${ctx.author}: ${ctx.message}`);
  if (ctx.message.toLowerCase() === "!ola") {
    await ctx.sendMessage(`Olá, ${ctx.author}!`);
  }
});

client.on("bonk_user_join", async (ctx) => {
  const userJoined = ctx.userJoined;
  await ctx.sendMessage(`${userJoined.userName} entrou na sala! [LEVEL: ${userJoined.level}]`);
  await webhook.send(`📥 ${userJoined.userName} entrou na sala! [LEVEL: ${userJoined.level}]`);
});

client.login({
  config: {
    LOG_LEVELS: "INFO",
  },
  username: "RoomManager",
  password: "mR#84vX2!qLp@Zu9Wd",
  avatar: {
    layers: [
      {
        id: 13,
        scale: 0.05999999865889549,
        angle: 0,
        x: 5.142857074737549,
        y: 4.857142925262451,
        flipX: false,
        flipY: false,
        color: 13558016,
      },
      {
        id: 13,
        scale: 0.05999999865889549,
        angle: 0,
        x: 0.2857142984867096,
        y: 4.5714287757873535,
        flipX: false,
        flipY: false,
        color: 13558016,
      },
      {
        id: 67,
        scale: 0.49000000953674316,
        angle: -7,
        x: 0.8569999933242798,
        y: 35.143001556396484,
        flipX: true,
        flipY: false,
        color: 16712725,
      },
      {
        id: 67,
        scale: 0.49000000953674316,
        angle: 7,
        x: 0.8571428656578064,
        y: 34.14285659790039,
        flipX: false,
        flipY: false,
        color: 16712724,
      },
      {
        id: 13,
        scale: 0.05999999865889549,
        angle: 0,
        x: -5.714285850524902,
        y: 5.857142925262451,
        flipX: false,
        flipY: false,
        color: 13689088,
      },
      {
        id: 13,
        scale: 0.07000000029802322,
        angle: 0,
        x: 2,
        y: -0.1428571492433548,
        flipX: false,
        flipY: false,
        color: 1761792,
      },
      {
        id: 13,
        scale: 0.07000000029802322,
        angle: 0,
        x: -2.5714285373687744,
        y: -1.8571428060531616,
        flipX: false,
        flipY: false,
        color: 1761792,
      },
      {
        id: 13,
        scale: 0.0949999988079071,
        angle: 0,
        x: 0,
        y: -6.857142925262451,
        flipX: false,
        flipY: false,
        color: 235263,
      },
      {
        id: 28,
        scale: 0.20000000298023224,
        angle: 0,
        x: 0,
        y: 8.600000381469727,
        flipX: true,
        flipY: false,
        color: 327746,
      },
      {
        id: 28,
        scale: 0.20000000298023224,
        angle: 0,
        x: -6.300000190734863,
        y: 8.600000381469727,
        flipX: false,
        flipY: false,
        color: 327746,
      },
      {
        id: 28,
        scale: 0.20000000298023224,
        angle: 0,
        x: 2.700000047683716,
        y: 1.7000000476837158,
        flipX: false,
        flipY: false,
        color: 327746,
      },
      {
        id: 28,
        scale: 0.20000000298023224,
        angle: 0,
        x: 6.199999809265137,
        y: 8.600000381469727,
        flipX: false,
        flipY: false,
        color: 327746,
      },
      {
        id: 28,
        scale: 0.20000000298023224,
        angle: 0,
        x: -2.5999999046325684,
        y: 1.7000000476837158,
        flipX: false,
        flipY: false,
        color: 327746,
      },
      {
        id: 28,
        scale: 0.20000000298023224,
        angle: 0,
        x: 0,
        y: -4,
        flipX: false,
        flipY: false,
        color: 327746,
      },
      {
        id: 80,
        scale: 0.0689999982714653,
        angle: 0,
        x: 0,
        y: -7.5,
        flipX: false,
        flipY: false,
        color: 16765704,
      },
      {
        id: 80,
        scale: 0.3799999952316284,
        angle: 0,
        x: 0,
        y: 8.114285469055176,
        flipX: false,
        flipY: false,
        color: 16383966,
      }
    ],
    bc: 327746
  },
});
