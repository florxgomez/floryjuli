import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from dist/ in production, root in dev
const staticDir =
  process.env.NODE_ENV === "production"
    ? path.join(__dirname, "dist")
    : __dirname;
app.use(express.static(staticDir));

// Handle RSVP POST
app.post("/rsvp", (req, res) => {
  console.log("Received RSVP:", req.body);
  const { name, dietary, attendance } = req.body;
  const entry = `${new Date().toISOString()}: ${name}, ${dietary}, ${attendance}\n`;

  fs.appendFile(path.join(__dirname, "rsvp.txt"), entry, (err) => {
    if (err) {
      console.error("Error saving RSVP:", err);
      res.status(500).send("Error saving RSVP");
    } else {
      console.log("RSVP saved");
      res.send("RSVP saved successfully");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
