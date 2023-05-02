import time
import os
from flask_mysqldb import MySQL
# import MySQLdb.cursors
from flask import Flask, jsonify, request

app = Flask(__name__)
mysql = MySQL(app)

app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')

@app.route('/fetch_db')
def fetch_db():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM requestsToDate')
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)

@app.route('/requests_to_date')
def requests_to_date():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT SUM(size) FROM requestsToDate')
    result = cursor.fetchone()
    return jsonify(result)

@app.route('/send_to_db', methods=['POST'])
def send_to_db():
    print("sending to database")
    packet_size = request.json["packetSize"]
    print(packet_size)
    cursor = mysql.connection.cursor()
    cursor.execute('INSERT INTO requestsToDate (size) VALUES (%s)', (packet_size,))
    cursor.connection.commit()
    cursor.close()
    return jsonify("Successfully posted to database")

@app.route('/time')
def get_current_time():
    print("fetching current time")
    current_time = time.strftime("%I:%M %p")
    return {'time': current_time}


# @app.route('/socket_test')
# def socket_test():
