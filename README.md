# STQ exchanger

## Install

## Troubleshooting
* install react-native-aes from https://github.com/StoriqaTeam/react-native-aes.git

* android не может слушать сервер на localhost поэтому портируем его (ngrok) и правим host в src/relay/relayEnvironment.js

* react-native-camera не будет работать без FaceDetector (GoogleMobileVision.h file not found):
1. `rm -rf node_modules/react-native-camera/ios/FaceDetector`
2. `cp node_modules/react-native-camera/postinstall_project/projectWithoutFaceDetection.pbxproj node_modules/react-native-camera/ios/RNCamera.xcodeproj/project.pbxproj`

## Docs

### public / private keys
* приватные ключи храним в keystore
* ключем к значению приватного ключа является публичный ключ
* приватный значение приватного ключа в keystore содержит:
    * сам зашифрованный ключ(aes)
    * соль от генерации ключа по pin коду
    * iv