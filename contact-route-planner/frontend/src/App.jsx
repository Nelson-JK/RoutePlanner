import { useEffect, useState } from "react";

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5000/contacts")
    .then((response) => response.json())
    .then((data) => setContacts(data))
    .catch((error) => console.error("Error fetching contacts:", error));
}, []);

  return (
    <div>
      <h1>Contact Route Planner</h1>
      <h2>Saved Contacts</h2>

      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              {contact.name} - {contact.street}, {contact.city}, {contact.state} {contact.zip}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;