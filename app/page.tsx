"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

const PLATS = [
  { id: 1, nom: "LASAGNE MAISON", prix: "2000 FCFA", image: "/desire.jpg", tag: "Populaire" },
  { id: 2, nom: "KEDJENOU DE POULET", prix: "3500 FCFA", image: "/kedjenou-poulet.jpg", tag: "" },
  { id: 3, nom: "POISSON BRAISÉ", prix: "2500 FCFA", image: "/desire1.jpg", tag: "" },
  { id: 4, nom: "VIANDE DE BOEUF", prix: "3000 FCFA", image: "/plat-viande-bouef.jpg", tag: "" },
  { id: 5, nom: "POISSON IGNAME", prix: "2000 FCFA", image: "/poisson igname.jpg", tag: "" },
  { id: 6, nom: "POULET SAUTÉ", prix: "4000 FCFA", image: "/poulet sauter.jpeg", tag: "Chef" },
  { id: 7, nom: "RAGOUT DE POMME", prix: "4500 FCFA", image: "/ragout de pomme.jpg", tag: "" },
  { id: 8, nom: "SAUCISSE GRILLÉE", prix: "2500 FCFA", image: "/sosice.jpg", tag: "Nouveau" },
  { id: 9, nom: "PÂTES À LA CRÈME", prix: "5000 FCFA", image: "/spa-creme-.jpg", tag: "" },
  { id: 10, nom: "VIANDE ABOLO", prix: "2500 FCFA", image: "/viande-abolo.jpg", tag: "" },
  { id: 11, nom: "SPAGHETTI CRÈME", prix: "3000 FCFA", image: "/spa-creme-.jpg", tag: "" },
  { id: 12, nom: "PLAT DU JOUR", prix: "3500 FCFA", image: "/nes.jpg", tag: "" },
  { id: 13, nom: "ENTRÉE SPÉCIALE", prix: "1500 FCFA", image: "/spa.jpg", tag: "Entrée" },
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
    <div style={{ minHeight: "100vh", color: "white", paddingBottom: "100px", overflowX: "hidden" }}>
      
      {/* NAVBAR CORRIGÉE POUR MOBILE */}
      <nav style={{ 
        position: "fixed", top: 0, width: "100%", zIndex: 100,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "10px 15px", // Réduit pour mobile
        background: "rgba(0,0,0,0.9)", backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        flexWrap: "wrap", // Permet de passer à la ligne sur petit écran
        gap: "10px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img src="/logo.jpeg" alt="Logo" style={{ width: "35px", height: "35px", borderRadius: "50%" }} />
          <span style={{ fontWeight: "bold", color: "#FFD700", fontSize: "16px" }}>RESTO Les Délices</span>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link href="/inscription"><button className="btn-nav">Inscription</button></Link>
          <Link href="/connexion"><button className="btn-nav btn-connexion">Connexion</button></Link>
          
          <div onClick={() => router.push("/connexion")} style={{ position: "relative", cursor: "pointer", fontSize: "20px", marginLeft: "5px" }}>
            🛒 {panier.length > 0 && <span className="cart-badge">{panier.length}</span>}
          </div>
        </div>
      </nav>

      {/* FOND D'ÉCRAN */}
      <img src="/resto1.webp" alt="Background" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: -1, filter: "brightness(0.2)" }} />

      <center>
        <div style={{ paddingTop: "100px" }}> {/* Espace pour la navbar qui wrap */}
          <h1 style={{ fontFamily: "Verdana", fontSize: "28px", fontWeight: "bold" }}>
            NOTRE <span style={{ color: "#FFD700" }}>MENU</span>
          </h1>
          
          <p style={{ color: "#FFD700", fontWeight: "bold", letterSpacing: "1px", margin: "10px 0", fontSize: "14px" }}>
            --- DÉCOUVREZ NOS VARIÉTÉS ---
          </p>

          <a href="tel:+2250102030405" style={{ textDecoration: "none" }}>
            <button className="btn-contact-small">📞 SERVICE CLIENT : 01 02 03 04 05</button>
          </a>

          <hr style={{ width: "80%", border: "0.5px solid rgba(255,255,255,0.1)", margin: "30px 0" }} />

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", 
            gap: "20px", 
            maxWidth: "1200px", 
            padding: "0 15px" 
          }}>
            {PLATS.map((plat) => {
              const isSelected = panier.includes(plat.id);
              return (
                <div key={plat.id} className={`card-plat ${isSelected ? 'selected' : ''}`}>
                  {plat.tag && <span className="badge">{plat.tag}</span>}
                  <div className="img-container">
                    <img src={plat.image} alt={plat.nom} className="img-plat" />
                  </div>
                  <div style={{ padding: "15px" }}>
                    <h3 style={{ fontSize: "16px", textTransform: "uppercase" }}>{plat.nom}</h3>
                    <p style={{ color: "#FFD700", fontWeight: "bold", fontSize: "18px", margin: "10px 0" }}>{plat.prix}</p>
                    
                    <button onClick={() => commanderPlat(plat.id)} className={`btn-commander ${isSelected ? 'btn-retirer' : ''}`}>
                      {isSelected ? "✖ RETIRER" : "🛒 COMMANDER"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </center>

      <style jsx>{`
        .btn-nav { background: transparent; color: white; border: 1px solid white; padding: 5px 12px; border-radius: 5px; cursor: pointer; font-size: 11px; font-weight: bold; transition: 0.3s; }
        .btn-connexion { background: white; color: black; }
        .btn-nav:hover { background: #FFD700; color: black; border-color: #FFD700; }

        .cart-badge { position: absolute; top: -5px; right: -10px; background: #FFD700; color: black; font-size: 10px; font-weight: bold; padding: 1px 6px; border-radius: 50%; }
        
        .btn-contact-small { background: #28a745; color: white; border: none; padding: 10px 20px; font-size: 11px; font-weight: bold; border-radius: 30px; cursor: pointer; }

        .card-plat { 
          background: rgba(255, 255, 255, 0.08); 
          border-radius: 15px; 
          overflow: hidden; 
          border: 1px solid rgba(255,255,255,0.1); 
          transition: 0.3s; 
          position: relative; 
        }
        
        .card-plat.selected { border: 2px solid #FFD700; box-shadow: 0 0 15px rgba(255, 215, 0, 0.3); }

        .img-container { height: 170px; overflow: hidden; }
        .img-plat { width: 100%; height: 100%; object-fit: cover; opacity: 0.9; }

        .badge { position: absolute; top: 10px; left: 10px; background: #FFD700; color: black; padding: 3px 7px; font-size: 9px; font-weight: bold; border-radius: 4px; z-index: 5; }
        
        .btn-commander { background: #FFD700; color: black; border: none; padding: 10px; width: 100%; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 14px; }
        .btn-retirer { background: #ff4d4d; color: white; }
      `}</style>
    </div>
  );
}