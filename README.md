# STQ exchanger

## Install

## Troubleshooting
* install react-native-aes from https://github.com/StoriqaTeam/react-native-aes.git

## Docs

### public / private keys
* приватные ключи храним в keystore
* ключем к значению приватного ключа является публичный ключ
* приватный значение приватного ключа в keystore содержит:
    * сам зашифрованный ключ(aes)
    * соль от генерации ключа по pin коду
    * iv