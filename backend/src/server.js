import express from "express";
import cors from "cors";
import contactsRoutes from "./routes/contacts.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/contacts", contactsRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});