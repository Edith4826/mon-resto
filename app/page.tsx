"use client";

import Link from "next/link";

export default function Accueil() {
  return (
    <div style={{ minHeight: "100vh", position: "relative", color: "white" }}>
      {/* 1. L'IMAGE DE FOND */}
      <img
        src="/resto1.webp"
        alt="Background Restaurant"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          filter: "brightness(0.5)",
        }}
      />

      <center>
        <br />
        <br />
        {/* 2. TON LOGO */}
        <img
          src="/logo.jpeg"
          alt="Logo Restaurant"
          style={{
            width: "150px",
            borderRadius: "50%",
            border: "3px solid white",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.5)",
          }}
        />

        <br />
        <br />

        {/* 3. LE TITRE */}
        <h1
          style={{
            fontFamily: "Verdana",
            fontSize: "45px",
            fontWeight: "bold",
            textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          BIENVENUE CHEZ <span style={{ color: "#FFD700" }}>RESTO les Délices</span>
        </h1>

        <p style={{ fontSize: "20px", fontFamily: "Arial", fontWeight: "bold" }}>
          L'excellence culinaire à portée de clic.
        </p>

        <br />
        <hr style={{ width: "60%", border: "1px solid white" }} />
        <br />
        <br />

        {/* 4. LES BOUTONS DE NAVIGATION */}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
          
          {/* Bouton Connexion (Marron -> plus clair) */}
          <Link href="/connexion">
            <button className="btn btn-primary">
              SE CONNECTER
            </button>
          </Link>

          {/* Bouton Inscription (Blanc -> Marron clair) */}
          <Link href="/inscription">
            <button className="btn btn-secondary">
              S'INSCRIRE
            </button>
          </Link>

          {/* Bouton Administrateur (Orange -> plus clair) */}
          <Link href="/admin">
            <button className="btn btn-admin">
              Administrateur
            </button>
          </Link>
          
        </div>
      </center>

      {/* --- NOUVEAU : LA LOGIQUE CSS POUR L'EFFET HOVER --- */}
      <style jsx>{`
        /* Style de base commun à tous les boutons */
        .btn {
          padding: 15px 40px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          border-radius: 30px;
          transition: all 0.3s ease-in-out; /* Pour une animation fluide */
          min-width: 200px;
          outline: none;
        }

        /* Effet de survol (hover) commun : Grossit légèrement et ajoute de l'ombre */
        .btn:hover {
          transform: scale(1.05); /* Grossit de 5% */
          box-shadow: 0px 6px 20px rgba(255, 255, 255, 0.3); /* Ombre lumineuse */
        }

        /* Bouton Primaire (Connexion) */
        .btn-primary {
          background-color: #8B4513;
          color: white;
          border: 2px solid white;
        }
        .btn-primary:hover {
          background-color: #A0522D; /* Marron plus clair */
        }

        /* Bouton Secondaire (Inscription) */
        .btn-secondary {
          background-color: white;
          color: #8B4513;
          border: 2px solid #8B4513;
        }
        .btn-secondary:hover {
          background-color: #FDF5E6; /* Blanc cassé */
        }

        /* Bouton Admin */
        .btn-admin {
          background-color: #FFA500;
          color: white;
          border: 2px solid white;
        }
        .btn-admin:hover {
          background-color: #FFB347; /* Orange plus clair */
        }
      `}</style>
    </div>
  );
}

// J'ai supprimé l'ancien helper buttonStyle car on utilise maintenant les classes CSS