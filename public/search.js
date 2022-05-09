type_g = ''
storage = ''
add_to = ''
function processPokeResponse(data) {
    for (i = 0; i < data.types.length; i++) {
        if (data.types[i].type.name == type_g) {

            // $("main").append("<p>" + data.id + "</p>")

            $("main").append(`
                <div class="card">
                <a href="../profile/${data.id}"><img src="${data.sprites.other["official-artwork"].front_default}">${data.name}</a>
                </div>`)
        }
    }
}

function searchPokemonName() {
    searchreq = $("#pokemonName").val().toLowerCase()
    $.ajax({
        type: "get",
        url: `https://pokeapi.co/api/v2/pokemon/${searchreq}`,
        success: singlePokemon
    })
    $("main").empty()
}

function singlePokemon(data) {
    $("main").append(`
        <div class="card">
            <div> ${data.id}</div>
            <img src="${data.sprites.other["official-artwork"].front_default}" >
        </div>
    `)
    getHistory(data);
}

function getHistory(data) {
        $('.history').append(`
                <div>
                    <a href="../profile/${data.id}">${data.name}</a>
                </div>
                `)
}

function processPokeRegion(data) {
    storage = data.results;
    for (i = 0; i < data.results.length; i++) {
        // $("main").append(`<div>${data.results[i].name}</div>`)
        $("main").append(`
        <div class="card">
        <a href= "/profile/${getID(data.results[i].url)}">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getID(data.results[i].url)}.png">
        <div>${data.results[i].name}</div></a>
        </div>`)
    }
}

function getID(url) {
    return url.split('pokemon/')[1].split('/')[0]
}

function sortProcess() {
    for (i = 0; i < storage.length; i++) {
        // $("main").append(`<div>${storage[i].name}</div>`)
        $("main").append(`
        <div class="card">
        <a href= "/profile/${getID(storage[i].url)}">
        <div>${storage[i].name}</div>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getID(storage[i].url)}.png"></a>
        </div>`)
    }
}

function display(type_) {
    $("main").empty()
    type_g = type_
    for (i = 1; i < 899; i++) {
        // for each pokemon
        $.ajax({
            type: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${i}`,
            success: processPokeResponse
        })
    }
}

function displayRegion(start, end) {
    $("main").empty()
    $.ajax({
        type: "get",
        url: `https://pokeapi.co/api/v2/pokemon/?limit=${end}&offset=${start}`,
        success: processPokeRegion
    })
}


function sortByName() {
    console.log(storage)
    searchType = $('#search-sort').val();
    if (searchType === 'name') {
        storage.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        })
        // $('#poke-container').empty()
    }
    if (searchType === 'id') {
        storage.sort((a, b) => {
            return getID(a.url) - getID(b.url)
        })
        // $('#poke-container').empty()
    }
    console.log(storage)
    $('main').empty()
    sortProcess()
}

function setup() {

    display($("#poke_type option:selected").val());

    $("#poke_type").change(() => {
        // alert($(this).attr("value"));
        poke_type = $("#poke_type option:selected").val();
        display(poke_type);
    })

    $("#region").change(() => {
        pokeregion = $("#region option:selected").val();
        switch (pokeregion) {
            case 'kanto':
                displayRegion(1, 151)
                break;
            case 'johto':
                displayRegion(152, 251)
                break
            case 'hoenn':
                displayRegion(252, 386)
                break
            case 'sinnoh':
                displayRegion(387, 494)
                break
            case 'unova':
                displayRegion(495, 649)
                break
            case 'kalos':
                displayRegion(650, 721)
                break
            case 'alola':
                displayRegion(722, 809)
                break
            case 'galar':
                displayRegion(810, 898)
                break
            default:
                console.log('This shouldnt happen')
                break
        }
    })

    $("#search-sort").change(() => {
        sortByName();
    })
    $("#searchPokemon").click(() => {
        searchPokemonName();
    })
}


$(document).ready(setup) 