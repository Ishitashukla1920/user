import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
dotenv.config();

//app.use(cors());

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Initialize Express
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
// Middleware
app.use(bodyParser.json());

// Regex for email validation
const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Signup Route
app.post('/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validate input fields
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  try {
    // Supabase signup method
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log("Supabase response:", data, error); // Debug logs

    if (error) throw error;

    // Optional: Store user metadata (like name) in Supabase table
    if (data.user) {
      const { error: dbError } = await supabase
        .from("users")
        .insert([{ id: data.user.id, full_name: name, email , password}]);

      if (dbError) throw dbError;
    }

    res.status(200).json({ message: "Signup successful", user: data.user });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // Supabase login method
    const { session, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    res.status(200).json({ message: 'Login successful', session });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Test Supabase Connection Route
app.get('/test-supabase', async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    res.status(200).json({ message: 'Connected to Supabase successfully!', data });
  } catch (err) {
    console.error("Supabase test error:", err.message);
    res.status(500).json({ message: 'Failed to connect to Supabase', error: err.message });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
