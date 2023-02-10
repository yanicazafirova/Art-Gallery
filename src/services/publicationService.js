const Publication = require('../models/Publication');


exports.create = (publicationData) => Publication.create(publicationData);

exports.getOneById = (publicationId) => Publication.findById(publicationId);




exports.getAllPublications = () => Publication.find();