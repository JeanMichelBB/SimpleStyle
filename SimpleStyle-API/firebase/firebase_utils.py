# firebase/firebase_utils.py
import os
import firebase_admin
from firebase_admin import credentials, db, auth

_firebase_initialized = False

def initialize_firebase_admin():
    global _firebase_initialized
    if not _firebase_initialized:
        try:
            # Construct the path to the service account key file dynamically
            current_dir = os.path.dirname(__file__)
            key_file_path = os.path.join(current_dir, 'simplestyle-db-firebase-adminsdk-gk5hm-2314dc4618.json')

            cred = credentials.Certificate(key_file_path)
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
