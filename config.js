const fs = require("fs");
require("dotenv").config();

let config = {2XNXHB1M
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Dion",
    ownerNumber: process.env.OWNER_NUMBER || "2347071730400",
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
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNk81Y05oUWo3R1VFVUV5Y2lPVUMxQVBnS0J4S0FjNVlNS0x1cGxaenJsbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0Zzc3JPZURzMWovWjQ2dFcvcWZ4RnR3U0lBWkhqOExrVDQwNzVybDJVbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjSThad3NXeEtpT2VickR5U2s3amNrTS9mNGt3a0xrQWx4eDNXcnFDNVY0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBcHBjUklTQWg3NTh4T3RYUFBxdzZzbVI1dVphb2dXMno0MmZCMkJhY1V3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNEOG9sY2xjdEFKT0RKdTJsNWNlZ3BwK1FwYkowYytHd1ZkN3hzU282bVU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlAzcXYyVGw5ODlNalM1YlMzd29qT2tjR3lYVXplaSt2aE05VndOL2Fla3c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSU1QY2V5L0pIRDlOWXdRT25SMVVZS2JjWEVlSHRVR3AvdnZRVk96LzVYWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1ltdW50cUpIUktidFVzbHZMMmpnTFlVOHYrZFZHM095NkFBVWxsdG5VZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlhanRGam1zK3F4bkpBNlMwcHJGbGk2SXFaUndQWUhRazhWMHNob0Y5Mk1wb25JRld6NytkQzdrR21MSnRCZTVZRVI5cW8rdjI4R2xoSXFvUmhoS2lBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjEyLCJhZHZTZWNyZXRLZXkiOiJMQUZkcWJ2RFpRVkRiMm83L1ExdmhDQnp5dmkzNVVwbld6aWowbCtxemp3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDcwNzE3MzA0MDBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNzgxNTkyNjREQkUxODg0QzI1NUM0OTIzNkYxQTAzMTkifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0MTE5NTU4OH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiTFcxTThSWEQiLCJtZSI6eyJpZCI6IjIzNDcwNzE3MzA0MDA6OUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjE0MTY5MTQwNzMxOTE3Mzo5QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTFBFd1VNUXNwS2l2Z1lZQVNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiU1pkajBmSWdmbU9MZDVMaXV4TGVjL3hhREQ5WXRzaVhMcTcwaTB2Q0N6RT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiRnNkNElBWkNnVFlSSjExWVYzN0paK1FjYm1UN2xUYjJQeUVsdVpQeHFVckhFaXlUMlgvRTRnQUdxeVJvMVdiOUVWZW1pL0owZndleTVsc2lseXVxRFE9PSIsImRldmljZVNpZ25hdHVyZSI6IkVuYXFwV1VCcXQzSjcwVHlwRG1nYmNDb1YzcUtIa2dDZzBIQi9iMVJWUmpKQ0hxaC9wQWRWbXB4bldjbkZCYzdUc0lzeFQwbzZHVEU3MTdWdmN6SWlRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0NzA3MTczMDQwMDo5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVtWFk5SHlJSDVqaTNlUzRyc1MzblA4V2d3L1dMYklseTZ1OUl0THdnc3gifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCSUlCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MTE5NTU4MywibGFzdFByb3BIYXNoIjoibm0zQmIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJhRSJ9",
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
