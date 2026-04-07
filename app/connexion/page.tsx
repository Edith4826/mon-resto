"use client";

import Link from "next/link";
import { useState } from "react"; // Ajout pour gérer les saisies
import { useRouter } from "next/navigation"; // Ajout pour la redirection manuelle

export default function Connexion() {
  const [pseudo, setPseudo] = useState(""); // Stocke le nom
  const [passe, setPasse] = useState("");   // Stocke le mot de passe
  const router = useRouter();

  // Fonction qui gère la validation
  const handleValider = (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page

    if (pseudo.trim() === "" || passe.trim() === "") {
      alert("Veuillez remplir tous les champs avant de continuer !");
    } else {
      // Si c'est bon, on redirige vers le catalogue
      router.push("/catalogue");
    }
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", color: "white" }}>
      <img
        src="/RESTO2.avif"
        alt="Background Restaurant"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          filter: "brightness(0.6)",
        }}
      />

      <center>
        <br /><br /><br />
        <span style={{ fontFamily: "Verdana", fontSize: "32px", fontWeight: "bold" }}>
          IDENTIFICATION
        </span>
        <hr style={{ width: "50%", border: "1px solid white" }} />
        <br /><br />

        <div
          style={{
            backgroundColor: "white",
            display: "inline-block",
            padding: "40px",
            opacity: 0.93,
            borderRadius: "10px",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
            textAlign: "left",
          }}
        >
          {/* On ajoute le onSubmit ici */}
          <form onSubmit={handleValider}>
            <label style={{ fontSize: "18px", color: "#8B4513", fontFamily: "Arial", fontWeight: "bold" }}>
              Nom d'utilisateur :
            </label>
            <br />
            <input
              type="text"
              placeholder="Entrez votre nom"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)} // Met à jour le pseudo
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "250px",
                marginTop: "5px",
                color: "black"
              }}
            />

            <br /><br />

            <label style={{ fontSize: "18px", color: "#8B4513", fontFamily: "Arial", fontWeight: "bold" }}>
              Mot de passe :
            </label>
            <br />
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              value={passe}
              onChange={(e) => setPasse(e.target.value)} // Met à jour le mot de passe
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "250px",
                marginTop: "5px",
                color: "black"
              }}
            />

            <div style={{ marginTop: "10px", textAlign: "right" }}>
              <Link href="/inscription" style={{ color: "#8B4513", fontSize: "14px", textDecoration: "none", fontFamily: "Arial", fontWeight: "bold" }}>
                Mot de passe oublié ?
              </Link>
            </div>

            <br />

            {/* Suppression du <Link> autour du bouton */}
            <button
              type="submit"
              style={{
                width: "250px",
                height: "45px",
                cursor: "pointer",
                backgroundColor: "#8B4513",
                color: "white",
                fontWeight: "bold",
                borderRadius: "5px",
                fontSize: "16px",
                border: "none",
              }}
            >
              VALIDER ET VOIR LE MENU
            </button>

            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <span style={{ color: "#8B4513", fontSize: "14px", fontFamily: "Arial" }}>
                Pas encore de compte ?{" "}
              </span>
              <Link href="/inscription" style={{ color: "#8B4513", fontSize: "14px", textDecoration: "underline", fontWeight: "bold", fontFamily: "Arial" }}>
                S'inscrire ici
              </Link>
            </div>
          </form>
        </div>

        <br /><br />
        <Link href="/" style={{ color: "white", fontFamily: "Verdana", textDecoration: "none" }}>
          <b>[ Retour à l'accueil ]</b>
        </Link>
      </center>
    </div>
  );
}