import { useState } from "react"
import { useEffect } from "react";
import feather from "feather-icons";
import "./style.css";

function App() {
  // Vi implementerer feather-icons med useEffect her
  useEffect(() => {
    feather.replace();
  }, []);

  // Her bruger vi useState til at oprette en variabel og noget den kan ændres til
  const [username, setUsername] = useState(""); // Gemmer username
  const [text, setText] = useState(""); // Gemmer pip-besked
  const [messages, setMessages] = useState([]); // Liste med alle pip-beskeder

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && text.trim()) {
      setMessages([...messages, { username, text }]);
      setText(""); // Her nulstiller vi tekst efter submit
      setUsername(""); // Her nulstiller vi username efter submit
    }
  };

  return (
    <div className="App">
      
      <div className="columns-container">
        
        <div className="column1">
          <h1>
            <i className="logo" data-feather="twitter"></i> <span>Pipper</span>
          </h1>
          <nav className="navi">
            <ul>
              <li><a href="#"><i data-feather="home"></i> <span>Home</span></a></li>
              <li><a href="#"><i data-feather="hash"></i> <span>Explore</span></a></li>
              <li><a href="#"><i data-feather="bell"></i> <span>Notifications</span></a></li>
              <li><a href="#"><i data-feather="mail"></i> <span>Messages</span></a></li>
              <li><a href="#"><i data-feather="bookmark"></i> <span>Bookmarks</span></a></li>
              <li><a href="#"><i data-feather="list"></i> <span>Lists</span></a></li>
              <li><a href="#"><i data-feather="user"></i> <span>Profile</span></a></li>
              <li><a href="#"><i data-feather="more-horizontal"></i> <span>More</span></a></li>
            </ul>
          </nav>
          <button className="knap rounded-pill">Pip</button>
        </div>


<div className="column2">
  <div className="home">
    <div className="border-bottom">
      <h1 className="mt-3">Home</h1>
    </div>

    <div className="border-bottom">
      <div className="mx-5 my-3">
        <form id="student-form" onSubmit={handleSubmit}> {/* Her kører vi funktionen handleSubmit ved klik*/}
          <label htmlFor="username">Username</label> <br />

          {/* value=username: Det vi skriver i username, afgør hvad der skal stå i pip-beskeden
          onChange sørger for, at username "følger med"*/}
          <input
            name="username"
            id="username"
            className="form-control"
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
          /><br />
          <label htmlFor="text">Text</label><br />
          <textarea
            id="text"
            className="form-control mb-2"
            rows="2"
            maxLength="255"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <div className="d-flex justify-content-between align-items-center">
            <small className="counter">{text.length}/255</small> { /* Vores tekst-counter */}
            <button type="submit" className="btn-post rounded-pill">
              Pip
            </button>
          </div>
        </form>
      </div>
    </div>

    {/*Her viser vi pip-beskeder*/}
    <ul id="students">
      {/* Vi går igennem vores liste med pips og viser dem*/}
      {messages.map((msg, index) => (
        <li key={index} className="border-bottom mx-5 my-2 pip-container"> {/* React-nøgle til at holde styr på beskederne*/}
          <strong>{msg.username}</strong>: {msg.text}
        </li>
      ))}
    </ul>
  </div>


</div>

        <div className="column3">
          <div className="search-container mt-3 mb-3">
            <i data-feather="search" className="search-icon"></i>
            <input type="text" className="search form-control rounded-pill" placeholder="Search Pipper" />
          </div>

          <div className="card border">
            <div className="card-body pt-4 pb-4">
              <h4 className="fw-bold mb-4">Trending pips</h4>
              <ul className="list-unstyled mb-0 text-secondary d-grid gap-4">
                <li>
                  <a href="#">
                    <h5 className="m-0 fs-6">React 19</h5>
                    <p className="m-0 fs-6 fw-bold text-dark">Trending in Technology</p>
                    <p className="m-0 fs-6">15.2K Pips</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <h5 className="m-0 fs-6">#WebDev</h5>
                    <p className="m-0 fs-6 fw-bold text-dark">Trending in Technology</p>
                    <p className="m-0 fs-6">8,456 Pips</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <h5 className="m-0 fs-6">TypeScript</h5>
                    <p className="m-0 fs-6 fw-bold text-dark">Trending in Technology</p>
                    <p className="m-0 fs-6">4,892 Pips</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="card border mt-3">
            <div className="card-body pt-4 pb-4">
              <h4 className="fw-bold mb-4">Who to follow</h4>
              <ul className="list-unstyled mb-0 text-secondary d-grid gap-4">
                <li className="d-flex justify-content-between align-items-center">
                  <div className="bg-pipperblue p-2 rounded-circle text-white d-flex justify-content-center align-items-center" style={{ width: "40px", height: "40px" }}><div>RE</div></div>
                  <div><p className="m-0 fs-6 fw-bold text-dark">React</p><p className="m-0 fs-6">@reactjs</p></div>
                  <a href="#" className="bg-pipperblue p-2 text-white rounded-pill px-3 py-1 text-decoration-none">Follow</a>
                </li>

                <li className="d-flex justify-content-between align-items-center">
                  <div className="bg-pipperblue p-2 rounded-circle text-white d-flex justify-content-center align-items-center" style={{ width: "40px", height: "40px" }}><div>TY</div></div>
                  <div><p className="m-0 fs-6 fw-bold text-dark">TypeScript</p><p className="m-0 fs-6">@typescript</p></div>
                  <a href="#" className="bg-pipperblue p-2 text-white rounded-pill px-3 py-1 text-decoration-none">Follow</a>
                </li>

                <li className="d-flex justify-content-between align-items-center">
                  <div className="bg-pipperblue p-2 rounded-circle text-white d-flex justify-content-center align-items-center" style={{ width: "40px", height: "40px" }}><div>VE</div></div>
                  <div><p className="m-0 fs-6 fw-bold text-dark">Vercel</p><p className="m-0 fs-6">@vercel</p></div>
                  <a href="#" className="bg-pipperblue p-2 text-white rounded-pill px-3 py-1 text-decoration-none">Follow</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
