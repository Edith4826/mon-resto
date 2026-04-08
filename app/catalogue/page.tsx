"use client";

import Link from "next/link";
import { useState } from "react";

export default function Catalogue() {
  const [recherche, setRecherche] = useState("");
  const [categorieActive, setCategorieActive] = useState("Tous");

  const plats = [
    { id: 1, nom: "ATTIÉKÉ POISSON", prix: "3 000 F", img: "/attiekepoisngriller.jpeg", cat: "Plats" },
    { id: 2, nom: "ESCARGOT", prix: "1 500 F", img: "/escargot.png", cat: "Entrées" },
    { id: 3, nom: "DES PÂTES", prix: "3 500 F", img: "/eur1.jpeg", cat: "Plats" },
    { id: 4, nom: "FOUTOU GRAINE", prix: "3 000 F", img: "/foutou graine.jpeg", cat: "Plats" },
    { id: 5, nom: "PLACALI SAUCE", prix: "2 500 F", img: "/placalie.jpeg", cat: "Plats" },
    { id: 6, nom: "SPAGHETTI ASIATIQUE", prix: "3 000 F", img: "/téléchargement (1).jpeg", cat: "Plats" },
    { id: 7, nom: "FRITE et HAMBURGER", prix: "5 000 F", img: "/téléchargement (2).jpeg", cat: "Grillades" },
    { id: 8, nom: "FOUTOU AUBERGINE", prix: "3 000 F", img: "/images (3).jpeg", cat: "Plats" },
    { id: 9, nom: "Nems", prix: "2 500 F", img: "/asi1.jpeg", cat: "Entrées" },
    { id: 10, nom: "TAGLIATELLES", prix: "5 000 F", img: "/téléchargement.jpeg", cat: "Plats" },
    { id: 11, nom: "Jus de Bissap", prix: "1 000 F", img: "/bissap.jpg", cat: "Boissons" },
  ];

  const categories = ["Tous", "Entrées", "Plats", "Grillades", "Boissons"];

  const platsFiltrés = plats.filter((plat) => {
    const correspondRecherche = plat.nom.toLowerCase().includes(recherche.toLowerCase());
    const correspondCategorie = categorieActive === "Tous" || plat.cat === categorieActive;
    return correspondRecherche && correspondCategorie;
  });

  return (
    <div className="catalogue-container">
      <center>
        <br />
        <h1 className="main-title">NOTRE SÉLECTION GOURMANDE</h1>
        <div className="title-underline"></div>
        
        {/* BARRE DE RECHERCHE AMÉLIORÉE */}
        <div className="search-section">
          <div className="search-wrapper">
            <input 
              type="text" 
              placeholder="Rechercher un plat délice..." 
              className="search-bar"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {/* BOUTONS DE FILTRES AMÉLIORÉS */}
        <div className="filter-group">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setCategorieActive(cat)}
              className={`filter-btn ${categorieActive === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="subtitle">
          {platsFiltrés.length} délices trouvés pour vous
        </p>

        <div className="scroll-wrapper">
          <div className="plats-list">
            {platsFiltrés.length > 0 ? (
              platsFiltrés.map((plat) => (
                <div key={plat.id} className="plat-card">
                  <div className="image-container">
                    {/* Gestion du fallback image si le lien est mort */}
                    <img 
                      src={plat.img} 
                      alt={plat.nom} 
                      className="plat-img" 
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/400x300/8B4513/white?text=Les+Delices";
                      }}
                    />
                    <div className="price-badge">{plat.prix}</div>
                  </div>
                  
                  <div className="card-content">
                    <span className="cat-label">{plat.cat}</span>
                    <h3 className="plat-name">{plat.nom}</h3>
                    <div className="divider"></div>
                    
                    <Link href="/paiement">
                      <button className="btn-commander">
                        <span className="cart-icon">🛒</span> COMMANDER
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-result-container">
                <div className="no-result">Désolé, aucun plat ne correspond. 🥗</div>
                <button onClick={() => {setRecherche(""); setCategorieActive("Tous")}} className="reset-btn">
                  Voir tout le menu
                </button>
              </div>
            )}
          </div>
        </div>

        <br /><br />
        <Link href="/" className="back-link">
          <b>← Retour à l'accueil</b>
        </Link>
        <br /><br />
      </center>

      <style jsx>{`
        .catalogue-container {
          background: linear-gradient(rgba(253, 245, 230, 0.92), rgba(253, 245, 230, 0.92)), 
                      url('https://www.transparenttextures.com/patterns/padded-light.png');
          min-height: 100vh;
          padding: 40px 20px;
        }

        .main-title {
          font-family: 'Verdana', sans-serif;
          font-size: clamp(24px, 5vw, 38px);
          color: #5D2E0C;
          font-weight: 900;
          letter-spacing: 2px;
          margin-bottom: 5px;
        }

        .title-underline {
          width: 80px;
          height: 4px;
          background-color: #FFD700;
          border-radius: 2px;
          margin-bottom: 30px;
        }

        /* RECHERCHE */
        .search-section { margin-bottom: 30px; width: 90%; max-width: 500px; }
        .search-wrapper { position: relative; display: flex; align-items: center; }
        .search-bar {
          width: 100%;
          padding: 16px 50px 16px 25px;
          border-radius: 50px;
          border: 2px solid #8B4513;
          outline: none;
          font-size: 16px;
          transition: 0.3s;
          box-shadow: 0 4px 10px rgba(139, 69, 19, 0.1);
        }
        .search-bar:focus {
          border-color: #FFD700;
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
          transform: scale(1.02);
        }
        .search-icon { position: absolute; right: 20px; font-size: 20px; }

        /* FILTRES */
        .filter-group { display: flex; justify-content: center; gap: 12px; margin-bottom: 25px; flex-wrap: wrap; }
        .filter-btn {
          padding: 10px 22px;
          border-radius: 50px;
          border: none;
          background: white;
          color: #8B4513;
          cursor: pointer;
          font-weight: bold;
          transition: 0.3s;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .filter-btn:hover { transform: translateY(-3px); box-shadow: 0 6px 12px rgba(0,0,0,0.1); }
        .filter-btn.active { background: #8B4513; color: white; box-shadow: 0 4px 10px rgba(93, 46, 12, 0.3); }

        .subtitle { color: #8B4513; font-style: italic; font-size: 16px; margin-bottom: 10px; }

        /* LISTE ET CARTES */
        .scroll-wrapper {
          overflow-x: auto;
          padding: 20px 10px 40px;
          width: 100%;
          scrollbar-width: thin;
          scrollbar-color: #8B4513 transparent;
        }

        .plats-list { display: flex; gap: 30px; padding-bottom: 10px; }

        .plat-card {
          background: white;
          border-radius: 25px;
          min-width: 300px;
          max-width: 300px;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(0,0,0,0.08);
          transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid rgba(139, 69, 19, 0.05);
        }

        .plat-card:hover { 
          transform: translateY(-12px); 
          box-shadow: 0 20px 35px rgba(0,0,0,0.15); 
        }

        .image-container { position: relative; height: 200px; overflow: hidden; background: #eee; }
        .plat-img { width: 100%; height: 100%; object-fit: cover; transition: 0.6s ease; }
        .plat-card:hover .plat-img { transform: scale(1.1) rotate(2deg); }

        .price-badge {
          position: absolute;
          bottom: 15px;
          right: 15px;
          background: #FFD700;
          color: #5D2E0C;
          padding: 6px 14px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 15px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        .card-content { padding: 25px; text-align: center; }
        .cat-label { font-size: 11px; color: #8B4513; text-transform: uppercase; font-weight: bold; opacity: 0.6; letter-spacing: 1px; }
        .plat-name { font-size: 19px; color: #333; margin: 8px 0 15px; font-weight: bold; }

        .divider { width: 40px; height: 3px; background: #FFD700; margin: 0 auto 20px; border-radius: 2px; }

        .btn-commander {
          background: #2E7D32;
          color: white;
          border: none;
          padding: 14px;
          border-radius: 15px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
        }

        .btn-commander:hover { background: #1B5E20; transform: scale(1.02); }

        .back-link { color: #8B4513; text-decoration: none; transition: 0.3s; padding: 10px; border-radius: 10px; }
        .back-link:hover { background: rgba(139, 69, 19, 0.1); color: #5D2E0C; }

        .no-result-container { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 20px; padding: 60px; }
        .reset-btn { background: #8B4513; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer; }

        /* Scrollbar */
        .scroll-wrapper::-webkit-scrollbar { height: 6px; }
        .scroll-wrapper::-webkit-scrollbar-thumb { background: #8B4513; border-radius: 10px; }
      `}</style>
    </div>
  );
}