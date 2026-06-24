import { useEffect, useState } from "react";

function Groups() {
  const [groups, setGroups] = useState([]);

  const loadGroups = () => {
    fetch("/api/groups")
      .then((response) => response.json())
      .then((data) => {
        console.log("Groups loaded:", data);
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
        <p>No groups found.</p>
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

            <p>
              {group.length} contact
              {group.length !== 1 ? "s" : ""}
            </p>

            {group.map((contact) => (
              <div
                key={contact._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "8px",
                  marginBottom: "8px"
                }}
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