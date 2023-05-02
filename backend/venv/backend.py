import time
import socket
import sqlite3
from flask import Flask, jsonify, request

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/get_database_rows')
def get_database_rows():
    conn = get_db_connection()
    rows = conn.execute('SELECT * FROM trafficData').fetchall()
    posts = [dict(row) for row in rows]

    print(posts)
    conn.close()
    return jsonify(posts)

@app.route('/time')
def get_current_time():
    print("hello")
    current_time = time.strftime("%I:%M %p")
    return {'time': current_time}

@app.route('/send_to_db', methods=['POST'])
def send_to_db():
    print("sending to database")
    packet_size = request.json["packetSize"]
    print(packet_size)
    conn = get_db_connection()
    conn.execute('INSERT INTO trafficData (size) VALUES (?)', (packet_size,))
    conn.commit()
    return "Successfully posted to database"



# @app.route('/socket_test')
# def socket_test():
