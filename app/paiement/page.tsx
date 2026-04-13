"use client";

import React from "react";
import Link from "next/link";

export default function Paiement() {
  return (
    <div style={{ backgroundColor: "#FDF5E6", minHeight: "100vh", padding: "40px 20px" }}>
      <center>
        <h1 style={{ color: "#5D2E0A", fontWeight: "900", fontFamily: "Verdana" }}>
          FINALISER VOTRE COMMANDE
        </h1>
        <div style={{ width: "80px", height: "4px", backgroundColor: "#8B4513", margin: "10px 0 30px" }}></div>

        <div style={{ 
          backgroundColor: "white", 
          padding: "30px", 
          borderRadius: "20px", 
          maxWidth: "500px", 
          border: "2px solid #8B4513",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
        }}>
          
          {/* PANIER - Cliquable pour modifier */}
          <Link href="/catalogue" style={{ textDecoration: "none" }}>
            <div style={{ 
              backgroundColor: "#FFF8E1", 
              borderLeft: "5px solid #FFD700", 
              padding: "15px", 
              borderRadius: "8px",
              textAlign: "left",
              marginBottom: "25px",
              cursor: "pointer"
            }}>
              <p style={{ color: "#5D2E0A", margin: 0 }}>
                <b>Votre panier (cliquez pour modifier) :</b><br />
                <span style={{ color: "#333" }}>1x Attieke Poisson + 1x Jus de Bissap</span>
              </p>
            </div>
          </Link>

          {/* FORMULAIRE - TEXTES BIEN FONCÉS */}
          <div style={{ textAlign: "left", marginBottom: "20px" }}>
            <label style={{ color: "#5D2E0A", fontWeight: "bold", display: "block", marginBottom: "8px" }}>
              Adresse de livraison : *
            </label>
            <input 
              type="text" 
              placeholder="Ex: Cocody, Angré 7ème tranche"
              style={inputStyle}
            />
          </div>

          <div style={{ textAlign: "left", marginBottom: "20px" }}>
            <label style={{ color: "#5D2E0A", fontWeight: "bold", display: "block", marginBottom: "8px" }}>
              Numéro de téléphone : *
            </label>
            <input 
              type="text" 
              placeholder="Ex: 07 00 00 00 00"
              style={inputStyle}
            />
          </div>

          <div style={{ textAlign: "left", marginBottom: "30px" }}>
            <label style={{ color: "#5D2E0A", fontWeight: "bold", display: "block", marginBottom: "8px" }}>
              Mode de paiement :
            </label>
            <select style={inputStyle}>
              <option>Paiement à la livraison (Cash)</option>
              <option>Mobile Money (Orange/MTN/Moov)</option>
            </select>
          </div>

          {/* TOTAL */}
          <div style={{ border: "2px dashed #FFD700", padding: "15px", borderRadius: "10px", marginBottom: "25px" }}>
            <p style={{ color: "#666", margin: "0 0 5px" }}>Total à payer :</p>
            <h2 style={{ color: "#2E7D32", margin: 0, fontSize: "32px", fontWeight: "900" }}>5 500 F CFA</h2>
          </div>

          <Link href="/confirmation">
            <button style={{ 
              backgroundColor: "#2E7D32", 
              color: "white", 
              width: "100%", 
              padding: "18px", 
              borderRadius: "12px", 
              border: "none", 
              fontWeight: "bold", 
              fontSize: "18px",
              cursor: "pointer"
            }}>
              CONFIRMER LE PAIEMENT
            </button>
          </Link>
          
          <p style={{ fontSize: "12px", color: "#8B4513", marginTop: "15px" }}>
            🔒 Paiement sécurisé & sans frais cachés
          </p>
        </div>

        {/* LIEN MODIFIER EN BAS - ENFIN VISIBLE */}
        <br />
        <Link href="/catalogue" style={{ 
          color: "#5D2E0A", 
          textDecoration: "underline", 
          fontWeight: "bold",
          fontSize: "16px",
          display: "block",
          padding: "10px"
        }}>
          ← Modifier ma commande (voir le Catalogue)
        </Link>
        <br />
      </center>
    </div>
  );
}

// Style commun pour les champs
const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "2px solid #8B4513",
  backgroundColor: "white",
  color: "#222", // Texte noir pour éviter le flou
  fontSize: "16px",
  outline: "none"
};