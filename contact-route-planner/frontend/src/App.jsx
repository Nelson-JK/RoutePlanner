import { useEffect, useState } from "react";

function App() {
  const [contacts, setContacts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: ""
  });

  const loadContacts = () => {
  fetch("/api/contacts")
      .then((response) => response.json())
      .then((data) => {
        console.log("Contacts loaded:", data);
        setContacts(data);
      })
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

   await fetch("/api/contacts", {
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Contact Route Planner</h1>

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

      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.street}, {contact.city}, {contact.state} {contact.zip}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;