# STQ exchanger

## Prerequisites
* Install `crypto` for RN: https://github.com/mvayngrib/react-native-crypto.

## Troubleshooting

### Ngrok
* android не может слушать сервер на localhost поэтому портируем его (ngrok) и правим host в src/relay/relayEnvironment.js

### web3js
гайд как стартануть проект с web3js с нуля https://gist.github.com/dougbacelar/29e60920d8fa1982535247563eb63766

### react-native-aes
* install react-native-aes from https://github.com/StoriqaTeam/react-native-aes.git#bugfix/pbkdf2-length

### react-native-camera
##### IOS
* react-native-camera не будет работать без FaceDetector (GoogleMobileVision.h file not found):
1. `rm -rf node_modules/react-native-camera/ios/FaceDetector`
2. `cp node_modules/react-native-camera/postinstall_project/projectWithoutFaceDetection.pbxproj node_modules/react-native-camera/ios/RNCamera.xcodeproj/project.pbxproj`

##### Android

* юзаем мануал установку

* если ошибка версии build tools делаем upgrade в android/build.gradle
```
subprojects {
    afterEvaluate {project ->
        if (project.hasProperty("android")) {
            android {
                compileSdkVersion 25
                buildToolsVersion '25.0.2'
            }
        }
    }
}
```

* для устранения Dex ошибки:
1. добавляем в файл android/app/build.gradle в android.defaultConfig `multiDexEnabled true`
2. в android/app/build.gradle в dependecies добавить `compile 'com.android.support:multidex:1.0.1'`

* support ошибка: в android/build.gradle в allprojects.repositories добавить
```
maven { 
    url 'https://maven.google.com' 
}
```


## Docs

### public / private keys
* приватные ключи храним в keystore
* ключем к значению приватного ключа является публичный ключ
* приватный значение приватного ключа в keystore содержит:
    * сам зашифрованный ключ(aes)
    * соль от генерации ключа по pin коду
    * iv