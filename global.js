// Inject node globals into React Native global scope.
global.Buffer = require('buffer').Buffer;
global.process = require('process');
global.btoa = global.btoa || require('Base64').btoa;
global.crypto = require('react-native-crypto');
