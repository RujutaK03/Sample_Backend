const fs = require('fs');
const path = require('path');

function readImageFile(filePath) {
    const fileData = fs.readFileSync(filePath);
    const contentType = path.extname(filePath).toLowerCase();

    return {
        data: fileData,
        contentType: `image/${contentType.slice(1)}`,
    };
}

const movieData = [
    {
        title: 'Red, White and Royal Blue',
        description: 'Alex Claremont-Diaz, the first son of the United States, and young Prince Henry fall in love. However, considering their high-profile public lives, they must keep their relationship a secret at all costs.',
        posterURL: readImageFile('E:/Rujuta/Rujuta/VIT/Ethnus_MERN_FullStack/Project/backend/data/posters/Poster1.jpg'),
        releaseDate: '2023-07-22'
    }
];

module.exports = movieData;