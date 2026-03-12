<div align="center">

# discord v14 template

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=24&pause=1000&color=8B5CF6&center=true&vCenter=true&width=700&lines=Discord.js+v14+bot+template;Slash+commands+and+custom+prefix;Optional+sharding+support;MongoDB+ready+structure" alt="Typing SVG" />

<br />

![Node.js](https://img.shields.io/badge/Node.js-111111?style=for-the-badge&logo=node.js&logoColor=339933)
![Discord.js](https://img.shields.io/badge/Discord.js-202225?style=for-the-badge&logo=discord&logoColor=5865F2)
![JavaScript](https://img.shields.io/badge/JavaScript-0F172A?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![MongoDB](https://img.shields.io/badge/MongoDB-111111?style=for-the-badge&logo=mongodb&logoColor=47A248)
![Sharding](https://img.shields.io/badge/Sharding-18181B?style=for-the-badge&logo=discord&logoColor=8B5CF6)

<br />

<img src="https://visitor-badge.laobi.icu/badge?page_id=laschebest.discord-v14-template&left_text=visitors" alt="visitor badge" />
<img src="https://img.shields.io/github/stars/laschebest/discord-v14-template?style=flat-square&color=8b5cf6" alt="stars" />
<img src="https://img.shields.io/github/last-commit/laschebest/discord-v14-template?style=flat-square&color=f59e0b" alt="last commit" />

</div>

---

## ✦ About

Discord.js v14 ile hazırlanmış, geliştiricilerin hızlı başlangıç yapabilmesi için oluşturulmuş bir bot altyapısı.

Slash command ve custom prefix sistemi birlikte düşünülmüş.
İstersen normal, istersen shard yapısıyla çalıştırabileceğin düzenli bir temel sunuyor.

---

## ✦ Features

- slash command desteği
- custom prefix command handling
- opsiyonel sharding desteği
- MongoDB desteği
- birden fazla prefix kullanabilme
- command cooldown sistemi
- düzenli klasör yapısı
- geliştirilmeye açık bot altyapısı

---

## ✦ Structure

- **Main**  
  ana bot dosyaları, `index.js`, `shard.js`, commands ve events yapısını içerir

- **Utilities**  
  database, examples, helpers ve settings tarafını içerir

---

## ✦ Setup

Projeyi kullanmadan önce:

```bash
npm install
````

Ardından şu dosyayı doldur:

```bash
Utilities/Settings/config.js
```

---

## ✦ Run

Normal başlatma:

```bash
npm run start
```

Shard ile başlatma:

```bash
npm run sharded
```

---

## ✦ Notes

* MongoDB kullanmak istersen ayarları `Utilities/Settings/config.js` içinden açabilirsin
* prefix sistemi tek bir karaktere bağlı değil, birden fazla prefix mantığı destekleniyor
* altyapı hem slash komut hem klasik prefix mantığıyla kullanım için hazırlanmış
* shard kullanımı opsiyonel

---

## ✦ Author
- [GitHub](https://github.com/laschebest)
- [Instagram](https://instagram.com/yunussmichaelson)
- [X (Twitter)](https://x.com/yunusmichaelson)
