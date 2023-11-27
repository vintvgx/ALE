

import mysql.connector

database = mysql.connector.connect(
    host="localhost",
    user = "root",
    passwd = "splinta8",
)

# prepare a cursor object
cursorObject = database.cursor()

# Create a database 
cursorObject.execute("CREATE DATABASE comm_db")

print("Database created")