import express from "express";
import bcryptjs from "bcryptjs";
import cors from "cors";
import knex from "knex";
import { handleRegister } from "./controllers/register.js";
import { handleSignin } from "./controllers/signin.js";
import { handleProfile } from "./controllers/profile.js";
import { handleEntries } from "./controllers/entries.js";
import { handleRecognize } from "./controllers/faceRecognize.js";

// Initializing Express and Middleware
const app = express();
app.use(express.json());
app.use(cors());

// Initializing Database
const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  },
});

// Server Status Check
app.get("/", (req, res) => {
  res.json("The backend is up");
});

// Registration Endpoint
app.post("/register", handleRegister(bcryptjs, db));

// Sign-In Endpoint
app.post("/signin", handleSignin(bcryptjs, db));

// Retrive Profile
app.get("/profile/:id", handleProfile(db));

// Update Entries Count Endpoint
app.put("/entries", handleEntries(db));

// Face Recognition Endpoint
app.post("/recognize", handleRecognize);


// Starting the Server
app.listen(process.env.PORT || 3001, () => {
  console.log("App is running");
});
