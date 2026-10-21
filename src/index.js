import express from "express";
import userRoutes from "./routes/UserRoutes";
import sequelize from "./database";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ok");
});

app.use("/users", userRoutes);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o MySQL estabelecida com sucesso.");
    await sequelize.sync();
    app.listen(process.env.APP_PORT, () => {
      console.log(`Servidor rodando na porta ${process.env.APP_PORT}`);
    });
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
  }
}

startServer();
