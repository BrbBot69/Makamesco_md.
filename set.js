const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'MAKAMESCO-MD<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0RoSU8yRHBaT3ltYTBYU3NJSTc4MHlGSjVLb1FKQUV6NTB5cnlYckhHYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVm9BOUx2ditEYWFTemc3Mlc0VTFjTmw2WlQ4bmc1TUp4Nk9JeUhMLzRIMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpSm5mZjdJcHVDSDRCY0hGSUhxVlgvS3d2cVlBVEJPZEE2OFRLQ1lSdlVRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxclBkRWY0Kzh2VmhSRjBSQTVkZW43OXFjQnA0MzFRVGtyakVHbG5EclFFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlNNG9zeHFyRnB4UFN5MlJybXJaRU9lcmNtbTNzMTQ0d0Rtc1B6cHpXWEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJIb1JRbDhnbDYrN3NzUnpGSmdDaHdBZTdUN3I2N3dGYjVVY1lRdTNiajA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUJ4THBMLy9RT1p5QVNQYU5qM0VqMDE3aHNiSjVnZGVOWkQ4ZDFJVllWaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTlJMWG5YN2dXSlJJVk1sVktZT1dGZUF5NDNHNG11cnE3MGd2L3hkZXdScz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBuZTRKMVBteDlFZ2NwN0ZKYW5Ea1cvTWdSTzFJV2MrWmpqYmt5MWN2SXRQaEMwVjJkMjBYMDdQblkrUUtGK3U1RWRJM0YrS3hMWUxsOFhSQjVvT2h3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzcsImFkdlNlY3JldEtleSI6ImdCSnJxZEtKSlV0OWdIZlNYK3NqR0dqa3JCbldJT2twK3pBanhVdUF3alE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjc4MTgyMzIyNjlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMzA1RkQ5RTE0NjZCODMxNkZDRTc0RkZCOTc0MEE0QkEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MzYyODAwOX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjc4MTgyMzIyNjlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRTBBNjYzNENCNzlCNTAwRDI1MkY5QkVBMEVCM0VFMEEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MzYyODAxMH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjc4MTgyMzIyNjlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRjZCNjYyQzMxQjg3QTMwRDcxOEU1RkZBNDhFNDA0NjIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MzYyODAxM31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiUjNBOEhaTEMiLCJtZSI6eyJpZCI6IjI3ODE4MjMyMjY5OjY1QHMud2hhdHNhcHAubmV0IiwibmFtZSI6ImJiYiIsImxpZCI6IjE3NDU5MTA5MTY3NTMyODo2NUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ08yeGxZY0JFTm42bU1RR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImJleStpbGl0UkEyQ3NualdkK0QrQjd2anBFeTFHT2tJblFQWHgrVWZLd289IiwiYWNjb3VudFNpZ25hdHVyZSI6ImsxTnBLMDJNaVlkVU51b3RCR0tualhIR0I2R216TC9iMFB0dHgwOUU5M3k4bFY1SVJYSjNUYUNlN0ZqQVYxUVlSL2ZTRHo3RDRLTks5UW1Ca1RuMURnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJBQnpTS1A5Z0tyeEtaQ1ZYN2t0MUxOaFlwTlowSDg0bjBqZWNXTFlmZmtjbGhFcnAwazU3VDNzTXFrbXUrWm5obiswbmNyam9GY1hMYXFhSXc0ZEJpQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI3ODE4MjMyMjY5OjY1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlczc3ZvcFlyVVFOZ3JKNDFuZmcvZ2U3NDZSTXRSanBDSjBEMThmbEh5c0sifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MzYyODAwNywibGFzdFByb3BIYXNoIjoiUFdrNUIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU5BNSJ9',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/sesco001/Makamesco_md',
    OWNER_NAME : process.env.OWNER_NAME || "𝕬𝖛𝖊.𝕭",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "27767494368",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/kgo603.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "yes", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By Makamesco Md',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || 'This Bot does not take any calls.',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VbA9WaqEQIakf3fQFu1t",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VbA9WaqEQIakf3fQFu1t",
    CAPTION : process.env.CAPTION || "ꀭꀤꈤꅏꂦꂦ",
    BOT : process.env.BOT_NAME || 'ꀭꀤꈤꅏꂦꂦ',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Johannesburg", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    FREDI_DELETE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
