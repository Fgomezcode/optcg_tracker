document.addEventListener("DOMContentLoaded", function() {
    // this function runs when the DOM is ready, i.e. when the document has been parsed
    fetch('static/Decks/Cards.json')
  .then((response) => response.json())
  .then((data) => store_card_json(data));

    create_collection();
});

function store_card_json(cards){
    if(Object.keys(localStorage).includes('CardData') === false ){
        localStorage.setItem('CardData', JSON.stringify(cards) )
    }
}

function add_to_local_data(id, card){
    let cards = JSON.parse(localStorage['CardData'])
    console.log(id)
    cards[id]['collected'] = 'true'
    card['collected'] = 'true'

    localStorage.setItem('CardData', JSON.stringify(cards))
    localStorage.setItem(id, JSON.stringify(card));

    let img = document.getElementById(id+"-image")
    img.style.opacity = '1';

    let rem  = document.getElementById('rem-btn-'+ id);
    rem.removeAttribute('disabled');

    let add  = document.getElementById('add-btn-'+ id);
    add.setAttribute('disabled', '')
}

function remove_from_local_data(id ){
    let cards = JSON.parse(localStorage['CardData']);
    cards[id]['collected'] = 'false'
    localStorage.setItem('CardData', JSON.stringify(cards))

    let img = document.getElementById(id+"-image")
    img.style.opacity = '.5';

    let rem  = document.getElementById('rem-btn-' + id);
    rem.setAttribute('disabled', '')

    let add  = document.getElementById('add-btn-' + id);
    add.removeAttribute('disabled');
    localStorage.removeItem(id);
}

function create_card_display(deck){ // rename this function
    let code = deck
    let parent = document.getElementById('cards-page-display')
    let cards = JSON.parse(localStorage['CardData']);
    let keys = Object.keys(cards)
    const row = document.createElement('div');
    row.setAttribute('class',"row");
    if(parent != null){
        for(let key of keys){
            if(cards[key]['deck'] === code || cards[key]['name'].includes(code)){
                let title = document.createElement('h1')
                title.setAttribute('id', 'felipe')
                row.append(title)
                let x = cards[key];
                let card = create_display_card(x, key, cards)
                parent.append(card)
                document.getElementById('p-head').innerHTML = `Deck: ${code}`
            }
        }
    }

}

function create_display_card(x, i, cards){ // card in
    let card = document.createElement('div');
            card.setAttribute('id', `${x['card_code']}`);
            card.setAttribute('class', 'card collected col-sm-2 col-lg-2');
    let card_header = document.createElement('div');
        card_header.setAttribute('class', 'card-header');
        card_header.innerText = `${x['card_code']}  ${x['name']}`;
    let card_image_div = document.createElement('div');
        card_image_div.setAttribute('class', 'card-image')

    let card_image = document.createElement('img');

        card_image.setAttribute('id', `${i}-image`)
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

    let add_card_button = document.createElement('button')
        add_card_button.innerText = 'ADD'
        add_card_button.setAttribute('class', 'btn btn-success')
        add_card_button.setAttribute('type', 'button')
        add_card_button.setAttribute('id', `add-btn-${i}`)
        add_card_button.setAttribute('onclick', `add_to_local_data( '${i}', ${JSON.stringify(cards[i])})`)

    let remove_card_button = document.createElement('button')
        remove_card_button.innerText = 'REMOVE'
        remove_card_button.setAttribute('class', 'btn btn-danger')
        remove_card_button.setAttribute('id', `rem-btn-${i}`)
        remove_card_button.setAttribute('name', 'collection')
        remove_card_button.setAttribute('onclick', ` remove_from_local_data("${i}" )`)
        add_card_button.setAttribute('name', 'collection')
        remove_card_button.setAttribute('type', 'button')

    if(x['collected'] === 'false') {
        card_image.style.opacity = '.5';
        remove_card_button.setAttribute('disabled', '')
    }else{
        add_card_button.setAttribute('disabled','')
    }

    card_button_form.append(add_card_button)
    card_button_form.append(remove_card_button)
    card_button_col.append(card_button_form)
    card_row.append(card_button_col)
    card_footer.append(card_row)

    card.append(card_header);
    card.append(card_image_div)
    card.append(card_footer)

    return card
}

function create_collection(){
    let parent = document.getElementById('collection-display')
    let collection_keys = Object.keys(localStorage);
    collection_keys.sort()
    const row = document.createElement('div');
    row.setAttribute('class',"row");
    if(parent != null){
        for (let key of collection_keys) {
            if (key !== 'CardData') {
                let x = JSON.parse(localStorage.getItem(key));
                let card = create_card(x, key)
                parent.append(card)
            }
        }
    }
}

function create_card(x, i){
    let card = document.createElement('div');
            card.setAttribute('id', `${i}`);
            card.setAttribute('class', 'card collected col-sm-3 col-lg-3 ');
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
        card_button.setAttribute('onclick', `collection_remove_from_local_data("${i}")`)
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

function collection_remove_from_local_data(id){ // THIS IS USED DESPITE IT SAYING ITS NOT BEING USED
    let cards = JSON.parse(localStorage['CardData']);
    console.log(id)
    cards[id]['collected'] = 'false'
    localStorage.setItem('CardData', JSON.stringify(cards))
    let card  = document.getElementById(id);

    localStorage.removeItem(id);
    card.style.display = 'none'
}

function get_local_data(){
    let x = document.getElementById('return-current-collection')
    x.value = Object.keys(localStorage)
}


