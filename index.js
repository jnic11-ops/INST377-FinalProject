// index.js
const express = require("express");
const supabaseClient = require("@supabase/supabase-js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// If these are missing, fail loudly
if (!supabaseUrl || !supabaseKey) {
  console.warn("Missing SUPABASE_URL or SUPABASE_KEY environment variables.");
}

const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

// Serve homepage by default (optional but nice)
app.get("/", (req, res) => {
  res.sendFile("INST377_final_homepage.html", { root: __dirname + "/public" });
});

// 1) READ endpoint: get all saved activities
app.get("/api/savedActivities", async (req, res) => {
  console.log("Attempting to GET all saved activities");

  const { data, error } = await supabase
    .from("savedActivity")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// 2) WRITE endpoint: save one activity
app.post("/api/savedActivity", async (req, res) => {
  console.log("Adding saved activity");
  console.log("Request:", req.body);

  const { activity, type, participants, price, duration, activity_key } = req.body;

  // minimal validation
  if (!activity || !activity_key) {
    return res.status(400).json({ error: "Missing required fields: activity, activity_key" });
  }

  // Insert (or ignore duplicates by key)
  // If your table has a UNIQUE constraint on activity_key, this prevents duplicates:
  const { data, error } = await supabase
    .from("savedActivity")
    .upsert(
      {
        activity_key,
        activity,
        type: type || null,
        participants: participants ?? null,
        price: price ?? null,
        duration: duration || null,
      },
      { onConflict: "activity_key" }
    )
    .select();

  if (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Local dev only (Vercel uses serverless export)
if (process.env.VERCEL !== "1") {
  app.listen(port, () => {
    console.log("App is available on port:", port);
  });
}

module.exports = app;
