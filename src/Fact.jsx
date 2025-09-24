import './App.css';

//her bliver min component defineret
function Clothing_info(props) {
  return (
  
    <div className = "clothing-info">

<p> {props.brand} {props.description}  </p>
<p> {props.price} </p>
<p> {props.model} </p>
<p> {props.Id} </p>
<p> {props.color} </p>
<p> {props.size} </p>


    </div>
  

  );
}



export default Clothing_info


//<div className= "clothing-item-con">


//<div className="clothing-item">
//<Clothing_info brand= "H&M" price="150 kr" model="EX (extra small)" description="Dette tøj er bæredygtigt"> </Clothing_info>

//</div>

//<div className="clothing-item">
//<Clothing_info brand= "H&M" price="150 kr" model="EX (extra small)" description="Dette tøj er bæredygtigt"> </Clothing_info>

//</div>

//<div className="clothing-item">
//<Clothing_info brand= "H&M" price="150 kr" model="EX (extra small)" description="Dette tøj er bæredygtigt"> </Clothing_info>

//</div>


//</div>