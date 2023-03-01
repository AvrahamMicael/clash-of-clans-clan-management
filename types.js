/**
 * @typedef {object} PlayerHousePart
 * @property {'roof'|'ground'|'walls'|'decoration'} type
 * @property {number} id
 */

/**
 * @typedef {{ elements: [PlayerHouse, PlayerHouse, PlayerHouse, PlayerHouse] }} PlayerHouse
 */

/**
 * @typedef {'member'|'admin'|'coLeader'|'leader'} Role
 */

/**
 * @typedef {{ id: number, name: string, iconUrls: { small: string, tiny: string, medium?: string } }} League
 */

/**
 * Clan data which comes along with one player request.
 * @typedef {object} PlayerClan
 * @property {string} tag
 * @property {string} name
 * @property {number} clanLevel
 * @property {{ small: string, large: string, medium: string }} badgeUrls
 */

/**
 * @typedef {'home'|'builderBase'} Village
 */

/**
 * @typedef {object} Achievement
 * @property {string} name
 * @property {number} stars
 * @property {number} value
 * @property {number} target
 * @property {string} info
 * @property {?string} completionInfo
 * @property {Village} village
 */

/**
 * @typedef {object} PlayerLabel
 * @property {number} id
 * @property {string} name
 * @property {{ small: string, medium: string }} iconUrls
 */

/**
 * Troops, heroes and spells.
 * @typedef {object} Army
 * @property {string} name
 * @property {number} level
 * @property {number} maxLevel
 * @property {Village} village
 */

/**
 * @typedef {object} Player
 * @property {string} tag
 * @property {string} name
 * @property {number} townHallLevel
 * @property {number} expLevel
 * @property {number} trophies
 * @property {number} bestTrophies
 * @property {number} warStars
 * @property {number} attackWins
 * @property {number} defenseWins
 * @property {number} builderHallLevel
 * @property {number} versusTrophies
 * @property {number} bestVersusTrophies
 * @property {number} versusBattleWins
 * @property {number} [role]
 * @property {number} warPreference
 * @property {number} donations
 * @property {number} donationsReceived
 * @property {number} clanCapitalContributions
 * @property {League} [league]
 * @property {PlayerClan} [clan]
 * @property {Achievement[]} achievements
 * @property {PlayerHouse} [playerHouse]
 * @property {number} versusBattleWinCount
 * @property {PlayerLabel[]} labels
 * @property {Army[]} troops
 * @property {Army[]} heroes
 * @property {Army[]} spells
 */

/**
 * @typedef {object} ClanMember
 * @property {string} tag
 * @property {string} name
 * @property {Role} role
 * @property {number} expLevel
 * @property {League} league
 * @property {number} trophies
 * @property {number} versusTrophies
 * @property {number} clanRank
 * @property {number} previousClanRank
 * @property {number} donations
 * @property {number} donationsReceived
 * @property {PlayerHouse} playerHouse
 */

/**
 * @typedef {object} RaidMember
 * @property {string} tag
 * @property {string} name
 * @property {number} attacks
 * @property {number} attackLimit
 * @property {0|1} bonusAttackLimit
 * @property {number} capitalResourcesLooted
 */

/**
 * @typedef {{ attacks: number, attackLimit: number }} RaidData
 */

/**
 * @typedef {object} __MemberWithAllData
 * @property {number} wars
 * @property {number} war_leagues
 * @property {number} games_points
 * @property {RaidData} lastRaid
 * @typedef {__MemberWithAllData & ClanMember} MemberWithAllData
 */

/**
 * @typedef {object} ExtraData
 * @property {number} tag
 * @property {number} wars
 * @property {number} war_leagues
 * @property {number} games_points
 */

/**
 * @typedef {object} PromotionRequirement
 * @property {string} r role
 * @property {boolean} a available
 * @property {number} w wars
 * @property {number} wl war_leagues
 * @property {number} d donations
 * @property {number} ra raid_attacks
 * @property {number} p clan_games_points
 */

/**
 * @typedef {object} __MemberAvailableToPromotion
 * @property {string} roleToPromote
 * @typedef {__MemberAvailableToPromotion & MemberWithAllData} MemberAvailableToPromotion
 */

/**
 * A tag without `#`
 * @typedef {string} TagWithoutSharp
 */
