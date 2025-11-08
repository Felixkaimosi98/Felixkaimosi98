import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import tradingRoutes from "./routes/trading.js";
import marketRoutes from "./routes/market.js";
import portfolioRoutes from "./routes/portfolio.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/trade", tradingRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/portfolio", portfolioRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
