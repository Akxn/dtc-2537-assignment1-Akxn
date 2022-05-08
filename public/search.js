type_g = ''
function processPokeResponse(data){
    for (i = 0; i < data.types.length ; i++){
        if (data.types[i].type.name == type_g)        {

            $("main").append("<p>" + data.id + "</p>")

            $("main").append(`<img src="${data.sprites.other["official-artwork"].front_default}" >`)
        }

    } 

}

function processPokeRegion(data) {
    console.log(data);
    for (i = 0; i < data.results.length ; i++){

            $("main").append("<div>" + data.results[i].name + "</div>")

            // $("main").append(`<img src="${data.sprites.other["official-artwork"].front_default}" >`)
    }
}

function display(type_){
    $("main").empty()
    type_g = type_
    for (i = 1; i < 899; i++){
        // for each pokemon
        $.ajax({
            type: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${i}`,
            success: processPokeResponse
        })
    }
}

function displayRegion(start, end) {

    $.ajax({
        type: "get",
        url: `https://pokeapi.co/api/v2/pokemon/?limit=${end}&offset=${start}`,
        success: function(response) {
            processPokeRegion(response)
        }
    })
}

function setup(){

    display($("#poke_type option:selected").val());

    $("#poke_type").change(() => {
        // alert($(this).attr("value"));
        poke_type = $("#poke_type option:selected").val();
        display(poke_type);
      })

    $("#region").change(() => {
        pokeregion = $("#region option:selected").val();
        $('body').empty();
        switch (pokeregion) {
            case 'kanto':
                displayRegion(1,151)
                break;
            case 'johto':
                displayRegion(152,251)
                break
            case 'hoenn':
                displayRegion(252,386)
                break
            case 'sinnoh':
                displayRegion(387,494)
                break
            case 'unova':
                displayRegion(495,649)
                break
            case 'kalos':
                displayRegion(650,721)
                break
            case 'alola':
                displayRegion(722,809)
                break
            case 'galar':
                displayRegion(810,898)
                break
            default:
                console.log('This shouldnt happen')
                break
        }
    })
}


$(document).ready(setup) 