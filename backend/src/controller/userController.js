import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Model
import User from '../model/User.js'

export const register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {

        const { name, email, password } = req.body
        console.log(name, email, password);

        //Check if the user exist
        const user = await User.findOne({ email });

        if (user) return res.status(409).json({ message: "User already exist" });

        const newUser = await User({ name, email, password });
        await newUser.save()

        res.status(201).json({ message: "User Registered Successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ messsage: 'Server Error' })
    }
}

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {

        let { email, password } = req.body;

        let user = await User.findOne({ email: email }).lean();

        if (!user) return res.status(404).json({ message: "User not found" });

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) return res.status(400).json({ message: "Password Incorrect" });

        const token = await jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY, { expiresIn: '1D' });

        let userObj = {
            id: user._id,
            name: user.name,
            email: user.email,
        }

        res.status(200).json({ message: 'Login Successful', user: userObj, token:token })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' })

    }
}