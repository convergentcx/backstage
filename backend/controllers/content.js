const Content = require('../models/content');

exports.postContent = (req, res, next) => {
    const economyAddress = req.params.economyAddress;
    const link = req.body.link;
    const content = new Content({
        link: link, economy: economyAddress
    })
    return content.save()
        .then(result => {
            res.status(201).json({
                message: 'New content created successfully!',
                user: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.getContent = (req, res, next) => {
    const economyAddress = req.params.economyAddress;
    Content.find({economy: economyAddress})
    .then(content=>{
        return res.status(200).json({message: 'here is your content', content: content})
    })
}