import express from "express";
import { createDerivConnection, authorize } from "../services/derivApi.js";

const router = express.Router();

router.post("/buy", async (req, res) => {
  const { token, contract_type, symbol, stake, duration = 1, duration_unit = "t", basis = "stake", currency = "USD" } = req.body;
  if (!token) return res.status(400).json({ error: "Missing token" });

  const ws = createDerivConnection(process.env.DERIV_APP_ID);

  let responded = false;
  ws.on("open", () => {
    authorize(ws, token);
  });

  ws.on("message", (msg) => {
    try {
      const data = JSON.parse(msg.toString());

      if (data.authorize && data.authorize.oauth) {
        const proposal_req = {
          proposal: 1,
          subscribe: 0,
          amount: stake,
          basis,
          contract_type,
          currency,
          duration,
          duration_unit,
          symbol
        };
        ws.send(JSON.stringify(proposal_req));
      }

      if (data.proposal) {
        const proposal = data.proposal;
        const proposal_id = proposal.id || proposal.proposal_id || null;
        if (proposal_id) {
          ws.send(JSON.stringify({ buy: proposal_id }));
        } else if (proposal.ask_price) {
          ws.send(JSON.stringify({ buy: 1, price: proposal.ask_price }));
        } else {
          if(!responded) { responded = true; res.status(500).json({ error: "Unexpected proposal format", proposal }); ws.close(); }
        }
      }

      if (data.buy) {
        if(!responded) { responded = true; res.json({ success: true, contract: data.buy }); ws.close(); }
      }

      if (data.error) {
        if(!responded) { responded = true; res.status(400).json({ success: false, error: data.error }); ws.close(); }
      }
    } catch (e) {
      if(!responded) { responded = true; res.status(500).json({ error: "Invalid response from Deriv", details: e.toString() }); ws.close(); }
    }
  });

  ws.on("error", (err) => {
    if(!responded) { responded = true; res.status(500).json({ error: "WebSocket error", details: err.toString() }); }
  });
});

export default router;
