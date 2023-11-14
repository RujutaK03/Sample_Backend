const express = require('express');
const multer = require('multer');
const path = require('path');

const theatreSchema = require('../schema/theatreSchema');
const router = express.Router();

const basePath = path.resolve(__dirname, '..', 'uploads');
const theatrePath = path.join(basePath, '/theatres');

router.use('/get-theatre', express.static(theatrePath));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, theatrePath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

router.post('/add-theatre', upload.single('image'), async (req, res) => {
    try {
        const newTheatre = new theatreSchema({
            name: req.body.name,
            image: {
                filename: req.file.filename,
            },
            location: req.body.location,
        });

        await newTheatre.save();

        res.status(200).json({ message: 'New theatre added successfully' });
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/display-theatre', async (req, res) => {
    const allTheatres = await theatreSchema.find({});
    res.send(allTheatres);
})

router.get('/theatres', async (req, res) => {
    try {
        const allTheatres = await theatreSchema.find({}, 'name');
        res.send(allTheatres);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;