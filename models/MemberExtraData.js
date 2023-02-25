const { model, Schema } = require('mongoose');
const { CACHE_PRESET_KEYS, cache } = require('../cache');
const putExtraDataToMember = require('../utils/putExtraDataToMember');

module.exports = model('MemberExtraData', new Schema({
    tag: {
      type: String,
      unique: true,
      required: true,
    },
    wars: {
      type: Number,
      default: 0,
    },
    war_leagues: {
      type: Number,
      default: 0,
    },
    games_points: {
      type: Number,
      default: 0,
    },
  },
  {
    statics: {
      updateOneExtra(tag, name, newValue) {
        if(newValue < 0)
          throw new Error("'newValue' must not be negative.");
        return this.updateOne({ tag }, { [name]: newValue });
      },
      getAll() {
        return this.find({}, 'tag wars war_leagues games_points');
      },
      async deleteIfSomeMemberLeft(membersWithExtraData, membersExtraData) {
        const deleteExtraDataArr = [];
        membersExtraData.forEach(({ tag }) => {
          const isMemberStillInThisClan = membersWithExtraData.some(member => member.tag == tag);
          if(isMemberStillInThisClan) return;
          deleteExtraDataArr.push(tag);
        });
        if(!deleteExtraDataArr.length) return;
        await this.deleteMany({ tag: new RegExp(`^${deleteExtraDataArr.join('|')}$`) });
        cache.delete(CACHE_PRESET_KEYS.MEMBERS_EXTRA_DATA);
      },
      createExtraDataIfDoesntExistAndAdd(members, membersExtraData) {
        const createExtraDataArr = [];
        members.forEach(({ tag }, idx, membersArr) => {
          const extraData = membersExtraData.find(extraD => extraD.tag == tag);
          if(!extraData)
          {
            createExtraDataArr.push({ tag });
            return;
          }
          putExtraDataToMember(membersArr[idx], extraData);
        });

        if(createExtraDataArr.length)
        {
          this.insertMany(createExtraDataArr).then();
          createExtraDataArr.forEach(({ tag }) => {
            const member = members.find(member => tag == member.tag);
            putExtraDataToMember(member, null);
          });
          cache.delete(CACHE_PRESET_KEYS.MEMBERS_EXTRA_DATA);
        }
        this.deleteIfSomeMemberLeft(members, membersExtraData);
      },
      async getAllFromCacheElseGetOnlyOneMember(memberTag) {
        let data = cache.get(CACHE_PRESET_KEYS.MEMBERS_EXTRA_DATA)
          ?.find(({ tag }) => tag == memberTag);
        if(!data)
          data = await this.findOne({ tag: memberTag }, 'tag wars war_leagues games_points');
        return data;
      },
    },
  }
));
