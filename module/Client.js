const API = require("./utils/bonkApi.js");
const EventEmitter = require("events");

class bonkClient extends EventEmitter {
  constructor() {
    super();
    this.API = API;
    this.token = null;
    this.username = null;
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
      console.log("Senha ou Usuario incorreto!")
      throw error;
    }
  }

  async setAdressByUrl(roomLink) {
    // Exemplo de implementação
    console.log(`Conectando à sala pelo link: ${roomLink}`);
    // Aqui você usaria sua API para buscar info da sala pelo link
    const roomInfo = await this.API.getDataFromLink(roomLink);
    // faça o que precisar com roomInfo
    return roomInfo;
  }

  async setAdressByName(roomName) {
    console.log(`Conectando à sala pelo nome: ${roomName}`);
    // Aqui você buscaria salas, filtraria pelo nome
    const rooms = await this.getRooms();
    const room = rooms.find(r => r.name === roomName);
    if (!room) throw new Error("Sala não encontrada pelo nome");
    return room;
  }

  async getRooms() {
    if (!this.token) throw new Error("Usuário não autenticado");
    return await this.API.getAllRooms(this.token);
  }

 async getDataRooms
}

module.exports = bonkClient;
