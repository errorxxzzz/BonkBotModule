const API = require("./utils/bonkApi.js");
const EventEmitter = require("events");

// Funçao para validar se tem token!
function v(f) {
  return async function(...args) {
    if (!this.token) {
      console.warn("Token ausente. Operação abortada.");
      return;
    }
    return await f.apply(this, args);
  }
}

class bonkClient extends EventEmitter {
  constructor() {
    super();
    this.API = API;
    this.token = null;
    this.username = null;
    this.servers = [];
  }

  async login(client) {
    try {
      const res = await this.API.login(client.username, client.password);
      this.token = res.token;
      this.username = client.username;
      console.log("Usuário Encontrado");
      this.emit("ready", {
        setAdressByUrl: this.setAdressByUrl.bind(this),
        setAdressByName: this.setAdressByName.bind(this),
      });
    } catch (error) {
      console.error("Senha ou Usuário incorreto!");
      throw error;
    }
  }

  async setAdressByUrl(roomLink) {
    try {
      const regex = /(?:https?:\/\/)?bonk\.io\/([a-zA-Z0-9]{6,})|\b([a-zA-Z0-9]{6,})\b/;
      const match = roomLink.match(regex);
      const code = match ? match[1] || match[2] : null;

      if (!code) {
        throw new Error("Código inválido!");
      }

      const server = await this.API.getDataFromLink(code);

      if (server.status !== 200) {
        throw new Error("Sala não encontrada!");
      }

      this.servers.push(server);
    } catch (e) {
      console.error("Erro ao definir o endereço da sala:", e.message);
    }
  }

  async setAdressByName(roomName) {
    try {
      let rooms = await this.API.getAllRooms(this.token);
      if (rooms.status !== 200){
        throw new Error("Erro ao utilizar Api do bonk!")
      }
    const matches = rooms.rooms.filter(rn => rn.roomname.toLowerCase() === roomname.toLowerCase());
if (matches.length === 0) {
  throw new Error("Nenhuma sala encontrada com esse nome.");
}
if (matches.length > 1) {
  console.warn(`Existem ${selectedRoom.length} salas com o nome "${roomname}". Escolhendo a primeira.`);
}
            
      
    const selectedRoom = matches[0];

    const server = this.API.getRoomInfo(selectedRoom.id);
     if (server.status !== 200) {
        throw new Error("Erro na API do bonk, Sala nao encontrada!");
      }
      console.log("Sala encontrada com sucesso!")
this.servers.push(server);
    } catch (e) {
      console.error("Erro ao definir o endereço da sala:", e.message);
    }
  }
}

// validaçao:
bonkClient.prototype.setAdressByUrl = v(bonkClient.prototype.setAdressByUrl);
bonkClient.prototype.setAdressByName = v(bonkClient.prototype.setAdressByName);

module.exports = bonkClient;
