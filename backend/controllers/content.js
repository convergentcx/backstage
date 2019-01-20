const Content = require('../models/content');

exports.postContent = (req, res, next) => {
    const economyAddress = req.params.economyAddress;
    const content = new Content({
        link: "https://www.biography.com/.image/t_share/MTE1ODA0OTcxODExNDQwMTQx/vincent-van-gogh-9515695-3-402.jpg", economy: economyAddress
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