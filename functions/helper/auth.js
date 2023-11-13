import express from 'express';
const router = express.Router;

router.get('/checkAuth', (req, res, next) => {
    const token = req.header.token;
    if(!token) {
        return false
    }
    next();
    return true

})