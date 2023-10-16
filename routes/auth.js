const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { isEmail } = require("../utils/functions");
const { JWT_SECRET } = require("../config");

const isAdminMiddleware = require("../middleware/isAdmin");

router.get("/", isAdminMiddleware, async (req, res) => {
    try {
        const { email } = req.query;
        let filter = {};
        if (email) {
            if (email) {
                filter.email = email;
            }
        }

        res.status(200).send(await User.find(filter).sort({ _id: -1 }));
    } catch (error) {
        res.status(400).send("User not found");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const data = await User.findOne({ _id: req.params.id });
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({ message: "User not found" });
    }
});

router.post("/register", async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = bcrypt.hashSync(req.body.password, 10);

        if (!isEmail(email)) {
            return res.status(400).send({ message: "Email is invalid" });
        }

        const emailExists = await User.findOne({ email: email });
        if (emailExists) {
            return res.status(400).send({ message: "Email already exists" });
        }

        const user = new User({
            name: name,
            email: email,
            password: password,
        });

        const newUser = await user.save();

        const token = jwt.sign({ _id: newUser._id }, JWT_SECRET);

        res.status(200).send({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            token: token,
        });
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res
                .status(400)
                .send({ message: "Invalid email or password" });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res
                .status(400)
                .send({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET);

        res.status(200).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token,
        });
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

router.post("/password", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).send({ message: "Invalid email" });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).send({ message: "Invalid password" });
        }

        const newpassword = bcrypt.hashSync(req.body.newpassword, 10);
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { password: newpassword },
            {
                runValidators: true,
                new: true,
            }
        );
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

router.put("/:id", isAdminMiddleware, async (req, res) => {
    try {
        const User_id = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(User_id, req.body, {
            runValidators: true,
            new: true,
        });
        res.status(200).send(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error._message });
    }
});

router.delete("/:id", isAdminMiddleware, async (req, res) => {
    try {
        const User_id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(User_id);
        res.status(200).send(deletedUser);
    } catch (error) {
        res.status(400).send({ message: error._message });
    }
});

module.exports = router;
