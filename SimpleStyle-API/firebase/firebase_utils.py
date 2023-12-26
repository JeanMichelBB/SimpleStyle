# firebase/firebase_utils.py
import firebase_admin
from firebase_admin import credentials, db, auth

cred = credentials.Certificate('../../Key/simplestyle-db-firebase-adminsdk-gk5hm-2314dc4618.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://simplestyle-db-default-rtdb.firebaseio.com/',
    'authDomain': 'simplestyle-db.firebaseapp.com',
    })
    
# Reference to the root of your database 
db_ref = db.reference()

