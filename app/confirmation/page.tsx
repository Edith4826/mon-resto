"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Confirmation() {
  const [numCommande, setNumCommande] = useState("");
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const randomNum = "RD-" + Math.floor(1000 + Math.random() * 9000);
    setNumCommande(randomNum);

    const timer = setTimeout(() => {
      setChargement(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (chargement) {
    return (
      <div style={{ backgroundColor: "#FDF5E6", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div className="spinner"></div>
          <p style={{ fontFamily: "Arial", color: "#5D2E0A", fontWeight: "bold", marginTop: "20px" }}>
            Traitement de votre commande...
          </p>
        </div>
        <style jsx>{`
          .spinner {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #2E7D32;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      backgroundColor: "#FDF5E6", 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center",
      textAlign: "center",
      padding: "20px"
    }}>
      
      {/* Icône de validation - Bien contrastée */}
      <div style={{ 
        backgroundColor: "#2E7D32", 
        color: "white", 
        width: "80px", 
        height: "80px", 
        borderRadius: "50%", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        fontSize: "40px",
        marginBottom: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>
        ✓
      </div>

      {/* Titre en Marron Foncé (plus de flou) */}
      <h1 style={{ 
        fontFamily: "Verdana", 
        color: "#5D2E0A", 
        fontSize: "28px", 
        fontWeight: "bold",
        margin: "10px 0"
      }}>
        COMMANDE ENVOYÉE !
      </h1>
      
      {/* Texte en Gris très foncé/Noir */}
      <p style={{ 
        fontFamily: "Arial", 
        fontSize: "18px", 
        color: "#222222", 
        maxWidth: "450px", 
        lineHeight: "1.6",
        margin: "10px 0"
      }}>
        Votre repas est en cours de préparation.<br/>
        Estimation : <b style={{color: "#2E7D32"}}>35 min</b>
      </p>

      {/* Liens de navigation vers Accueil et Catalogue */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", width: "100%", maxWidth: "300px", marginTop: "30px" }}>
        
        <Link href="/catalogue">
          <button style={primaryBtn}>
            RETOUR AU CATALOGUE
          </button>
        </Link>

        <Link href="/">
          <button style={secondaryBtn}>
            RETOUR À L'ACCUEIL
          </button>
        </Link>

        <Link href="/paiement" style={{ color: "#8B4513", textDecoration: "underline", fontSize: "14px", marginTop: "10px", fontWeight: "bold" }}>
          Modifier ma commande
        </Link>
      </div>
    </div>
  );
}

const primaryBtn = {
  backgroundColor: "#8B4513", 
  color: "white", 
  padding: "15px", 
  width: "100%", 
  borderRadius: "10px", 
  border: "none", 
  fontWeight: "bold" as const, 
  cursor: "pointer", 
  fontSize: "16px"
};

const secondaryBtn = {
  backgroundColor: "white", 
  color: "#8B4513", 
  padding: "15px", 
  width: "100%", 
  borderRadius: "10px", 
  border: "2px solid #8B4513", 
  fontWeight: "bold" as const, 
  cursor: "pointer", 
  fontSize: "16px"
};