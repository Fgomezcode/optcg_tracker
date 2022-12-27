from flask import Flask, render_template, request
import json

app = Flask(__name__)


def collected(keys):
    cards = get_cards()
    for id in cards:
        js = 'static/Decks/Cards.json'
        with open(js, "r", encoding='utf-8') as jsonFile:
            cards = json.load(jsonFile)

        if id in keys:
            cards[id]["collected"] = "true"
        else:
            cards[id]["collected"] = "false"
        with open(js, "w", encoding='utf-8') as jsonFile:
            json.dump(cards, jsonFile, ensure_ascii=False, indent=4)


def get_cards():
    js = 'static/Decks/Cards.json'
    f = json.load(open(js, 'r', encoding='utf-8'))
    return f


@app.route('/collection')
def collection():

    if request.method == 'POST':
        return render_template('collection.html')

    if request.method == 'GET':
        return render_template('collection.html')


# ========================================
@app.route('/', methods=['POST', 'GET'])
def home():  # put application's code here
    if request.method == 'GET':
        print('get')

    if request.method == 'POST':

        current_collection = request.form
        card_keys = current_collection['collection'].split(',')
        card_keys.sort()
    try:
        cards = get_cards()
        results = {}
        for i in card_keys:
            results[i] = cards[i]

    except:
        results = {}
        return render_template('base.html', cards=get_cards())


# ========================================
@app.route('/cards', methods=['POST', 'GET'])
def load_cards():
    if request.method == 'GET':
        return render_template('base.html')

    if request.method == 'POST':
        search_query = request.form

    cards_data = get_cards()

    results = {}

    if 'query' in search_query.keys():
        if search_query['query'] != '':
            deck_search = (search_query['query'])
            for card in cards_data:
                if deck_search in card:
                    results[card] = cards_data[card]
            return render_template('cards.html', cards=results)

    if 'search_bar' in search_query.keys():
        if search_query['search_bar'] != '':
            search_bar = (search_query['search_bar'])
            for key, value in cards_data.items():
                if search_bar.capitalize() in value['name']:
                    results[key] = value
            return render_template('cards.html', cards=results)

    return render_template('cards.html', cards=cards_data)


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)



'''


<!--
<h1>COLLECTION</h1>

    <div class="row">
    {% for i in cards.keys()%}
        <div id="{{i}}" class=" card collected col-sm-4 col-lg-2">
            <div class="card-header">
                {{cards[i]["card_code"]}}
                {{cards[i]["name"]}}
            </div>
            <div class="card-image">
                <img class="img-thumbnail popover-image" data-bs-toggle="modal" data-bs-target="#{{i}}-Modal" src="static/Decks/{{cards[i]['deck']}}/CardImages/{{cards[i]['images']}}" alt="{{i}}">
            </div>
            <div class="card-footer">
                <div class="row">
                    <div class="col text-center">

                          <form action="/collection" method="post">
                          <button onclick="collection_remove_from_local_data('{{i}}')" id="collection-button" class="btn btn-danger" name="collection"  >REMOVE</button>
                          </form>
                    </div>
                </div>
            
        </div>

 Modal
    <div class="modal fade" id="{{i}}-Modal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title" id="ModalLabel">{{cards[i]["card_code"]}} {{cards[i]["name"]}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
                <img class="img-thumbnail popover-image" data-bs-toggle="modal" data-bs-target="#exampleModal"
                     src="static/Decks/{{cards[i]['deck']}}/CardImages/{{cards[i]['images']}}" alt="">
                <div class="card-text">
                    <p>{{cards[i]["text"]}}</p>
                </div>
          </div>

            <div class="card-footer">
                <div class="row">
                    <div class="col text-center">
                        <
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    {% endfor %}
    </div>
-->'''