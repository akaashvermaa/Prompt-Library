const fs = require('fs');
const base64Ico = 'AAABAAEAAQEAAAEAIAAwAAAAFgAAACgAAAABAAAAAgAAAAEAIAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAA==';
fs.writeFileSync('src/app/favicon.ico', Buffer.from(base64Ico, 'base64'));
console.log('favicon.ico created');
