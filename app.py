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


@app.route('/collection', methods=['POST', 'GET'])
def collection():
    results = {}
    if request.method == 'POST':
        current_collection = request.form
        card_keys = current_collection['collection'].split(',')
        card_keys.sort()
    try:
        collected(card_keys)
        cards = get_cards()
        for i in card_keys:
            print(i)
            if cards[i]['collected'] == 'true':
                results[i] = cards[i]
    except:
        results = {}
    print(results)

    if request.method == 'GET':
        cards = get_cards()
        for card in cards:
            if cards[card]['collected'] == 'true':
                results[card] = cards[card]


    return render_template('collection.html', cards=results)


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
