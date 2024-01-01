# firebase/firebase_utils.py
import firebase_admin
from firebase_admin import credentials, db, auth

_firebase_initialized = False

def initialize_firebase_admin():
    global _firebase_initialized
    if not _firebase_initialized:
        try:
            cred = credentials.Certificate('../../Key/simplestyle-db-firebase-adminsdk-gk5hm-2314dc4618.json')
            firebase_admin.initialize_app(cred, {
                'databaseURL': 'https://simplestyle-db-default-rtdb.firebaseio.com/',
                'authDomain': 'simplestyle-db.firebaseapp.com',
            })
            _firebase_initialized = True
            print("Firebase Admin SDK initialized.")
        except Exception as e:
            print(f"Error initializing Firebase Admin SDK: {e}")

initialize_firebase_admin()

db_ref = db.reference()
