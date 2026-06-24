import { useEffect, useState } from "react";

function Groups() {
  const [groups, setGroups] = useState([]);

  const loadGroups = () => {
    fetch("/api/groups")
      .then((response) => response.json())
      .then((data) => {
        setGroups(data);
      })
      .catch((error) =>
        console.error("Error loading groups:", error)
      );
  };

  useEffect(() => {
    loadGroups();
  }, []);

  return (
    <div>
      <h1>Contact Groups</h1>

      {groups.length === 0 ? (
        <div className="card">
          <p>No groups found.</p>
        </div>
      ) : (
        groups.map((group, index) => (
          <div
            key={index}
            className="card"
          >
            <h2>Group {index + 1}</h2>

            <p>
              {group.length} contact
              {group.length !== 1 ? "s" : ""}
            </p>

            {group.map((contact) => (
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
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Groups;