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

router.get('/gallery', async (req, res) => {
    const publications = await publicationService.getAllPublications().lean();
    console.log(publications);
    res.render('publication/gallery', { publications });
});

router.get('/:publicationId/details', async (req, res) => {
    const publication = await publicationService.getOneById(req.params.publicationId).lean();
    res.render('publication/details', { publication });
});
module.exports = router;