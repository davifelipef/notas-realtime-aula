const mongoose = require("mongoose");

//const MONGO_URI = "mongodb://localhost:27017/notas_realtime";
const MONGO_URI = "mongodb://127.0.0.1:27017/notas_realtime";

mongoose.connect(MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch(err => console.error("Erro ao conectar no MongoDB:", err));

module.exports = mongoose;