import express from "express"
import cors from "cors"
import prisma from "./db/prisma"
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World")
})

// Endpoint to start session
app.post("/api/start-session", async (req, res) => {
    const unique_id = crypto.randomUUID();
    const userurl = `https://tutor-arc.vercel.app/session/${unique_id}`;
  
    const session = await prisma.liveSession.create({
      data: { type: "admin", unique_id, userurl },
    });
  
    res.json(session);
  });
  
  // Fetch session by unique_id
  app.get("/api/session/:id", async (req, res) => {
    const session = await prisma.liveSession.findUnique({
      where: { unique_id: req.params.id },
    });
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json(session);
  });


app.listen(PORT, () => {
    console.log("Server is running on port 3000")
})