import { useState } from "react";

function Popup({ lukPopup, tilføjKontakt }) {
  const [kontakt, setKontakt] = useState({
    navn: "",
    efternavn: "",
    email: "",
    tlf: "",
    firma: "",
    stilling: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKontakt({ ...kontakt, [name]: value }); // Opdaterer kun det felt, der ændres
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Forhindrer at siden reloades
    tilføjKontakt(kontakt); // Sender kontakt til parent komponent
    setKontakt({ navn: "", efternavn: "", email: "", tlf: "", firma: "", stilling: "" }); // Rydder felterne
    lukPopup(); // Luk popup hvis ønsket
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2 className="kontakttitle">Ny kontakt</h2>
        <form onSubmit={handleSubmit}>
            <div className="kontaktfelt">
                <label className="kontakttekst">
                Navn:
                
                </label>
                <input type="text" className="kontaktinput" name="navn" value={kontakt.navn} onChange={handleChange}  />
            </div>

            <div className="kontaktfelt">
                <label className="kontakttekst">
                Efternavn:
                </label>
                <input type="text" className="kontaktinput" name="efternavn" value={kontakt.efternavn} onChange={handleChange} />
            </div>

            <div className="kontaktfelt">
                <label className="kontakttekst">
                Email:
                
                </label>
                <input type="text" className="kontaktinput" name="email" value={kontakt.email} onChange={handleChange} />
            </div>

            <div className="kontaktfelt">
                <label className="kontakttekst">
                Tlf:
                
                </label>
                <input type="text" className="kontaktinput" name="tlf" value={kontakt.tlf} onChange={handleChange} />
            </div>

            <div className="kontaktfelt">
                <label className="kontakttekst">
                Firma:
                
                </label>
                <input type="text" className="kontaktinput" name="firma" value={kontakt.firma} onChange={handleChange} />
            </div>

            <div className="kontaktfelt">
                <label className="kontakttekst">
                Stilling:
                
                </label>
                <input type="text" className="kontaktinput" name="stilling" value={kontakt.stilling} onChange={handleChange} />
            </div>
       
          
          <button type="submit" className="kontaktknap">Gem</button>
          <button type="button" onClick={lukPopup} className="kontaktknap">Luk</button>
        </form>
      </div>
    </div>
  );
}

export default Popup;