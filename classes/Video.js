const LenraData = require('./LenraData.js');

module.exports = class Video extends LenraData{
    /**
     * 
     * @param {number} id 
     * @param {string} title 
     * @param {boolean} isTvShow
     */
    constructor(_id, _datastore, _refs, _refBy,id, title, isTvShow) {
        super(_id, _datastore, _refs, _refBy);
        this.id = id;
        this.title = title;
        this.isTvShow = isTvShow;
    }
}