const bcrypt = require('bcrypt');

console.log(typeof bcrypt.hash('password', 10)); // string