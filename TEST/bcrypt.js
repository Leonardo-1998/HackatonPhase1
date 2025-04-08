// bcrypt
// https://www.npmjs.com/package/bcryptjs
const bcrypt = require('bcryptjs');

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

let salt = bcrypt.genSaltSync(saltRounds)
let hash = bcrypt.hashSync(myPlaintextPassword,salt)

console.log(salt)
console.log(hash)

// Technique 1 (generate a salt and hash on separate function calls):

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});

// Technique 2 (auto-gen a salt and hash):

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
});

// *Note that both techniques achieve the same end-result.


// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // result == true
});
bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
    // result == false
});