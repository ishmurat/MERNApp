import PostModel from '../models/Post.js'

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статью',
        });
    }
};

// export const getOne = async (req, res) => {
//     try {
//         const postId = req.params.id;

//         PostModel.findOneAndUpdate(
//             {
//                 _id: postId,
//             },
//             {
//                 $inc: { viewsCount: 1 },
//             },
//             {
//                 returnDocument: 'after',
//             },
//             (err, doc) => {
//                 if (err) {
//                     console.log(err);
//                     return res.status(500).json({
//                         message: 'Не удалось вернуть статью',
//                     });
//                 }
//                 if (!doc) {
//                     return res.status(404).json({
//                         message: 'Статья не найдена',
//                     });
//                 }

//                 res.json(doc);
//             }
//         )

//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: 'Не удалось получить статью',
//         });
//     }
// };


export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const updatedPost = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { returnDocument: 'after' }
        ).exec();

        if (!updatedPost) {
            return res.status(404).json({
                message: 'Статья не найдена',
            });
        }

        res.json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Не удалось получить статью',
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })
        const post = await doc.save();
        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать статью',
        });
    }
};

// export const remove = async (req, res) => {
//     try {
//         const postId = req.params.id;

//         PostModel.findOneAndDelete({
//             _id: postId,
//         }, (err, doc) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).json({
//                     message: 'Не удалось удалить статью',
//                 });
//             }
//             if(!doc) {
//                 return res.status(404).json({
//                     message: 'Статья не найдена'
//                 })
//             }
//             res.json({
//                 success: true,
//             });
//         })

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             message: 'Не удалось получить статью',
//         });
//     }
// };

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndDelete({
            _id: postId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Не удалось удалить статью',
                });
            }
            if(!doc) {
                return res.status(404).json({
                    message: 'Статья не найдена'
                })
            }
            res.json({
                success: true,
            });
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Не удалось получить статью',
        });
    }
};


export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        const updatePost = await PostModel.updateOne(
            { _id: postId },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId,
            }
        );

        if (!updatePost) {
            return res.status(404).json({
                message: 'Статья не найдена',
            });
        }

        res.json({
            success: true,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Не удалось обновить статью',
        });
    }
};