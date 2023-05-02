import sqlite3

connection = sqlite3.connect('database.db')


with open('./schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO trafficData (packet_description, size) VALUES (?, ?)",
            ('TCP', 225077)
            )

cur.execute("INSERT INTO trafficData (packet_description, size) VALUES (?, ?)",
            ('TCP', 346880)
            )

connection.commit()
connection.close()
