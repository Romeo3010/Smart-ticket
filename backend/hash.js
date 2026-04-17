const bcrypt = require('bcrypt');

// ---- MOT DE PASSE CORRIGÉ ----
const passwordClair = 'admin-smart-ticket'; 
// ------------------------------

bcrypt.hash(passwordClair, 10, (err, hash) => {
    if (err) throw err;
    console.log("\n--------------------------------------------------");
    console.log("1. COPIE CE HASH DANS TA BASE DE DONNÉES :");
    console.log(hash);
    console.log("--------------------------------------------------");
    console.log("2. TON MOT DE PASSE POUR TE CONNECTER SERA :");
    console.log(passwordClair);
    console.log("--------------------------------------------------\n");
});