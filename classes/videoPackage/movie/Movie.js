module.exports = class Movie {
   /**
    * 
    * @param {number} movieId 
    * @param {string} movieTitle 
    * @param {string} imgUrl 
    * @param {string} director 
    * @param {number} year 
    * @param {string[]} platforms 
    * @param {string} synopsis 
    * @param {number} duration 
    * @param {string[]} genres 
    * @param {string[]} characters 
    * @param {number} note 
    */
    constructor(movieId, movieTitle, imgUrl, director, year, platforms, synopsis, duration, genres, characters,note) {
        super(movieId, movieTitle, false);
        this.imgUrl = imgUrl;
        this.director = director;
        this.year = year;
        this.platforms = platforms;
        this.synopsis = synopsis;
        this.duration = duration;
        this.genres = genres;
        this.characters = characters;
        this.note = note;
    }
}