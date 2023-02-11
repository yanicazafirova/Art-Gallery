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
    const publication = await publicationService.getOneDetailed(req.params.publicationId).lean();
    const isAuthor = publication.author._id == req.user?._id;
    const isShared = publication.usersShared.some(x => x._id == req.user._id);

    res.render('publication/details', { ...publication, isAuthor, isShared });;
});

router.get('/:publicationId/edit', isAuth, checkIsOwner, async (req, res) => {
    const publication = await publicationService.getOneById(req.params.publicationId).lean();
    res.render('publication/edit', { ...publication });
});

router.post('/:publicationId/edit', isAuth, checkIsOwner, async (req, res) => {
    const { title, paintingTechnique, artPicture, certificate } = req.body;

    try {
        await publicationService.update(req.params.publicationId, { title, paintingTechnique, artPicture, certificate }).lean();
        res.redirect(`/publications/${req.params.publicationId}/details`);
    } catch (error) {
        res.render('publication/edit', { error: error.message });
    }
});

router.get('/:publicationId/delete', isAuth, checkIsOwner, async (req, res) => {
    await publicationService.deleteById(req.params.publicationId);
    res.redirect('/publications/gallery');
});

router.get('/:publicationId/share', isAuth, async (req, res) => {
    const publication = await publicationService.getOneById(req.params.publicationId);
    publication.usersShared.push(req.user._id);
    await publication.save();

    res.redirect('/');
});

module.exports = router;