const router = require('express').Router();

const publicationService = require('../services/publicationService');

const { getErrorMessage } = require('../utils/errorMessage');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('publication/create');
});

router.post('/create', isAuth, async (req, res) => {
    const { title, paintingTechnique, artPicture, certificate } = req.body;

    try {
        await publicationService.create({ title, paintingTechnique, artPicture, certificate, author: req.user._id });
        
        res.redirect('/publications/gallery');
    } catch (error) {
        res.render('publication/create', { error: getErrorMessage(error) });
    }
});

module.exports = router;