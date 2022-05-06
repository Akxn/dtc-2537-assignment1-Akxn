to_add = ''

function processPokemonResponse(data) {
    // console.log(data)
    to_add += `<div class="image_container">
    <a href= "/profile/${data.id}">
    <img src="${data.sprites.other["official-artwork"].front_default}"> </a>
    <div> ${data.name} </div>
    <div> ${data.base_experience}</div>
    </div>`

}
async function loadNineImages() {
    for (i = 1; i <= 9; i++) { // Nine times
        if (i % 3 == 1) {
            to_add += `<div class="images_group">`
        }

        x = Math.floor(Math.random() * 898) + 1
        await $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${x}/`,
            success: processPokemonResponse
        })
        if (i % 3 == 0) {
            to_add += `</div>`
        }
    }
    jQuery("main").html(to_add)
}

function setup() {
    loadNineImages();
}

$(document).ready(setup)