const router = require('express').Router();

const publicationService = require('../services/publicationService');

router.get('/', async (req, res) => {
    const publicationsResult = await publicationService.getAllPublications().lean();
    const publications = publicationsResult.map(x => ({ ...x, sharesCount: x.usersShared.length }));
    res.render('home', { publications });
});

module.exports = router;