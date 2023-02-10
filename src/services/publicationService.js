const Publication = require('../models/Publication');


exports.create = (publicationData) => Publication.create(publicationData);

exports.getOneById = (publicationId) => Publication.findById(publicationId);

exports.update = (publicationId, { title, paintingTechnique, artPicture, certificate }) => {

    if (!title || !paintingTechnique || !artPicture || !certificate) {
        throw new Error('All fileds are required!');
    }

    return Publication.findByIdAndUpdate(publicationId, { title, paintingTechnique, artPicture, certificate });
}

exports.deleteById = (publicationId) => Publication.findByIdAndDelete(publicationId);

exports.getAllPublications = () => Publication.find();