"use client";

import Link from "next/link";

export default function Catalogue() {
  // On crée une liste (Array) avec tous tes plats
  const plats = [
    { id: 1, nom: "ATTIÉKÉ POISSON", prix: "3 000 F", img: "/attiekepoisngriller.jpeg" },
    { id: 2, nom: "ESCARGOT", prix: "1 500 F", img: "/escargot.png" },
    { id: 3, nom: "des pattes", prix: "3 500 F", img: "/eur1.jpeg" },
    { id: 4, nom: "FOUTOU GRAINE", prix: "3 000 F", img: "/foutou graine.jpeg" },
    { id: 5, nom: "PLACALI SAUCE", prix: "2 500 F", img: "/placalie.jpeg" },
    { id: 6, nom: "SPAGHETTI ASIATIQUE", prix: "3 000 F", img: "/téléchargement (1).jpeg" },
    { id: 7, nom: "fritte et hamburger", prix: "5 000 F", img: "/téléchargement (2).jpeg" },
    { id: 8, nom: "FOUTOU AUBERGINE", prix: "3 000 F", img: "/images (3).jpeg" },
    { id: 9, nom: "Nems", prix: "2 500 F", img: "/asi1.jpeg" },
    { id: 10, nom: "foutou sauce claire", prix: "5 000 F", img: "/images (3).jpeg" },
  ];

  return (
    <div style={{ backgroundColor: "#FDF5E6", minHeight: "100vh", padding: "20px" }}>
      <center>
        <br />
        <span style={{ fontFamily: "Verdana", fontSize: "32px", color: "#8B4513", fontWeight: "bold" }}>
          NOTRE CATALOGUE DE PLATS
        </span>
        <hr style={{ width: "80%", border: "1px solid #8B4513", margin: "20px 0" }} />
        <br />

        {/* Zone de défilement horizontal */}
        <div style={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          padding: "20px",
          width: "95%",
          border: "1px solid #8B4513",
          borderRadius: "15px",
          backgroundColor: "rgba(255,255,255,0.5)",
          display: "flex",
          gap: "20px"
        }}>
          
          {/* On boucle sur le tableau plats pour générer les cartes automatiquement */}
          {plats.map((plat) => (
            <div 
              key={plat.id} 
              style={{
                backgroundColor: "white",
                border: "2px solid #8B4513",
                borderRadius: "15px",
                minWidth: "300px",
                padding: "20px",
                display: "inline-block",
                verticalAlign: "top",
                textAlign: "center"
              }}
            >
              <span style={{ fontSize: "20px", fontFamily: "Arial", fontWeight: "bold", color: "black" }}>
                {plat.nom}
              </span>
              <br /><br />
              
              <img 
                src={plat.img} 
                alt={plat.nom}
                style={{ 
                  width: "250px", 
                  height: "180px", 
                  borderRadius: "10px", 
                  border: "1px solid #ccc",
                  objectFit: "cover" 
                }} 
              />
              
              <br /><br />
              <span style={{ fontSize: "18px", color: "red", fontWeight: "bold" }}>
                {plat.prix}
              </span>
              
              <br /><br />
              <Link href="/paiement">
                <button 
                  style={{
                    backgroundColor: "#2E7D32",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    borderRadius: "5px",
                    border: "none",
                    padding: "10px",
                    width: "150px"
                  }}
                >
                  COMMANDER
                </button>
              </Link>
            </div>
          ))}
        </div>

        <br /><br />
        <Link href="/" style={{ color: "#8B4513", fontFamily: "Verdana", textDecoration: "none" }}>
          <b>[ Retour à l'accueil ]</b>
        </Link>
      </center>
    </div>
  );
}