const fetch = require("node-fetch");
const { APIError, ParamError } = require("./errors")
class Tanki{
    /**
     * Tanki
     * 
     * Small crappy api.
     * @param {Object} params (args)
     * @param {String} params.nick User nickname 
     * @param {String} params.language API Language
     * @param {Boolean} params.china Use 3dtank API? (Chinese TO)
     */
    constructor(params){
        this.lang = !params.language ? "en" : params.language;
        this.nick = params.nick;
        this.china = !params.china ? false : params.china;
        if(!this.nick)throw new ParamError({
            code: 1,
            message: "Param \"nick\" not provided!"
        })
    }

    /**
     * getFullUser
     * 
     * @returns {JSON} with user info  
     */

    async getFullUser(){
        const result = (await (await fetch(genURL({
            nick: this.nick,
            lang: this.lang,
            china: this.china
        }))).json());
        if(result.responseType == "NOT_FOUND")throw new APIError({
            code: 1,
            message: "Account not found!"
        });
        return result.response
    }
    /**
     * GetCleanUser
     * 
     * @returns {JSON} Returns user info without objects
     */

    async getCleanUser(){
        const user = await this.getFullUser(this.nick);
        for(let i of Object.keys(user))
            if(typeof user[i] == "object")
                delete user[i] 
        
        return user
    }

    /**
     * GetDronesInfo
     * 
     * @returns {JSON} Returns all user drones
     */
    async getDronesInfo(){
        const user = await this.getFullUser(this.nick);
        for(let entry of user.dronesPlayed)
            delete entry["imageUrl"]
        
        return user.dronesPlayed
    }

    /**
     * GetHullsInfo
     * 
     * @returns {JSON} Returns all user hulls
     */
    async getHullsInfo(){
        const user = await this.getFullUser(this.nick);
        for(let entry of user.hullsPlayed)
            delete entry["imageUrl"]
        
        return user.hullsPlayed
    }

    /**
     * GetPaintsInfo
     * 
     * @returns {JSON} Returns all user paints
     */
    async getPaintsInfo(){
        const user = await this.getFullUser(this.nick);
        for(let entry of user.paintsPlayed)
            delete entry["imageUrl"]
        
        return user.paintsPlayed
    }

    /**
     * GetSuppliesInfo
     * 
     * @returns {JSON} Returns all user supplies
     */
    async getSuppliesInfo(){
        const user = await this.getFullUser(this.nick);
        for(let entry of user.suppliesUsage)
            delete entry["imageUrl"]
        
        return user.suppliesUsage
    }

    /**
     * GetTurretsInfo
     * 
     * @returns {JSON} Returns all user turrets
     */
    async getTurretsInfo(){
        const user = await this.getFullUser(this.nick);
        for(let entry of user.turretsPlayed)
            delete entry["imageUrl"]
        
        return user.turretsPlayed
    }

    /**
     * GetModulesInfo
     * 
     * @returns {JSON} Returns all user modules
     */
    async getModulesInfo(){
        const user = await this.getFullUser(this.nick);
        for(let entry of user.resistanceModules)
            delete entry["imageUrl"]
        
        return user.resistanceModules
    }

    /**
     * GetModesInfo
     * 
     * @returns {JSON} Returns all user modes info
     */
    async getModesInfo(){
        const user = await this.getFullUser(this.nick);
        let modes = {};
        for(let entry of user.modesPlayed)
            modes[entry.type] = {
                scoreEarned: entry.scoreEarned,
                timePlayed: entry.timePlayed
            }
        
        return modes
    }
}

class Servers{
    constructor(){
        return this.get()
    };

    async get() {
        const test = (await (await fetch("https://test.tankionline.com/public_test")).json());
        const prod = (await (await fetch("https://tankionline.com/s/status.js")).json());
        const server_stats = (await (await fetch("https://tankionline.com/s/statistics.txt")).text());
        const china_prod = (await (await fetch("https://www.3dtank.com/s/status.js")).json());
        const china_stats = (await (await fetch("https://www.3dtank.com/s/statistics.txt")).text());
        return {
            test,
            prod,
            server_stats,
            china_prod,
            china_stats
        }
    }
}

class Top{
    /**
     * Tops.
     * 
     * @param {Object} params (args)
     * @param {String} params.topType Must be "crystals","efficiency","golds" or "score". If not provided, returns all tops.
     * @param {Boolean} params.china Get 3dtank top? (Chinese TO)
     * @returns {JSON} Top
     */
    constructor(params){
        return this.get(params.topType, !params.china ? false : params.china)
    };

    async get(topType, china){
        const tops = (await (await fetch(china ? "https://ratings.3dtank.com/get_stat/top/" :"https://ratings.tankionline.com/api/eu/top/")).json()).response;
        return topType == undefined ? tops : tops[topType]
    }
}

module.exports = { Tanki, Servers, Top }

function genURL (params){
    return (params.china ? "https://ratings.3dtank.com/get_stat/profile/?user=" :"https://ratings.tankionline.com/api/eu/profile/?user=") + params.nick + "&lang=" + params.lang 
}