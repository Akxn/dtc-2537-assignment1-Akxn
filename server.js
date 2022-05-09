const express = require('express')
const app = express()
app.set('view engine', 'ejs');
const https = require('https');

app.listen(5000, function (err) {
    if (err)
        console.log(err);
})

app.get('/search', function (req, res) {
    res.sendFile(__dirname + "/public/search.html");
})

app.get('/profile/:id', function (req, res) {
    // console.log(req);

    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`


    data = " "
    https.get(url, function (https_res) {
        https_res.on("data", function (chunk) {
            data += chunk
        })

        https_res.on("end", function () {
            data = JSON.parse(data)

            tmp = data.stats.filter((obj_) => {
                return obj_.stat.name == "hp"
            }).map(
                (obj_2) => {
                    return obj_2.base_stat
                }
            )

            attack = data.stats.filter((obj_) => {
                return obj_.stat.name == "attack"
            }).map((obj2) => {
                return obj2.base_stat
            })

            defense = data.stats.filter((obj_) => {
                return obj_.stat.name == "defense"
            }).map((obj2)=>{
                return obj2.base_stat
            })

            special_attack = data.stats.filter((obj_) => {
                return obj_.stat.name == "special-attack"
            }).map((obj2)=>{
                return obj2.base_stat
            })

            speed = data.stats.filter((obj_) => {
                return obj_.stat.name == "speed"
            }).map((obj2)=>{
                return obj2.base_stat
            })

            res.render("profile.ejs", {
                "id": req.params.id,
                "name": data.name,
                "hp": tmp[0],
                "attack": attack,
                "defense": defense,
                "special_attack": special_attack,
                "speed": speed,
            });
        })
    });

})

app.use(express.static('./public'));

