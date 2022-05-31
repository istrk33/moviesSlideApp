const Video = require('../Video');
module.exports = class TvShow extends Video {
    /**
     * 
     * @param {number} id 
     * @param {string} title 
     * @param {string} imgUrl 
     * @param {number} year 
     * @param {string[]} platforms 
     * @param {string} director 
     * @param {number} note 
     * @param {string[]} genres 
     * @param {string} synopsis 
     * @param {string[]} characters 
     */
    constructor(id, title, imgUrl, year, platforms, director, note, genres, synopsis, characters) {
        super(id, title, true);
        this.imgUrl = imgUrl;
        this.year = year;
        this.platforms = platforms;
        this.director = director;
        this.note = note;
        this.genres = genres;
        this.synopsis = synopsis;
        this.characters = characters;
    }
}