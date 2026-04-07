"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Inscription() {
  // États pour stocker les saisies
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    mdp: "",
    confirmMdp: ""
  });

  const router = useRouter();

  // Fonction pour mettre à jour les champs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fonction de validation
  const handleInscription = (e: React.FormEvent) => {
    e.preventDefault();

    const { nom, prenom, email, mdp, confirmMdp } = formData;

    // 1. Vérifier si des champs sont vides
    if (!nom || !prenom || !email || !mdp || !confirmMdp) {
      alert("Attention : Tous les champs doivent être remplis !");
      return;
    }

    // 2. Vérifier si les mots de passe correspondent
    if (mdp !== confirmMdp) {
      alert("Erreur : Les mots de passe ne sont pas identiques.");
      return;
    }

    // 3. Si tout est OK
    alert("Inscription réussie ! Bienvenue " + prenom);
    router.push("/catalogue");
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", color: "white" }}>
      <img
        src="/resto1.webp"
        alt="Background Inscription"
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
        <br /><br />
        <span style={{ fontFamily: "Verdana", fontSize: "32px", fontWeight: "bold" }}>
          REJOIGNEZ-NOUS
        </span>
        <hr style={{ width: "40%", border: "1px solid white" }} />
        <br />

        <div
          style={{
            backgroundColor: "white",
            display: "inline-block",
            padding: "20px",
            opacity: 0.93,
            borderRadius: "15px",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.4)",
            width: "400px",
            textAlign: "left",
          }}
        >
          <form onSubmit={handleInscription}>
            <label style={labelStyle}>Nom :</label>
            <br />
            <input 
              type="text" 
              name="nom" 
              placeholder="Votre nom" 
              style={inputStyle} 
              onChange={handleChange}
            />
            <br /><br />

            <label style={labelStyle}>Prénom :</label>
            <br />
            <input 
              type="text" 
              name="prenom" 
              placeholder="Votre prénom" 
              style={inputStyle} 
              onChange={handleChange}
            />
            <br /><br />

            <label style={labelStyle}>Email :</label>
            <br />
            <input 
              type="email" 
              name="email" 
              placeholder="exemple@mail.com" 
              style={inputStyle} 
              onChange={handleChange}
            />
            <br /><br />

            <label style={labelStyle}>Mot de Passe :</label>
            <br />
            <input
              type="password"
              name="mdp"
              placeholder="Créer un mot de passe"
              style={inputStyle}
              onChange={handleChange}
            />
            <br /><br />

            <label style={labelStyle}>Confirmer le mot de passe :</label>
            <br />
            <input
              type="password"
              name="confirmMdp"
              placeholder="Répéter le mot de passe"
              style={inputStyle}
              onChange={handleChange}
            />
            <br /><br />

            <center>
              <button
                type="submit"
                style={{
                  width: "100%",
                  height: "45px",
                  cursor: "pointer",
                  backgroundColor: "#8B4513",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "5px",
                  fontSize: "16px",
                  border: "none",
                  marginTop: "10px",
                }}
              >
                S'INSCRIRE ET COMMANDER
              </button>

              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <span style={{ color: "#8B4513", fontSize: "14px", fontFamily: "Arial" }}>
                  Déjà un compte ?{" "}
                </span>
                <Link href="/connexion" style={{ 
                  color: "#8B4513", 
                  fontSize: "14px", 
                  textDecoration: "underline", 
                  fontWeight: "bold",
                  fontFamily: "Arial"
                }}>
                  Se connecter ici
                </Link>
              </div>
            </center>
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

const labelStyle = {
  fontSize: "18px",
  color: "#8B4513",
  fontFamily: "Arial",
  fontWeight: "bold" as const,
};

const inputStyle = {
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "100%",
  marginTop: "5px",
  boxSizing: "border-box" as const,
  color: "black"
};