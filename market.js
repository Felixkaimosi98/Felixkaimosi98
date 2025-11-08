import express from "express";
import { createDerivConnection, authorize } from "../services/derivApi.js";

const router = express.Router();

router.post("/tick", (req, res) => {
  const { token, symbol = "R_100" } = req.body;
  if (!token) return res.status(400).json({ error: "Missing token" });

  const ws = createDerivConnection(process.env.DERIV_APP_ID);
  ws.on("open", () => authorize(ws, token));

  ws.on("message", (msg) => {
    try {
      const data = JSON.parse(msg.toString());
      if (data.authorize && data.authorize.oauth) {
        ws.send(JSON.stringify({ ticks: symbol, subscribe: 1 }));
      }
      if (data.tick) {
        res.json({ tick: data.tick });
        ws.close();
      }
      if (data.error) {
        res.status(400).json({ error: data.error });
        ws.close();
      }
    } catch (e) {
      res.status(500).json({ error: "Invalid response", details: e.toString() });
      ws.close();
    }
  });

  ws.on("error", (err) => {
    res.status(500).json({ error: "WebSocket error", details: err.toString() });
  });
});

export default router;
