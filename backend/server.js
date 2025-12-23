const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/weatherApp")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const SearchSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  searchedAt: {
    type: Date,
    default: Date.now,
  },
});

const Search = mongoose.model("Search", SearchSchema);

const API_KEY = "b31404c0f7a5adfdb88ab7ebb051cf24";

app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city;

    if (!city) {
      return res.status(400).json({ message: "City is required" });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      return res.status(404).json({ message: data.message });
    }

    res.json({
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      date: new Date(data.dt * 1000).toLocaleDateString(),
      time: new Date(data.dt * 1000).toLocaleTimeString(),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


//upcoming 5 days
app.get("/api/forecast", async (req, res) => {
  try {
    // const city = req.query.city;
    // const city = "guntur"

    if (!city) {
      return res.status(400).json({ message: "City is required" });
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== "200") {
      return res.status(404).json({ message: "City not found" });
    }

    // One forecast per day (12:00 PM)
    const daily = data.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );

    const formatted = daily.slice(0, 6).map((item) => ({
      date: new Date(item.dt * 1000).toLocaleDateString(),
      day: new Date(item.dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
      }),
      temp: item.main.temp,
      description: item.weather[0].description,
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/search", async (req, res) => {
  try {
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({ message: "City is required" });
    }

    const saved = await Search.create({ city });
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/history", async (req, res) => {
  try {
    const history = await Search.find()
      .sort({ searchedAt: -1 })
      .limit(5);

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
