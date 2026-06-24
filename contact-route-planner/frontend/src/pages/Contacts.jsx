import { useEffect, useState } from "react";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: ""
  });

  const API_URL = "/api/contacts";

  const loadContacts = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setContacts(data);
        setError("");
      })
      .catch(() => {
        setError("Unable to load contacts.");
      });
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter a contact name.");
      setMessage("");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error();
      }

      setMessage("Contact added successfully.");
      setError("");

      setFormData({
        name: "",
        street: "",
        city: "",
        state: "",
        zip: ""
      });

      loadContacts();
    } catch {
      setError("Unable to add contact.");
      setMessage("");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error();
      }

      setMessage("Contact deleted successfully.");
      setError("");

      loadContacts();
    } catch {
      setError("Unable to delete contact.");
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Contacts</h1>

      {message && (
        <p className="success">
          {message}
        </p>
      )}

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      <div className="two-column">
        <div className="card">
          <h2>Add Contact</h2>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />

            <br />

            <input
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
            />

            <br />

            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />

            <br />

            <input
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
            />

            <br />

            <input
              name="zip"
              placeholder="Zip"
              value={formData.zip}
              onChange={handleChange}
            />

            <br />
            <br />

            <button type="submit">
              Add Contact
            </button>
          </form>
        </div>

        <div className="card">
          <h2>Saved Contacts</h2>

          {contacts.length === 0 ? (
            <p>No contacts found.</p>
          ) : (
            contacts.map((contact) => (
              <div
                key={contact._id}
                className="card"
              >
                <strong>{contact.name}</strong>

                <p>
                  {contact.street}
                  <br />
                  {contact.city}, {contact.state} {contact.zip}
                </p>

                <button
                  onClick={() =>
                    handleDelete(contact._id)
                  }
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Contacts;