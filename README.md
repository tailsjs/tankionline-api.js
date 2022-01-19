# TankiOnline-API.js
* Библиотека для использования API игры Танки Онлайн и 3DTank (китайской версии ТО).

## Пример
### Информация о пользователе
```js
const { Tanki } = require("tankionline-api.js");

const user = new Tanki({
    nick: "tailsjs",
    language: "ru",
    china: false
});

console.log(await user.getFullUser()); // Full user info
console.log(await user.getCleanUser()); // User without objects
console.log(await user.getDronesInfo());
console.log(await user.getHullsInfo());
console.log(await user.getPaintsInfo());
console.log(await user.getSuppliesInfo());
console.log(await user.getTurretsInfo());
console.log(await user.getModulesInfo());
console.log(await user.getModesInfo())
```
### Информация о серверах игры
```js
const { Servers } = require("tankionline-api.js");

const servers = await new Servers();

console.log(servers)
```
### Топы
```js
const { Top } = require("tankionline-api.js");

const top = await new Top({
    topType: "score",
    china: false
})

console.log(top)
```
