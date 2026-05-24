
# Contact Route Planner

## Overview
Contact Route Planner is a full-stack web application in development that helps organize contacts by geographic proximity to support efficient in-person visits.

The current MVP backend allows users to store contact information, automatically geocode addresses into latitude and longitude coordinates, and group nearby contacts based on distance.

This project is being built using Flask, SQLite, GeoPy, and later a React frontend.

---

## Features

- Add contacts using a REST API
- Store contacts in SQLite database
- Automatically geocode addresses using GeoPy
- Retrieve all saved contacts
- Group nearby contacts by distance
- Basic clustering logic for route planning

---

## Tech Stack

### Backend
- Python
- Flask
- Flask-CORS
- SQLite
- GeoPy (Nominatim geocoding)

### Frontend (Planned)
- React
- Vite

# Run from scratch instructions
Run From Scratch: To run the Contact Route Planner backend from scratch, first clone the repository and navigate to the project folder. Then move into the contact-route-planner/backend directory and create a Python virtual environment using python -m venv venv. Activate the virtual environment (source venv/bin/activate for Mac/Linux/Codespaces or venv\Scripts\activate for Windows), then install the required dependencies using pip install -r requirements.txt. Once installed, start the Flask server by running python app.py. The API should launch on http://127.0.0.1:5000, and the SQLite database (contacts.db) will be created automatically if it does not already exist. Users can test the backend by sending requests to the API routes, including GET / to verify the server is running, GET /contacts to view saved contacts, GET /groups to view contacts grouped by geographic proximity, and POST /contacts to add new contact records. The backend automatically stores contact information, geocodes addresses using GeoPy into latitude and longitude coordinates, and groups nearby contacts based on distance calculations to support efficient route planning.