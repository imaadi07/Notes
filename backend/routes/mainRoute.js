const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Notes = require("../models/notesModel");
const { ensureAuth } = require("../middleware/auth");
require("../middleware/passport");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Credentials Missing" });
    }
    if (await User.findOne({ email })) {
      return res.status(409).json({ error: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "Welcome",
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/login", async (req, res, next) =>
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return res.status(401).json({ error: "Something went wrong" });
    }
    if (!user) {
      return res.status(401).json({ error: info?.error || "Unauthorized" });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: "Login Failed" });
      }
      return res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        message: "Login Successful ",
      });
    });
  })(req, res, next)
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard");
  }
);

router.get("/me", ensureAuth, (req, res) => {
  res.status(200).json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
});

router.get("/logout", (req, res) => {
  req.logout((error) => {
    if (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
    return res.status(200).json({ message: "Logged out successfully" });
  });
});

router.get("/getnotes", ensureAuth, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    if (!notes) {
      return res.status(400).json({ error: "No Notes" });
    }
    res.status(200).json({ note: notes });
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch notes" });
  }
});

router.post("/newnotes", ensureAuth, async (req, res) => {
  try {
    const { name, content } = req.body;
    if (!name || !content) {
      return res
        .status(400)
        .json({ error: "Notes Heading and Content required" });
    }
    const newNotes = new Notes({ name, content, user: req.user._id });
    await newNotes.save();
    res.status(201).json({ message: "Notes created", note: newNotes });
  } catch (error) {
    res.status(500).json({ error: "Failed to create note" });
  }
});

router.put("/updatenote/:id", ensureAuth, async (req, res) => {
  try {
    const { name, content } = req.body;
    const noteId = req.params.id;
    const note = await Notes.findOne({ _id: noteId, user: req.user.id });
    if (!note) {
      return res.status(404).json({ error: "Notes not found" });
    }

    note.name = name || note.name;
    note.content = content || note.content;

    await note.save();
    res.status(200).json({ message: "Succefully Updated", note: note });
  } catch (error) {
    res.status(500).json({ error: "Failed to update notes" });
  }
});

router.delete("/deletenote/:id", ensureAuth, async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await Notes.findOneAndDelete({
      _id: noteId,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

module.exports = router;
