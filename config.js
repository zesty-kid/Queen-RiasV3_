const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348165846414",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEdtRCtOWWJBcmk0WjVNSXlvZ002VW03UHpmQnRaVG5WT3BZT09oT0xrdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0M5Q3hPTWNWRFNSRThlZWN4YTBtWmR4V3hZekF4L1RlS2RJWEkwY0J4OD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3RTI3V3FQNzhPOW1NanpRWU9XdnhqNnJpYUY3MHliQlJBSmN3ZEFhNkVRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkdWwva0lUQWdNQWtUaTVhcElJc0Y3NzdnV0ZlckFPRlJHV1Y0ckZaU1djPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVPSVJwNkxpQ0ZRYUZDUWpOTzZmRUNkd0tkdktxa3c0bnJUMFV6WVIxVUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlXT2JKV2JWcW9nZEV0UG9lMjhINUQxaSszVjAvOFMveWJIem94T2hiUUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkxuYnN3Rkx0eGdwRlNBWjVzbWdXWU0va2Q4QWtCNTltRW9pb2pSWjMxWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYnVxZFVaekFsUmN2cFQwTXdlS2Q4cUtSQU9UcWRUY2JIQS9ITkswM0lWMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdmSkhaNkZDSkdDRFN0aUVrRjBwN2txamY5ZnQ5ZC9wRldqMjV2THBxQW9OTmpDL1psaHVnYnY5RXZhZzBHNUlRTFlTQ3IvcEY1REZsZ05MMEloSmd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIsImFkdlNlY3JldEtleSI6ImlJZGVjc1UweFlxMVg1VHVFSjJsQmdua0FBMU1qRHUzbmNmaXM3ZGFGZXM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IlhXNFhNRDlHIiwibWUiOnsiaWQiOiIyMzQ3MDcxNzMwNDAwOjhAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxNDE2OTE0MDczMTkxNzM6OEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xMRXdVTVEvSXFpdmdZWUFTQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlNaZGowZklnZm1PTGQ1TGl1eExlYy94YUREOVl0c2lYTHE3MGkwdkNDekU9IiwiYWNjb3VudFNpZ25hdHVyZSI6Imt1bmFDMDBMVDhxSVhlejR4bmpHWWVFakhJR3AyY2xSdG1nRXM3aXhra0FzYkZIRHlna3czQVE2OUswNG5wcXpYaVNvRzJ3ZkhBSDlmQzZINjBLckRRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI3ODBCN09CUy9nQmlZU2MvbnppamhCOTRvZkxFRk5Pbk11T2h3akF1N3JNS01GbERvR0QvL2pBK1g0Z0lxTXZ1ZGNGcUROZndOR1ZoVHl6K3RPN1NqQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwNzE3MzA0MDA6OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVbVhZOUh5SUg1amkzZVM0cnNTM25QOFdndy9XTGJJbHk2dTlJdEx3Z3N4In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQklJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDExOTQ2MzMsImxhc3RQcm9wSGFzaCI6Im5tM0JiIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFCYUcifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
