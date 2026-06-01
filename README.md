# Contact Route Planner

## Overview

Contact Route Planner is a full-stack web application in development that helps organize contacts by geographic proximity to support efficient in-person visits and route planning.

The current MVP backend provides full CRUD (Create, Read, Update, Delete) functionality for contact management. Users can store contact information, automatically geocode addresses into latitude and longitude coordinates, update existing records, delete contacts, and group nearby contacts based on geographic distance.

This project is being built using Flask, SQLite, GeoPy, and a React frontend.

---

## Features

* Create new contacts using a REST API
* Retrieve all saved contacts
* Update existing contact information
* Delete contacts from the database
* Store contacts in an SQLite database
* Automatically geocode addresses using GeoPy
* Group nearby contacts based on geographic distance
* Basic clustering logic for route planning

---

## Tech Stack

### Backend

* Python
* Flask
* Flask-CORS
* SQLite
* GeoPy (Nominatim Geocoding)

### Frontend

* React
* Vite

---

## Run From Scratch Instructions

To run the Contact Route Planner application from scratch, first clone the repository and navigate to the project folder. Move into the `contact-route-planner/backend` directory and create a Python virtual environment using `python -m venv venv` if one does not already exist.

### Activate the Virtual Environment

Mac/Linux/GitHub Codespaces:

```bash
source venv/bin/activate
```

Windows:

```cmd
venv\Scripts\activate
```

After activation, the terminal prompt should display `(venv)` at the beginning, indicating that the virtual environment is active.

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Start the Backend Server

```bash
python app.py
```

The API will launch at `http://127.0.0.1:5000`, and the SQLite database (`contacts.db`) will be created automatically if it does not already exist.

### API Endpoints

* `GET /` — Verify the API is running
* `GET /contacts` — Retrieve all contacts
* `POST /contacts` — Create a new contact
* `PUT /contacts/<id>` — Update an existing contact
* `DELETE /contacts/<id>` — Delete a contact
* `GET /groups` — Retrieve grouped contacts

The application automatically stores contact information in an SQLite database, geocodes addresses into latitude and longitude coordinates using GeoPy, and groups nearby contacts based on geographic proximity to support route planning and future route optimization features.

## Example of Put
curl -X PUT http://localhost:5000/contacts/1 \
-H "Content-Type: application/json" \
-d '{
"name":"Updated User",
"street":"1 Apple Park Way",
"city":"Cupertino",
"state":"CA",
"zip":"95014"
}'

## Verify 
curl http://localhost:5000/contacts

## Example of READ
curl http://localhost:5000/contacts


## Example of DELETE
curl -X DELETE http://localhost:5000/contacts/1
