function Home() {
  return (
    <div>
      <h1>Contact Route Planner</h1>

      <p>
        Contact Route Planner is a MERN web application that helps users
        organize contacts by location and plan efficient visits.
      </p>

      <div className="card">
        <h2>Features</h2>

        <ul>
          <li>Manage contacts with full CRUD operations.</li>
          <li>Automatically geocode addresses.</li>
          <li>Group nearby contacts for efficient route planning.</li>
          <li>Multi-page application using React Router.</li>
        </ul>
      </div>

      <div className="card">
        <h2>Technologies Used</h2>

        <ul>
          <li>React</li>
          <li>Node.js</li>
          <li>Express</li>
          <li>MongoDB Atlas</li>
          <li>Mongoose</li>
          <li>OpenStreetMap Geocoding</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;