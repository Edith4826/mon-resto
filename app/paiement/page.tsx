"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Paiement() {
  const router = useRouter();

  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [erreur, setErreur] = useState(""); // Changé en string pour être plus précis

  // --- 1. LOGIQUE DU MASQUE DE SAISIE (CHIFFRES UNIQUEMENT) ---
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valeur = e.target.value;
    // On garde uniquement les chiffres via une expression régulière
    const chiffresSeuls = valeur.replace(/\D/g, "");
    
    // On limite à 10 chiffres (standard Côte d'Ivoire)
    if (chiffresSeuls.length <= 10) {
      setTelephone(chiffresSeuls);
    }
  };

  const gererValidation = () => {
    if (adresse.trim() === "" || telephone.trim() === "") {
      setErreur("⚠️ Veuillez remplir l'adresse et le téléphone !");
    } else if (telephone.length < 10) {
      setErreur("⚠️ Le numéro de téléphone doit comporter 10 chiffres.");
    } else {
      setErreur("");
      router.push("/confirmation");
    }
  };

  return (
    <div style={{ backgroundColor: "#FDF5E6", minHeight: "100vh", padding: "20px" }}>
      <center>
        <br />
        <span style={{ fontFamily: "Verdana", fontSize: "32px", color: "#8B4513", fontWeight: "bold" }}>
          FINALISER VOTRE COMMANDE
        </span>
        <hr style={{ width: "70%", border: "1px solid #8B4513", margin: "20px 0" }} />
        <br />

        <div style={{
          backgroundColor: "white",
          display: "inline-block",
          padding: "30px",
          border: "2px solid #8B4513",
          borderRadius: "15px",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
          textAlign: "left",
          width: "450px"
        }}>
          <form>
            <label style={labelStyle}>Adresse de livraison :</label><br />
            <input 
              type="text" 
              placeholder="Ex: Cocody, Angré 7ème tranche" 
              style={inputStyle}
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
            /><br /><br />

            <label style={labelStyle}>Numéro de téléphone :</label><br />
            <input 
              type="text" // On utilise text pour mieux contrôler la saisie
              inputMode="numeric" // Affiche le pavé numérique sur mobile
              placeholder="Ex: 0748264368" 
              style={inputStyle}
              value={telephone}
              onChange={handlePhoneChange} 
            /><br /><br />

            <label style={labelStyle}>Mode de paiement :</label><br />
            <select style={inputStyle}>
              <option>Paiement à la livraison (Cash)</option>
              <option>Orange Money</option>
              <option>MTN MoMo</option>
              <option>Wave</option>
            </select>
            <br /><br />

            {/* --- 2. RÉCAPITULATIF DU PRIX --- */}
            <div style={{ 
              backgroundColor: "#FFF9E6", 
              padding: "15px", 
              borderRadius: "10px", 
              border: "1px dashed #8B4513",
              marginBottom: "15px",
              textAlign: "center"
            }}>
              <span style={{ color: "#333", fontSize: "16px", fontWeight: "bold" }}>Total à payer :</span>
              <br />
              <span style={{ color: "#2E7D32", fontSize: "24px", fontWeight: "bold" }}>5 500 F CFA</span>
            </div>

            {/* MESSAGE D'ERREUR */}
            {erreur && (
              <p style={{ color: "red", fontWeight: "bold", textAlign: "center", fontSize: "14px" }}>
                {erreur}
              </p>
            )}

            <center>
              <button 
                type="button" 
                onClick={gererValidation}
                style={{
                  width: "100%",
                  height: "50px",
                  backgroundColor: "#2E7D32",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "18px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  transition: "0.3s"
                }}
              >
                CONFIRMER LE PAIEMENT
              </button>
            </center>
          </form>
        </div>

        <br /><br />
        <Link href="/catalogue" style={{ color: "#8B4513", fontFamily: "Verdana", textDecoration: "none" }}>
          <b>← Retour au catalogue</b>
        </Link>
      </center>
    </div>
  );
}

const labelStyle = {
  fontSize: "18px",
  color: "#8B4513",
  fontFamily: "Arial",
  fontWeight: "bold" as const,
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  boxSizing: "border-box" as const,
  fontSize: "16px",
  color: "black"
};