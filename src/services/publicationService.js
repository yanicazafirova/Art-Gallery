const Publication = require('../models/Publication');


exports.create = (publicationData) => Publication.create(publicationData); 