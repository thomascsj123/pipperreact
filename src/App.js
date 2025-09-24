import './App.css';
import shopping_basket from './shopping-basket-img.png';
import logo from './shop-react-logo.png';
import models from './airtox-model.png';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import StorePage from './secondPage';

function Homepage() {
  const navigate = useNavigate();
  const goToNewPage = () => navigate("/StorePage");

  return (
    <div className="clothing-store-con">

     <div id="intro" style={{
                position: "fixed",
                display: "none",
                width: "18%",
                top: "60px",
                left: "1190px",
                height: "70%",
                backgroundColor: "rgba(0,0,0,0.7)",
                color: "white",
                zIndex: 10,
                padding: "20px"

            }}>

                <p>Dette er din indkøbskurv</p>
              

            </div>

      <div className="navBar">
        <div className="nav-logo">
          <img src={logo} alt="logo" style={{ width: "100%", height: "33px" }} />
        </div>
        <div className="nav-items">
          <p style={{ color: "white" }}>Men</p>
          <p style={{ color: "white" }}>Women</p>
          <p style={{ color: "white" }}>Children</p>
          <p style={{ color: "white" }}>Contact</p>
          <p style={{ color: "white" }}>Sign-in</p>
          <p style={{ color: "red" }}>Login</p>

          <div className="shopping-icon">
            <img src={shopping_basket} alt="shopping basket" style={{ width: "100%", height: "33px" }} onClick={shopBasket} />
          </div>

        </div>
      </div>

      <div className="navBar2">
        <div className="nav-items2">
          <p style={{ color: "white" }}>Trends</p>
          <p style={{ color: "white" }}>Jeans</p>
          <p style={{ color: "white" }}>Shirts</p>
          <p style={{ color: "white" }}>Shoes</p>
          <p style={{ color: "white" }}>Sport</p>
          <p style={{ color: "white" }}>Designer</p>
          <p style={{ color: "white" }}>Season</p>
        </div>
      </div>

      <div className="main-content-con">
        <div className="back-img">
          <img src={models} alt="models background" />
        </div>

        <div className="explore-btn-con">
          <div className="sale-marker">
            <p>50%</p>
          </div>

          <div className="explore-btn" onClick={goToNewPage}>
            <p>Explore now</p>
          </div>
        </div>
      </div>

      <div className="footer"></div>



    </div>
  );
}

function App() {
  return (

    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/StorePage" element={<StorePage />} />
    </Routes>

  )

}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function shopBasket() {

  const introElement = document.getElementById("intro");
  if (introElement.style.display === "none") {
    introElement.style.display = "block";
  } else {
    introElement.style.display = "none";
  }


}
