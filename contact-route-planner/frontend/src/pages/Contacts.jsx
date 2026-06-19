import { useEffect, useState } from "react";

function Contacts() {
  const [contacts, setContacts] = useState([]);
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
      .then((data) => setContacts(data))
      .catch((error) => console.error("Error loading contacts:", error));
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

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    setFormData({
      name: "",
      street: "",
      city: "",
      state: "",
      zip: ""
    });

    loadContacts();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    loadContacts();
  };

  return (
    <div>
      <h1>Contacts</h1>

      <h2>Add Contact</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <br /><br />

        <input name="street" placeholder="Street" value={formData.street} onChange={handleChange} />
        <br /><br />

        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
        <br /><br />

        <input name="state" placeholder="State" value={formData.state} onChange={handleChange} />
        <br /><br />

        <input name="zip" placeholder="Zip" value={formData.zip} onChange={handleChange} />
        <br /><br />

        <button type="submit">Add Contact</button>
      </form>

      <h2>Saved Contacts</h2>

      {contacts.map((contact) => (
        <div
          key={contact._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "10px"
          }}
        >
          <strong>{contact.name}</strong>
          <p>
            {contact.street}, {contact.city}, {contact.state} {contact.zip}
          </p>

          <button onClick={() => handleDelete(contact._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Contacts;