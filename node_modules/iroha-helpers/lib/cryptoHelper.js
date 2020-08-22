"use strict";
exports.__esModule = true;
var ed25519_js_1 = require("ed25519.js");
/**
 * Returns a new keypair
 */
var generateKeyPair = function () {
    var keys = ed25519_js_1.createKeyPair();
    var publicKey = (keys.publicKey).toString('hex');
    var privateKey = (keys.privateKey).toString('hex');
    return { publicKey: publicKey, privateKey: privateKey };
};
exports["default"] = {
    generateKeyPair: generateKeyPair
};
//# sourceMappingURL=cryptoHelper.js.map