const express = require('express');
const multer = require('multer');
const path = require('path');

const movieSchema = require('../schema/movieSchema');
const router = express.Router();

const basePath = path.resolve(__dirname, '..', 'uploads');
const posterPath = path.join(basePath, '/posters');
const castPath = path.join(basePath, '/cast');
const directorPath = path.join(basePath, '/director');

router.use('/get-poster', express.static(posterPath))
router.use('/get-cast', express.static(castPath))
router.use('/get-director', express.static(directorPath))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const fieldName = file.fieldname;
        let folderPath;

        switch (fieldName) {
            case 'moviePoster':
                folderPath = posterPath;
                break;
            case 'castImages':
                folderPath = castPath;
                break;
            case 'directorImages':
                folderPath = directorPath;
                break;
            default:
                folderPath = basePath;
                break;
        }

        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

router.post('/add-movie', upload.fields([
    { name: 'moviePoster', maxCount: 1 },
    { name: 'castImages', maxCount: 10 },
    { name: 'directorImages', maxCount: 5 },
]), async (req, res) => {
    try {
        const castMembers = req.files['castImages'].map((file, index) => ({
            name: req.body.cast[index],
            filename: file.filename,
        }));

        const directors = req.files['directorImages'].map((file, index) => ({
            name: req.body.director[index],
            filename: file.filename,
        }));

        const newMovie = new movieSchema({
            title: req.body.title,
            description: req.body.description,
            moviePoster: {
                filename: req.files['moviePoster'][0].filename,
            },
            releaseDate: req.body.releaseDate,
            duration: {
                hours: parseInt(req.body.duration.split(":")[0]),
                minutes: parseInt(req.body.duration.split(":")[1])
            },
            genre: req.body.genres,
            castImages: castMembers,
            directorImages: directors,
            language: req.body.languages,
        });

        await newMovie.save();

        res.status(200).json({ message: 'New Movie added successfully' });
    } catch (error) {
        console.error('Error uploading image: ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/display-movie', async (req, res) => {
    const allImages = await movieSchema.find();
    res.send(allImages);
});

router.get('/movies', async (req, res) => {
    try {
        const movies = await movieSchema.find({}, 'title');
        res.send(movies);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;