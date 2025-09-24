
import './App.css';
import logo from './shop-react-logo.png';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import shopping_basket from './shopping-basket-img.png';
import Clothing_info from './Fact.jsx';
import product_img1 from './blue-jacket-img.jpg';
import product_img2 from './yellow-cap-img.png';
import product_img3 from './cat-slippers-img.png';

import { useState, useEffect } from 'react';


function StorePage() {


    //laver en statelike og derefter sætter setLikes til 0
    const [likes, setLikes] = useState(0);
    const [bluejacket, setBlueJacket] = useState(1)
    const [yellowcap, setYellowCap] = useState(1)
    const [catslippers, setCatSlippers] = useState(1)

    const navigate = useNavigate();
    const goToNewPage = () => navigate("/");


    const bluejacketItem = {

        name: "Blå jakke",
        brand: "H&M",
        model: "blå lille",
        size: "M - Medium",
        price: "760kr",
        color: "blå",
        description: "En lille flot blå jakke"
    }

    const yellowcapItem = {

        name: "Gul hue",
        brand: "Hugo Boss",
        model: "gul lille",
        size: "XS - Extra small",
        price: "150kr",
        color: "gul",
        description: "En flot gul hue"
    }

    const catslipperItem = {

        name: "Orange katte sutsko",
        brand: "dyrttøj",
        model: "multi lille",
        size: "XL - Extra large",
        price: "300kr",
        color: "multifarvet",
        description: "Små fine katte sutsko",
    }


    //Indeholder hvad der er i kundens kurv derfor starter den tom
    const [basketcontent, setBasketContent] = useState([

    ]);

    //tilgængelige tøjobjekter i butikken på nuværende tidspunkt
    const [clothingarray, setClothingArray] = useState([
        {

            id: "1",
            brand: "H&M",
            model: "blå lille",
            size: "S - small",
            price: "760kr",
            color: "blå",
            description: "En lille flot blå jakke",
            img: product_img1,
            amount: 1
        },
        {

            id: "2",
            brand: "Hugo Boss",
            model: "gul lille",
            size: "XS - Extra small",
            price: "150kr",
            color: "gul",
            description: "En flot gul hue",
            img: product_img2,
            amount: 1
        },
        {

            id: "3",
            brand: "dyrttøj",
            model: "multi lille",
            size: "XL - Extra large",
            price: "300kr",
            color: "multifarvet",
            description: "Små fine katte sutsko",
            img: product_img3,
            amount: 1
        }


    ]);

 

    //parameter som sendes til swithcen 
    function buyClothing(add_Basket_Item) {

        switch (add_Basket_Item) {

            case "bluejacket":

                if (bluejacket > 0) {
                    setBlueJacket(blue_Jacket_Amount => blue_Jacket_Amount - 1);


                    //lav et nyt array hvor alt indgår der ikke har index tallet 0
                    setClothingArray(prev => prev.filter(item => item.id !== "1"));


                    // add objekt til array 
                    setBasketContent(prev => [...prev, bluejacketItem])


                }

                break;

            case "yellowcaps":

                if (yellowcap > 0) {
                    setYellowCap(yellow_Cap_Amount => yellow_Cap_Amount - 1); //mængden der bliver vist på antal ved køb
                    //item er navnet hvert element i listen gives dermed er item nr 2 det andet objekt i listen 
                    setClothingArray(prev => prev.filter(item => item.id !== "2"));
                    setBasketContent(prev => [...prev, yellowcapItem])




                }

                break;

            case "catslipp":

                if (catslippers > 0) {
                    //hvad er den nuværende state af cat_slippers_Amount, når dette er sket trækkes 1 fra den nuværende state nemlig 1  
                    setCatSlippers(cat_slippers_Amount => cat_slippers_Amount - 1);

                    //laver nyt array hvor alle objekter med "id: 3" bliver ekskluderet - dermed fjernes varen fra butik arrayet
                    setClothingArray(prev => prev.filter(item => item.id !== "3"));

                    //katte sutsko tilføjes til kurvens indhold
                    setBasketContent(prev => [...prev, catslipperItem])



                }

                break;

        }
    }



    //kører koden heri ved program start
    useEffect(() => {


        console.log(basketcontent)
        console.log(clothingarray)


    }, [basketcontent]);
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
                <ul >  
                    {/*map bruges her i arrayet til at ramme hvert objekt */}
                    {/*her knyttes item til hvert objekt og index til hvor i arrayet man er */}
                    {basketcontent.map((item) => (
                        //item - elementet/objektet i arrayet


                        //key fortæller her hvilket array objekt der referers til 
                        //her siger den bruge hvert items id som nøgle fx hvis id er 1 udgiv blå jakke info
                        <li key={item.id} style={{
                            marginBottom: "30px"

                        }}>
                            <strong>{item.name}</strong> <br />
                            <strong>Model:</strong> {item.model} <br />
                            <strong>Størrelse:</strong> {item.size} <br />
                            <strong>Pris:</strong> {item.price} <br />
                            <strong>Farve:</strong> {item.color} <br />
                            <strong>Deskription:</strong> {item.description} <br />
                        </li>
                    ))}
                </ul>

            </div>

            <div className="navBar">
                <div className="nav-logo">
                    <img src={logo} alt="logo" style={{ width: "100%", height: "33px" }} onClick={goToNewPage} />
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

                <div className="clothing-item-con">


                    <div className="clothing-item">

                        <div className="product-img">
                            <img src={product_img1} alt="produkt 1" style={{ width: "350px", height: "200px" }}></img>
                        </div>

                        <Clothing_info brand="Brand: H&M" price="Pris: 760 kr" model="Gul hue" description="Deskription: Dette tøj er bæredygtigt" Id="ID-145" size="Størrelse: Medium" color="Farve: Blå" />

                        <p> {bluejacket.toString() + " "} stk tilgængelig</p>
                        <div className="order-btn" onClick={() => buyClothing("bluejacket")}>Tilføj til kurv</div>

                    </div>

                    <div className="clothing-item">

                        <div className="product-img">
                            <img src={product_img2} alt="produkt 2" style={{ width: "350px", height: "200px" }}></img>
                        </div>

                        <Clothing_info brand="Brand: H&M" price="Pris: 150 kr" model="Gul hue" description="Deskription: Dette tøj er bæredygtigt" Id="ID-125" size="Størrelse: XS" color="Farve: Gul" />

                        <p> {yellowcap.toString() + " "} stk tilgængelig</p>
                        <div className="order-btn" onClick={() => buyClothing("yellowcaps")}>Tilføj til kurv</div>
                    </div>

                    <div className="clothing-item">


                        <div className="product-img">
                            <img src={product_img3} alt="produkt 3" style={{ width: "350px", height: "200px" }}></img>
                        </div>

                        <Clothing_info brand="Brand: H&M" price="Pris: 300 kr" model="Gul hue" description="Deskription: Dette tøj er bæredygtigt" Id="ID-245" size="Størrelse: XL" color="Farve: Orange" />

                        <p> {catslippers.toString() + " "} stk tilgængelig</p>

                        <div className="order-btn" onClick={() => buyClothing("catslipp")}>Tilføj til kurv</div>
                    </div>

                </div>
            </div>

            <div className="footer">
                <button onClick={likeCounter}>Klik her for gratis likes :D</button>
                <p style={{
                    color: "white",
                    marginLeft: "5px"

                }}>
                    {likes.toString() + " "} 👍 (amount of likes)

                </p>
            </div>
        </div>

    );

    function likeCounter() {
        setLikes(likeAmount => likeAmount + 1)

    }
//ændre display værdien af indkurven så den gemmes eller vises 
    function shopBasket() {

        const introElement = document.getElementById("intro");
        if (introElement.style.display === "none") {
            introElement.style.display = "block";
        } else {
            introElement.style.display = "none";
        }


    }


}




//let jacket_Amount =1;

//let cat_Slippers_amount = 1;



export default StorePage;


//if (clothingArray.includes(clothing2) === true ) {

// cap_Amount=1
// console.log(clothing2)
// document.getElementById("yellow-cap-amount").innerHTML = cap_Amount + "" + "tilgængelig";
//}
//else {
//cap_Amount=0
//document.getElementById("yellow-cap-amount").innerHTML = cap_Amount  + "" + "tilgængelig";


//}