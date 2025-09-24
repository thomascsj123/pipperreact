import { useState } from "react";
import Popup from './popup.jsx'

function Kontaktbog () {
    const [showPopup, visPopup] = useState(false); //vi sikrer os at popuppen ikke bliver vist til at starte med men først efter click
    const [kontakter, setKontakter] = useState([]);

    const tilføjKontakt = (nyKontakt) => {
    setKontakter([...kontakter, nyKontakt]); // tilføj ny kontakt til listen
  };

    return(
        <div className="forside">
        
            <h1 className="overskrift">Kontaktbog</h1>
            <button className="nykontakt" onClick={() => visPopup(true)}>
                Opret ny kontakt</button>

                {showPopup && <Popup lukPopup={() => visPopup(false)} tilføjKontakt={tilføjKontakt}/>}

                    <h2 className="kontakterh2">Alle kontakter:</h2>
      {kontakter.length === 0 ? (
        <p className="ingenkontakter">Ingen kontakter endnu</p>
      ) : (
        <ul className="uldiv">
          {kontakter.map((kontakt, index) => (
            <li key={index}  className="kontaktertemplate">

              <span className="kontaktelement">Navn: {kontakt.navn}</span>
              <span className="kontaktelement">Efternavn: {kontakt.efternavn}</span>
              <span className="kontaktelement">Email: {kontakt.email}</span>
              <span className="kontaktelement">Tlf: {kontakt.tlf}</span>
              <span className="kontaktelement">Firma: {kontakt.firma}</span>
              <span className="kontaktelement">Stilling: {kontakt.stilling}</span>

            </li>
          ))}
        </ul>
      )}

        </div>
    );
}
export default Kontaktbog