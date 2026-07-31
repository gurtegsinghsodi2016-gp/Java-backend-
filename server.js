const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Java Compiler Backend is Running!");
});

app.post("/run", async (req, res) => {
  res.json({
    success: false,
    message: "Java compiler is not configured yet."
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
