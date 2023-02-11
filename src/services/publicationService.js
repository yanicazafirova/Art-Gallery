const Publication = require('../models/Publication');


exports.create = (publicationData) => Publication.create(publicationData);

exports.getOneById = (publicationId) => Publication.findById(publicationId);

exports.getOneDetailed = (publicationId) => Publication.findById(publicationId).populate('author');

exports.update = (publicationId, newData) => Publication.findByIdAndUpdate(publicationId, newData, { runValidators: true });

exports.deleteById = (publicationId) => Publication.findByIdAndDelete(publicationId);

exports.getAllPublications = () => Publication.find();