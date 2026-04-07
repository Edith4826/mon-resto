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
          <p style={{ fontFamily: "Arial", color: "#8B4513", fontWeight: "bold", marginTop: "20px" }}>
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
      
      <div style={{ 
        backgroundColor: "#2E7D32", 
        color: "white", 
        width: "100px", 
        height: "100px", 
        borderRadius: "50%", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        fontSize: "50px",
        marginBottom: "20px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)"
      }}>
        ✓
      </div>

      <h1 style={{ 
        fontFamily: "Verdana", 
        color: "#8B4513", 
        fontSize: "32px", 
        fontWeight: "bold",
        margin: "10px 0"
      }}>
        COMMANDE VALIDÉE !
      </h1>
      
      <div style={{ backgroundColor: "#8B4513", color: "white", padding: "5px 15px", borderRadius: "20px", fontSize: "14px", fontWeight: "bold", marginBottom: "10px" }}>
        N° DE COMMANDE : {numCommande}
      </div>

      <p style={{ 
        fontFamily: "Arial", 
        fontSize: "18px", 
        color: "#333", 
        maxWidth: "450px", 
        lineHeight: "1.6",
        margin: "20px 0"
      }}>
        Merci pour votre confiance. Votre plat est en cours de préparation et sera livré dans <b>30 à 45 minutes</b>.
      </p>

      {/* RÉCAPITULATIF MIS À JOUR AVEC TES INFOS */}
      <div style={{ 
        backgroundColor: "white", 
        padding: "20px", 
        borderRadius: "10px", 
        border: "1px dashed #8B4513",
        marginBottom: "30px",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.05)",
        width: "100%",
        maxWidth: "350px"
      }}>
        <span style={{ color: "#8B4513", fontWeight: "bold", fontSize: "18px" }}>
          Récapitulatif de livraison
        </span>
        <br />
        <div style={{ textAlign: "left", marginTop: "15px", fontSize: "15px", color: "#333" }}>
           📍 <b>Lieu :</b> Angré 8ème tranche<br />
           📱 <b>Contact :</b> 0748264368<br />
           💳 <b>Paiement :</b> Cash à la livraison
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px", width: "100%", maxWidth: "300px" }}>
        
        <Link href="/catalogue">
          <button style={primaryBtn}>
            REPASSER UNE COMMANDE
          </button>
        </Link>

        <Link href="/paiement">
          <button style={secondaryBtn}>
            MODIFIER MES INFOS
          </button>
        </Link>

        <Link href="/" style={{ color: "#8B4513", textDecoration: "none", fontSize: "14px", marginTop: "10px", fontFamily: "Arial" }}>
          <b>← Retour à l'accueil</b>
        </Link>
      </div>
    </div>
  );
}

const primaryBtn = {
  backgroundColor: "#8B4513", color: "white", padding: "15px", width: "100%", borderRadius: "10px", border: "none", fontWeight: "bold" as const, cursor: "pointer", fontSize: "16px"
};

const secondaryBtn = {
  backgroundColor: "transparent", color: "#8B4513", padding: "15px", width: "100%", borderRadius: "10px", border: "2px solid #8B4513", fontWeight: "bold" as const, cursor: "pointer", fontSize: "16px"
};