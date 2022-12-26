


function add_to_local_data(id, card,dict){
    let ld = localStorage
    ld.setItem(id, card);

    let img = document.getElementById(id+"-image")
    img.style.opacity = 1;

    let rem  = document.getElementById('rem-btn-'+ id);
    rem.removeAttribute('disabled');

    let add  = document.getElementById('add-btn-'+ id);
    add.setAttribute('disabled', '')
}

function remove_from_local_data(id){
    let ld = localStorage
    ld.removeItem(id);

    let img = document.getElementById(id+"-image")
    img.style.opacity = .5;

    let rem  = document.getElementById('rem-btn-' + id);
    rem.setAttribute('disabled', '')

    let add  = document.getElementById('add-btn-' + id);
    add.removeAttribute('disabled');
}

function get_local_data(){
    document.getElementById('collection-button').value = Object.keys(localStorage);

}


function collection_remove_from_local_data(id){
    let ld = localStorage
    ld.removeItem(id);

    let card  = document.getElementById(id);
    card.style.display = 'none'

}