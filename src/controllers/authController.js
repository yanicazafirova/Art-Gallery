const router = require('express').Router();

const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/errorMessage');
const { AUTH_COOKI_NAME } = require('../constants');

const { isAuth } = require('../middlewares/authMiddleware');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { username, password, confirmPassword, address } = req.body;

    if (password !== confirmPassword) {
        res.locals.error = 'Passwords or email dont match!';
        return res.render('auth/register');
    }

    try {
        await authService.register({ username, password, address });
      
        res.redirect('/auth/login');
    } catch (error) {
        res.render('auth/register', { error: getErrorMessage(error) });
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const token = await authService.login(username, password);
        res.cookie(AUTH_COOKI_NAME, token, { httpOnly: true });
            
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.render('auth/login', { error: error.message });
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKI_NAME);
    res.redirect('/');
});

module.exports = router;