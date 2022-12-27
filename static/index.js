document.addEventListener("DOMContentLoaded", function() {
    // this function runs when the DOM is ready, i.e. when the document has been parsed
    fetch('static/Decks/Cards.json')
  .then((response) => response.json())
  .then((data) => store_card_json(data));
});

function store_card_json(cards){
    if(Object.keys(localStorage).includes('CardData') === false ){
        localStorage.setItem('CardData', JSON.stringify(cards) )
    }
}


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

//display info when page finishes loading
document.addEventListener("DOMContentLoaded", function(){
    let parent = document.getElementById('collection-display')
    let collection_keys = Object.keys(localStorage);

    const row = document.createElement('div');
    row.setAttribute('class',"row");
    for(let key of collection_keys ){
        if(key !== 'CardData'){
            let x = JSON.parse(localStorage.getItem(key));
            card = create_card(x, key)
            parent.append(card)
        }
    }
});

function create_card(x, i  ){
    let card = document.createElement('div');
            card.setAttribute('id', `${x['card_code']}`);
            card.setAttribute('class', 'card collected col-sm-4 col-lg-2');
    let card_header = document.createElement('div');
        card_header.setAttribute('class', 'card-header');
        card_header.innerText = `${x['card_code']}  ${x['name']}`;
    let card_image_div = document.createElement('div');
        card_image_div.setAttribute('class', 'card-image')
    let card_image = document.createElement('img');
        card_image.setAttribute('class', 'img-thumbnail popover-image');
        card_image.setAttribute('data-bs-toggle', 'modal');
        card_image.setAttribute('data-bs-target',`#${i}-Modal`)
        card_image.setAttribute('alt', `image of ${x['name']}`)
        card_image.setAttribute('src', `static/Decks/${x["deck"]}/CardImages/${x["images"]}`)
    card_image_div.append(card_image)
    let card_footer = document.createElement('div')
        card_footer.setAttribute('class', 'card-footer')
    let card_row = document.createElement('div')
        card_row.setAttribute('class', 'row')
    let card_button_col = document.createElement('div')
        card_button_col.setAttribute('class', 'col text-center')
    let card_button_form = document.createElement('form')
    let card_button = document.createElement('button')
        card_button.setAttribute('type', 'button')
        card_button.setAttribute('onclick', `collection_remove_from_local_data("${x['card_code']}")`)
        card_button.setAttribute('id', 'collection-button')
        card_button.setAttribute('class', 'btn btn-danger')
        card_button.setAttribute('name', 'collection')
        card_button.innerText = 'REMOVE'
    //-------
    card_button_form.append(card_button)
    card_button_col.append(card_button_form)
    card_row.append(card_button_col)
    card_footer.append(card_row)
    //
    card.append(card_header);
    card.append(card_image_div)
    card.append(card_footer)

    return card
}

function collection_remove_from_local_data(id){
    console.log(id)
    let ld = localStorage
    ld.removeItem(id);

    let card  = document.getElementById(id);
    card.style.display = 'none'
}


