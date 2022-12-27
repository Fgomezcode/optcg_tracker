from flask import Flask, render_template, request
import json

app = Flask(__name__)

def get_cards():
    js = 'static/Decks/Cards.json'
    f = json.load(open(js, 'r', encoding='utf-8'))
    return f

@app.route('/collection', methods=['POST', 'GET'])
def collection():
    if request.method == 'POST':
        return render_template('collection.html')

    if request.method == 'GET':
        return render_template('collection.html')

# ========================================
@app.route('/', methods=['POST', 'GET'])
def home():  # put application's code here
    if request.method == 'GET':
        current_collection = request.form
        print(current_collection)
        return render_template('base.html', cards=get_cards())

    if request.method == 'POST':
        current_collection = request.form
        print(current_collection)
        return render_template('base.html', cards=get_cards())

# ========================================
@app.route('/cards', methods=['POST', 'GET'])
def load_cards():
    search_query = None
    cards_in_collection = None
    if request.method == 'GET':
        search = request.form
        try:
            data= search['query']
            print(data,search)
        except KeyError:
            data = search['search_bar'].capitalize()

        return render_template('cards.html', deck=data)

    if request.method == 'POST':
        search = request.form
        try:
            data = search['query']
            print(data,search)
        except KeyError:
            data = search['search_bar'].capitalize()

        return render_template('cards.html', deck=data)



if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)


