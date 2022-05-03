to_add = ''

function loadNineImages() {
    for (i = 1; i <= 9; i++) { // Nine times
        if (i % 3 == 1) {
            to_add += `<div class="images_group">`
        }

        to_add += ` <div class="image_container"> <img src="https://picsum.photos/300/200?random=09832"> </div>`

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