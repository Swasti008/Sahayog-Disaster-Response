import express from "express";
import cors from "cors";
import http from "http";
import { connectDB } from "./src/config/db.js";
import emergencyRoute from "./src/routes/emergency.js";


const app = express();
const server = http.createServer(app);
app.use(cors());

app.use(cors({
  origin: 'http://localhost:5173',
}));


const PORT = process.env.PORT || 5000;

await connectDB();

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());
app.use("/emergency",emergencyRoute);
