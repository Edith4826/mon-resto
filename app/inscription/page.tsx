"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Inscription() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    mdp: "",
    confirmMdp: ""
  });
  
  const [estInscrit, setEstInscrit] = useState(false); // État pour afficher les choix après succès
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInscription = (e: React.FormEvent) => {
    e.preventDefault();
    const { nom, prenom, email, mdp, confirmMdp } = formData;

    if (!nom || !prenom || !email || !mdp || !confirmMdp) {
      alert("Attention : Tous les champs doivent être remplis !");
      return;
    }

    if (mdp !== confirmMdp) {
      alert("Erreur : Les mots de passe ne sont pas identiques.");
      return;
    }

    // Si tout est OK, on affiche les options de redirection
    setEstInscrit(true);
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
          filter: "brightness(0.5)",
        }}
      />

      <center>
        <br /><br />
        <span style={{ fontFamily: "Verdana", fontSize: "32px", fontWeight: "bold", letterSpacing: "2px" }}>
          REJOIGNEZ-NOUS
        </span>
        <hr style={{ width: "150px", border: "2px solid #FFD700", marginTop: "10px" }} />
        <br />

        <div className="inscription-card">
          {!estInscrit ? (
            <form onSubmit={handleInscription}>
              <div className="form-grid">
                <div>
                  <label style={labelStyle}>NOM :</label>
                  <input type="text" name="nom" placeholder="Votre nom" style={inputStyle} onChange={handleChange} />
                </div>
                <div style={{ marginTop: "15px" }}>
                  <label style={labelStyle}>PRÉNOM :</label>
                  <input type="text" name="prenom" placeholder="Votre prénom" style={inputStyle} onChange={handleChange} />
                </div>
              </div>

              <div style={{ marginTop: "15px" }}>
                <label style={labelStyle}>EMAIL :</label>
                <input type="email" name="email" placeholder="exemple@mail.com" style={inputStyle} onChange={handleChange} />
              </div>

              <div style={{ marginTop: "15px" }}>
                <label style={labelStyle}>MOT DE PASSE :</label>
                <input type="password" name="mdp" placeholder="Créer un mot de passe" style={inputStyle} onChange={handleChange} />
              </div>

              <div style={{ marginTop: "15px" }}>
                <label style={labelStyle}>CONFIRMATION :</label>
                <input type="password" name="confirmMdp" placeholder="Répéter le mot de passe" style={inputStyle} onChange={handleChange} />
              </div>

              <button type="submit" className="btn-submit">
                CRÉER MON COMPTE
              </button>
            </form>
          ) : (
            /* OPTIONS APRÈS INSCRIPTION RÉUSSIE */
            <div className="success-container">
              <div className="success-icon">🎉</div>
              <h2 style={{ color: "#2E7D32", margin: "10px 0" }}>Bienvenue, {formData.prenom} !</h2>
              <p style={{ color: "#555", marginBottom: "20px" }}>Votre compte a été créé avec succès. Que voulez-vous faire ?</p>
              
              <button onClick={() => router.push("/paiement")} className="btn-pay">
                 💳 PASSER AU PAIEMENT
              </button>
              
              <div className="or-text">OU</div>

              <button onClick={() => router.push("/catalogue")} className="btn-catalogue">
                 🍴 VOIR LE CATALOGUE
              </button>
            </div>
          )}

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <span style={{ color: "#5D2E0C", fontSize: "14px" }}>Déjà un compte ? </span>
            <Link href="/connexion" style={{ color: "#8B4513", fontWeight: "bold", textDecoration: "underline" }}>
              Se connecter ici
            </Link>
          </div>
        </div>

        <br /><br />
        <Link href="/" style={{ color: "white", fontFamily: "Verdana", textDecoration: "none", opacity: 0.8 }}>
          <b>← Retour à l'accueil</b>
        </Link>
      </center>

      <style jsx>{`
        .inscription-card {
          background-color: rgba(255, 255, 255, 0.95);
          display: inline-block;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0px 15px 35px rgba(0,0,0,0.4);
          width: 400px;
          text-align: left;
          animation: fadeIn 0.5s ease;
        }

        .btn-submit {
          width: 100%;
          height: 50px;
          background-color: #8B4513;
          color: white;
          font-weight: bold;
          border-radius: 10px;
          border: none;
          margin-top: 25px;
          cursor: pointer;
          transition: 0.3s;
        }
        .btn-submit:hover { background: #5D2E0C; transform: translateY(-2px); }

        .success-container { text-align: center; padding: 10px 0; }
        .success-icon { font-size: 50px; }
        
        .btn-pay {
          width: 100%;
          padding: 15px;
          background: #2E7D32;
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }
        .btn-pay:hover { background: #1B5E20; transform: scale(1.02); }

        .btn-catalogue {
          width: 100%;
          padding: 12px;
          background: white;
          color: #8B4513;
          border: 2px solid #8B4513;
          border-radius: 12px;
          font-weight: bold;
          cursor: pointer;
        }
        .or-text { margin: 10px 0; color: #888; font-weight: bold; font-size: 12px; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

const labelStyle = {
  fontSize: "13px",
  color: "#5D2E0C",
  fontFamily: "Arial",
  fontWeight: "bold" as const,
  textTransform: "uppercase" as const,
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  width: "100%",
  marginTop: "5px",
  boxSizing: "border-box" as const,
  color: "black",
  fontSize: "15px"
};