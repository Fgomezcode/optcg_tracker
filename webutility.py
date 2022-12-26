import sqlite3

'''
Create Standard Card Database
'''
def _create_db(db: str):
    db_name = db
    connection = sqlite3.connect(f'{db}.db')
    cursor = connection.cursor()

    cursor.execute("""CREATE TABLE IF NOT EXISTS Keywords(CardCode text NOT NULL PRIMARY KEY,
                                            CardName text NOT NULL,
                                            Rarity text NOT NULL,
                                            Images text NOT NULL,
                                            Type text)""", )
    connection.close()



def push_cards_to_database(loc):
    with open(f'Decks/{loc}/{loc}CardInfo.txt') as f:
        x = f.readlines()

    connection = sqlite3.connect(f'{loc}.db')
    cursor = connection.cursor()

    for info in x:
        temp = info.split(' : ')

        data = temp[1].replace('[', '').replace(']', '').replace('\'', '')
        data = data.strip()
        data = data.split(', ')
        temp = data[3].strip()
        temp = temp.replace('$', ' ')
        temp = temp.replace('\'', '')
        temp = temp.strip()
        card_code = info[:8]
        card_name = data[0].replace('\'', '')
        card_rarity = data[2].replace('\'', '')
        card_images = temp
        card_type = data[1].replace('\'', '')

        cursor.execute("""INSERT INTO  Keywords VALUES (?,?,?,?,?)""", (card_code, card_name, card_rarity, card_images, card_type))

    connection.commit()
    connection.close()

