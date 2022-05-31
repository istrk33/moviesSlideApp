module.exports = class Video {
    /**
     * 
     * @param {number} id 
     * @param {string} title 
     * @param {boolean} isTvShow
     */
    constructor(id, title, isTvShow) {
        this.id = id;
        this.title = title;
        this.isTvShow = isTvShow;
    }
}