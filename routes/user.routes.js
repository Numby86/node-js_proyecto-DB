const express = require('express');
const passport = require('passport');

const userRouter = express.Router();

userRouter.post('/register', (req, res, next) => {
    const done = (err, user) => {
        if (err){
            return next(err);
        }
        req.logIn(
            user,
            (err) => {
                if (err) {
                    return next(err);
                }
                return res.status(201).json(user);
            }
        );
    };
    passport.authenticate('register', done)(req);
});

userRouter.post('/login', (req, res, next) => {
    const done = (err, user) => {
        if (err){
            return next(err);
        }
        req.logIn(
            user,
            (err) => {
                if (err) {
                    return next(err);
                }
                return res.status(200).json(user);
            }
        );
    };
    passport.authenticate('login', done)(req);
});

module.exports = userRouter;