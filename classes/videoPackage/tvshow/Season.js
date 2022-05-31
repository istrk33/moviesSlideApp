module.exports = class TvShow {
    /**
     * 
     * @param {number} tvShowId 
     * @param {number} seasonId 
     * @param {number} numberOfEpisodes 
     */
    constructor(tvShowId, seasonId, numberOfEpisodes) {
        this.tvShowId=tvShowId ;
        this.seasonId=seasonId ;
        this.numberOfEpisodes=numberOfEpisodes ;
    }
}