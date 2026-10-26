import express from "express";
import userRoutes from "./routes/UserRoutes";
import sequelize from "./database";
import categoryRoutes from "./routes/CategoryRoutes";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ok");
});

app.use("/user", userRoutes);
app.use("/category", categoryRoutes);

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
