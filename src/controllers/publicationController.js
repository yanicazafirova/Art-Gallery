const router = require('express').Router();

const publicationService = require('../services/publicationService');

const { getErrorMessage } = require('../utils/errorMessage');
const { isAuth } = require('../middlewares/authMiddleware');
const { checkIsOwner, isOwner } = require('../middlewares/publicationMiddleware');

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

    res.render('publication/gallery', { publications });
});

router.get('/:publicationId/details', async (req, res) => {
    const publication = await publicationService.getOneById(req.params.publicationId).lean();
    const isAuthor = publication.author == req.user?._id;
    res.render('publication/details', { publication, isAuthor });;
});

router.get('/:publicationId/edit', checkIsOwner, async (req, res) => {
    const publication = await publicationService.getOneById(req.params.publicationId).lean();
    res.render('publication/edit', { publication });
});

router.post('/:publicationId/edit', checkIsOwner, async (req, res) => {
    const { title, paintingTechnique, artPicture, certificate } = req.body;

    try {
        const publication = await publicationService.update(req.params.publicationId, { title, paintingTechnique, artPicture, certificate }).lean();
        res.redirect(`/publications/${req.params.publicationId}/details`);
    } catch (error) {
        res.render('publication/edit', { error: error.message });
    }
});

router.get('/:publicationId/delete', checkIsOwner, async (req, res) => {
    await publicationService.deleteById(req.params.publicationId);
    res.redirect('/publications/gallery');
});

module.exports = router;