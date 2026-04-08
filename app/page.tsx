"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

// --- LISTE COMPLÈTE DE 13 PLATS (ne rien enlever) ---
const PLATS = [
  { id: 1, nom: "Garba Spécial", prix: "2000 FCFA", image: "/garba.webp", tag: "Populaire" },
  { id: 2, nom: "Foutou Banane Graine", prix: "3500 FCFA", image: "/foutou.webp", tag: "" },
  { id: 3, nom: "Alloco Poisson Braisé", prix: "2500 FCFA", image: "/alloco.webp", tag: "" },
  { id: 4, nom: "Placali Sauce Kpala", prix: "3000 FCFA", image: "/placali.webp", tag: "" },
  { id: 5, nom: "Attiéké Poisson Frit", prix: "2000 FCFA", image: "/attieke.webp", tag: "" },
  { id: 6, nom: "Sauce Gouagouassou", prix: "4000 FCFA", image: "/gouagouassou.webp", tag: "Chef" },
  { id: 7, nom: "Kedjenou de Poulet", prix: "4500 FCFA", image: "/kedjenou.webp", tag: "" },
  { id: 8, nom: "Riz Gras au Poulet", prix: "2500 FCFA", image: "/rizgras.webp", tag: "Nouveau" },
  { id: 9, nom: "Choukouya de Mouton", prix: "5000 FCFA", image: "/choukouya.webp", tag: "" },
  { id: 10, nom: "Kabato Sauce Lalo", prix: "2500 FCFA", image: "/kabato.webp", tag: "" },
  { id: 11, nom: "Braisé de Porc", prix: "3000 FCFA", image: "/porc.webp", tag: "" },
  { id: 12, nom: "Soupe de Poisson", prix: "3500 FCFA", image: "/soupe.webp", tag: "" },
  { id: 13, nom: "Pastels / Accras", prix: "1500 FCFA", image: "/aperitif.webp", tag: "Entrée" },
];

export default function Accueil() {
  const [panier, setPanier] = useState<number[]>([]);
  const router = useRouter(); 

  const commanderPlat = (id: number) => {
    if (panier.includes(id)) {
      setPanier(panier.filter(item => item !== id));
    } else {
      setPanier([...panier, id]);
    }
  };

  return (
    <div style={{ minHeight: "100vh", color: "white", paddingBottom: "100px" }}>
      
      {/* NAVBAR FIXE */}
      <nav style={{ 
        position: "fixed", top: 0, width: "100%", zIndex: 100,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "10px 40px", background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/logo.jpeg" alt="Logo" style={{ width: "40px", borderRadius: "50%" }} />
          <span style={{ fontWeight: "bold", color: "#FFD700", fontSize: "20px" }}>RESTO Les Délices</span>
        </div>

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <Link href="/inscription"><button className="btn-nav">Inscription</button></Link>
          <Link href="/connexion"><button className="btn-nav btn-connexion">Connexion</button></Link>
          
          <div onClick={() => router.push("/connexion")} style={{ position: "relative", cursor: "pointer", fontSize: "22px" }}>
            🛒 {panier.length > 0 && <span className="cart-badge">{panier.length}</span>}
          </div>
        </div>
      </nav>

      {/* FOND D'ÉCRAN */}
      <img src="/resto1.webp" alt="Background" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: -1, filter: "brightness(0.2)" }} />

      <center>
        <br /><br /><br /><br /><br />
        <h1 style={{ fontFamily: "Verdana", fontSize: "35px", fontWeight: "bold" }}>
          NOTRE <span style={{ color: "#FFD700" }}>MENU</span>
        </h1>
        
        <p style={{ color: "#FFD700", fontWeight: "bold", letterSpacing: "2px", margin: "10px 0" }}>
          --- DÉCOUVREZ NOS VARIÉTÉS ---
        </p>

        <a href="tel:+2250102030405" style={{ textDecoration: "none" }}>
          <button className="btn-contact-small">📞 SERVICE CLIENT : 01 02 03 04 05</button>
        </a>

        <hr style={{ width: "80%", border: "0.5px solid rgba(255,255,255,0.1)", margin: "40px 0" }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px", maxWidth: "1200px", padding: "0 20px" }}>
          {PLATS.map((plat) => {
            const isSelected = panier.includes(plat.id);
            return (
              <div key={plat.id} className={`card-plat ${isSelected ? 'selected' : ''}`}>
                {plat.tag && <span className="badge">{plat.tag}</span>}
                <div className="img-container">
                  <img src={plat.image} alt={plat.nom} className="img-plat" />
                </div>
                <div style={{ padding: "15px" }}>
                  <h3 style={{ fontSize: "17px" }}>{plat.nom}</h3>
                  <p style={{ color: "#FFD700", fontWeight: "bold", fontSize: "18px", margin: "10px 0" }}>{plat.prix}</p>
                  
                  <button onClick={() => commanderPlat(plat.id)} className={`btn-commander ${isSelected ? 'btn-retirer' : ''}`}>
                    {isSelected ? "✖ RETIRER" : "🛒 COMMANDER"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </center>

      <style jsx>{`
        .btn-nav { background: transparent; color: white; border: 1px solid white; padding: 6px 15px; border-radius: 5px; cursor: pointer; font-size: 12px; transition: 0.3s; }
        .btn-connexion { background: white; color: black; }
        .btn-nav:hover { background: #FFD700; color: black; border-color: #FFD700; }

        .cart-badge { position: absolute; top: -5px; right: -10px; background: #FFD700; color: black; font-size: 11px; font-weight: bold; padding: 2px 7px; border-radius: 50%; animation: pop 0.3s ease; }
        @keyframes pop { 0% { transform: scale(1); } 50% { transform: scale(1.4); } 100% { transform: scale(1); } }
        
        .btn-contact-small { background: #28a745; color: white; border: none; padding: 10px 25px; font-size: 12px; font-weight: bold; border-radius: 30px; cursor: pointer; transition: 0.3s; }
        .btn-contact-small:hover { background: #218838; transform: scale(1.05); }

        /* MODIFICATION ICI : Retour à un fond plus clair (comme la 2ème capture) */
        .card-plat { 
          background: rgba(255, 255, 255, 0.05); /* Fond blanc très transparent, moins sombre */
          border-radius: 15px; 
          overflow: hidden; 
          border: 1px solid rgba(255,255,255,0.1); 
          transition: 0.4s ease; 
          position: relative; 
        }
        
        /* LA BORDURE DORÉE SÉLECTIONNÉE (toujours là) */
        .card-plat.selected { 
          border: 2px solid #FFD700; 
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.5); 
          transform: translateY(-5px);
        }
        
        .card-plat:hover:not(.selected) { border-color: rgba(255,215,0,0.5); transform: translateY(-5px); }

        .img-container { height: 180px; overflow: hidden; }
        .img-plat { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; opacity: 0.8; }
        .card-plat.selected .img-plat, .card-plat:hover .img-plat { opacity: 1; transform: scale(1.1); }

        .badge { position: absolute; top: 10px; left: 10px; background: #FFD700; color: black; padding: 4px 8px; font-size: 9px; font-weight: bold; border-radius: 4px; z-index: 5; }
        
        .btn-commander { background: #FFD700; color: black; border: none; padding: 12px; width: 100%; border-radius: 10px; font-weight: bold; cursor: pointer; transition: 0.2s; }
        .btn-commander:hover { background: white; }
        
        .btn-retirer { background: #ff4d4d; color: white; }
        .btn-retirer:hover { background: #cc0000; }
      `}</style>
    </div>
  );
}