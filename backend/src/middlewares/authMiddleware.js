import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import RoboshareUser from '../models/RoboshareUser.js';

export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    if (!token) res.status(401).json({ message: 'Not authorized, no token' });
};

// RoboShare has its own OTP-verified identity (RoboshareUser), separate from the
// main User/JWT system above, so it needs its own token check.
export const protectRoboshare = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.type !== 'roboshare') throw new Error('Wrong token type');

            const roboshareUser = await RoboshareUser.findById(decoded.id);
            if (!roboshareUser || !roboshareUser.isVerified) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            req.roboshareUser = roboshareUser;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};