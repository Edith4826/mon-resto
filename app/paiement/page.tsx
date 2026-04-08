"use client";

import Link from "next/link";
import { useState } from "react";

export default function Paiement() {
  const [etape, setEtape] = useState("formulaire");

  const handleConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    setEtape("confirmation");
  };

  return (
    <div className="paiement-container">
      <center>
        <br />
        <h1 className="main-title">FINALISER VOTRE COMMANDE</h1>
        <div className="title-underline"></div>

        <div className="payment-card">
          {etape === "formulaire" ? (
            <form onSubmit={handleConfirmation}>
              {/* RÉCAPITULATIF RAPIDE */}
              <div className="recap-section">
                <span className="recap-title">Votre panier :</span>
                <p>1x Attieke Poisson + 1x Jus de Bissap</p>
              </div>

              <div className="input-group">
                <label>Adresse de livraison : *</label>
                <input type="text" placeholder="Ex: Cocody, Angré 7ème tranche" required />
              </div>

              <div className="input-group">
                <label>Numéro de téléphone : *</label>
                <input type="tel" placeholder="Ex: 07 00 00 00 00" required />
              </div>

              <div className="input-group">
                <label>Mode de paiement :</label>
                <select className="select-style">
                  <option>Paiement à la livraison (Cash)</option>
                  <option>Orange Money</option>
                  <option>Wave</option>
                  <option>MTN / Moov Money</option>
                </select>
              </div>

              <div className="total-box">
                <span className="total-label">Total à payer :</span>
                <span className="total-price">5 500 F CFA</span>
              </div>

              <button type="submit" className="btn-confirm">
                CONFIRMER LE PAIEMENT
              </button>
              
              <p className="security-note">🔒 Paiement sécurisé & sans frais cachés</p>
            </form>
          ) : (
            <div className="success-view">
              <div className="check-icon">✅</div>
              <h2>COMMANDE ENVOYÉE !</h2>
              <p>Votre repas est en cours de préparation.</p>
              <p>Estimation : <b>35 min</b></p>
              <Link href="/catalogue">
                <button className="btn-secondary">Retour au menu</button>
              </Link>
            </div>
          )}
        </div>

        <br />
        <Link href="/catalogue" className="back-link">
          ← Modifier ma commande
        </Link>
      </center>

      <style jsx>{`
        .paiement-container {
          background-color: #FDF5E6;
          min-height: 100vh;
          padding: 40px 20px;
        }
        .main-title { color: #5D2E0C; font-weight: 900; font-size: 32px; }
        .title-underline { width: 400px; height: 3px; background: #8B4513; margin: 10px auto 40px; }

        .payment-card {
          background: white;
          border: 2px solid #8B4513;
          border-radius: 20px;
          padding: 30px;
          width: 100%;
          max-width: 450px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          text-align: left;
        }

        .recap-section {
          background: #fdf5e6;
          padding: 10px 15px;
          border-radius: 10px;
          margin-bottom: 20px;
          border-left: 4px solid #FFD700;
          color: #5D2E0C;
        }
        .recap-title { font-weight: bold; font-size: 14px; }

        .input-group { margin-bottom: 15px; }
        .input-group label { display: block; font-weight: bold; color: #8B4513; margin-bottom: 5px; font-size: 15px; }
        input, .select-style {
          width: 100%;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
          outline: none;
        }
        input:focus { border-color: #2E7D32; }

        .total-box {
          border: 2px dashed #FFD700;
          padding: 15px;
          text-align: center;
          margin: 20px 0;
          border-radius: 10px;
          background: #fffdf0;
        }
        .total-label { display: block; color: #555; }
        .total-price { font-size: 24px; font-weight: 900; color: #2E7D32; }

        .btn-confirm {
          width: 100%;
          background: #2E7D32;
          color: white;
          border: none;
          padding: 15px;
          border-radius: 10px;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s;
        }
        .btn-confirm:hover { background: #1B5E20; transform: scale(1.02); }

        .security-note { text-align: center; font-size: 12px; color: #888; margin-top: 10px; }
        .back-link { color: #8B4513; text-decoration: none; font-weight: bold; }
        
        .success-view { text-align: center; padding: 20px; }
        .check-icon { font-size: 50px; margin-bottom: 10px; }
        .btn-secondary { background: white; border: 1px solid #8B4513; color: #8B4513; padding: 10px 20px; border-radius: 8px; cursor: pointer; margin-top: 15px; }
      `}</style>
    </div>
  );
}