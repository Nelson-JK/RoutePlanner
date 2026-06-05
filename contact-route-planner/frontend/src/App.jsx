import { useEffect, useState } from "react";

function App() {
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);

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

  const loadGroups = () => {
    fetch("/api/groups")
      .then((response) => response.json())
      .then((data) => {
        console.log("Groups loaded:", data);
        setGroups(data);
      })
      .catch((error) => console.error("Error loading groups:", error));
  };

  useEffect(() => {
    loadContacts();
    loadGroups();
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
    loadGroups();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/contacts/${id}`, {
      method: "DELETE"
    });

    loadContacts();
    loadGroups();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
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

      {contacts.map((contact) => (
        <div
          key={contact.id}
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

          <button onClick={() => handleDelete(contact.id)}>
            Delete
          </button>
        </div>
      ))}

      <h2>Contact Groups</h2>

      {groups.length === 0 ? (
        <p>No groups available.</p>
      ) : (
        groups.map((group, index) => (
          <div
            key={index}
            style={{
              border: "2px solid #aaa",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "20px"
            }}
          >
            <h3>Group {index + 1}</h3>
            <p>{group.length} contacts in this group</p>

            {group.map((contact) => (
              <div
                key={contact.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "8px",
                  marginBottom: "8px"
                }}
              >
                <strong>{contact.name}</strong>
                <p>{contact.street}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default App;