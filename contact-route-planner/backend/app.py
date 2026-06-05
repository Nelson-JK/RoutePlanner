from flask import Flask, jsonify, request
from flask_cors import CORS
from database import (
    create_table,
    add_contact,
    get_all_contacts,
    update_contact,
    delete_contact
)
from geocode import geocode_address
from grouping import group_contacts

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

create_table()


@app.route("/")
def home():
    return jsonify({"message": "Contact Route Planner API is running"})


@app.route("/contacts", methods=["POST"])
def create_contact():
    data = request.get_json()

    name = data.get("name")
    street = data.get("street")
    city = data.get("city")
    state = data.get("state")
    zip_code = data.get("zip")

    latitude, longitude = geocode_address(street, city, state, zip_code)

    add_contact(name, street, city, state, zip_code, latitude, longitude)

    return jsonify({"message": "Contact added successfully"}), 201


@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = get_all_contacts()
    return jsonify(contacts)


@app.route("/contacts/<int:contact_id>", methods=["PUT"])
def edit_contact(contact_id):
    data = request.get_json()

    name = data.get("name")
    street = data.get("street")
    city = data.get("city")
    state = data.get("state")
    zip_code = data.get("zip")

    latitude, longitude = geocode_address(street, city, state, zip_code)

    updated_rows = update_contact(
        contact_id,
        name,
        street,
        city,
        state,
        zip_code,
        latitude,
        longitude
    )

    if updated_rows == 0:
        return jsonify({"message": "Contact not found"}), 404

    return jsonify({"message": "Contact updated successfully"}), 200


@app.route("/contacts/<int:contact_id>", methods=["DELETE"])
def remove_contact(contact_id):
    deleted_rows = delete_contact(contact_id)

    if deleted_rows == 0:
        return jsonify({"message": "Contact not found"}), 404

    return jsonify({"message": "Contact deleted successfully"}), 200


@app.route("/groups", methods=["GET"])
def get_groups():
    contacts = get_all_contacts()

    contacts_with_location = [
        contact for contact in contacts
        if contact["latitude"] is not None and contact["longitude"] is not None
    ]

    groups = group_contacts(contacts_with_location)

    return jsonify(groups)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)