const publicationService = require('../services/publicationService');

exports.isOwner = async (req, res, next) => {
    const publicationId = req.params.publicationId;

    const publication = await publicationService.getOneById(publicationId).lean();

    if (publication.author == req.user._id) {

        return res.redirect(`/publication/${req.params.publicationId}/details`);
    }

    req.publication = publication;
    next();
};

exports.checkIsOwner = async (req, res, next) => {
    let publication = await publicationService.getOneById(req.params.publicationId);

    if (publication.author == req.user._id) {
        req.publication = publication;
        next();
    } else {
        res.redirect(`/publication/${req.params.publicationId}/details`);
    }

}