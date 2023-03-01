const { model, Schema } = require('mongoose');
const { CACHE_PRESET_KEYS } = require('../cache');
const StatusCodeError = require('../custom-errors/StatusCodeError');
const COCApi = require('../services/COCApi');
const checkMemberPromotionThenAddDetails = require('../utils/checkMemberPromotionThenAddDetails');
const getFromCacheElseApi = require('../utils/getFromCacheElseApi');


module.exports = model('PromotionRequirement', new Schema({
    r: {
      type: String,
      unique: true,
      required: true,
      alias: 'role',
    },
    a: {
      type: Boolean,
      default: true,
      alias: 'available',
    },
    w: {
      type: Number,
      default: 0,
      alias: 'wars',
    },
    wl: {
      type: Number,
      default: 0,
      alias: 'war_leagues',
    },
    d: {
      type: Number,
      default: 0,
      alias: 'donations',
    },
    ra: {
      type: Number,
      default: 0,
      alias: 'raid_attacks'
    },
    p: {
      type: Number,
      default: 0,
      alias: 'clan_games_points',
    },
  },
  {
    statics: {
      /**
       * @throws {StatusCodeError}
       * @param {string} role 
       * @param {string} property 
       * @param {number} newValue 
       */
      updateOneProperty(role, property, newValue) {
        if(property != 'a')
        {
          if(newValue < 0)
            throw new StatusCodeError("'newValue' must not be negative.", 400);
          if(property == 'p' && newValue > 5000)
            throw new StatusCodeError("'games_points' must not be exceed 5000.", 400);
          if(parseInt(newValue) != newValue)
            throw new StatusCodeError("'newValue' must be integer.", 400);
        }
        return this.updateOne({ r: role }, { [property]: newValue });
      },
      /**
       * @returns {Promise<PromotionRequirement>}
       */
      getAllOrCreateDefaults() {
        return getFromCacheElseApi(CACHE_PRESET_KEYS.PROMOTIONS_REQUIREMENTS, async () => {
          let requirements = await this.find({});
          if(!requirements.length)
          {
            requirements = await this.insertMany([
              { role: 'coLeader' },
              { role: 'elder' },
            ]);
          }
          return requirements.sort(({ r }) => r == 'coLeader' ? -1 : 1);
        });
      },
      /**
       * @returns {Promise<MemberAvailableToPromotion[]>}
       */
      async getMembersWhichCanBePromoted() {
        const [ requirements, members ] = await Promise.all([
          this.getAllOrCreateDefaults(),
          COCApi.getMembersWithAllData(),
        ]);
        return members.filter(checkMemberPromotionThenAddDetails(requirements));
      },
    },
  }
));
