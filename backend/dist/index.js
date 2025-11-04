"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const prisma_1 = __importDefault(require("./db/prisma"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World");
});
// Endpoint to start session
app.post("/api/start-session", async (req, res) => {
    const unique_id = crypto.randomUUID();
    const userurl = `https://tutor-arc.vercel.app/session/${unique_id}`;
    const session = await prisma_1.default.liveSession.create({
        data: { type: "admin", unique_id, userurl },
    });
    res.json(session);
});
// Fetch session by unique_id
app.get("/api/session/:id", async (req, res) => {
    const session = await prisma_1.default.liveSession.findUnique({
        where: { unique_id: req.params.id },
    });
    if (!session)
        return res.status(404).json({ message: "Session not found" });
    res.json(session);
});
app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});
