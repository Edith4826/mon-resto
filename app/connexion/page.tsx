"use client";

import Link from "next/link";
import { useState } from "react"; 
import { useRouter } from "next/navigation"; 

export default function Connexion() {
  const [pseudo, setPseudo] = useState(""); 
  const [passe, setPasse] = useState("");   
  const [estConnecte, setEstConnecte] = useState(false); // État pour afficher les options après connexion
  const router = useRouter();

  const handleValider = (e: React.FormEvent) => {
    e.preventDefault(); 
    const nomSaisi = pseudo.trim().toLowerCase();
    const motDePasseSaisi = passe.trim();

    if (nomSaisi === "" || motDePasseSaisi === "") {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    // Simulation de connexion
    if (nomSaisi === "admin" && motDePasseSaisi === "1234") {
      alert("Bienvenue Chef ! Accès à l'administration...");
      router.push("/admin"); 
    } else {
      // Au lieu de rediriger direct, on débloque les boutons d'action
      setEstConnecte(true);
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
          filter: "brightness(0.4)",
        }}
      />

      <center>
        <br /><br /><br />
        <span style={{ fontFamily: "Verdana", fontSize: "32px", fontWeight: "bold", letterSpacing: "3px" }}>
          IDENTIFICATION
        </span>
        <hr style={{ width: "200px", border: "2px solid #FFD700", marginTop: "10px" }} />
        <br /><br />

        <div className="login-card">
          <center>
            <img 
              src="/logo.jpeg" 
              style={{ width: "60px", borderRadius: "50%", marginBottom: "20px", border: "2px solid #8B4513" }} 
              alt="Logo" 
            />
          </center>

          {!estConnecte ? (
            <form onSubmit={handleValider}>
              <label className="label-style">Nom d'utilisateur :</label>
              <input
                type="text"
                placeholder="Ex: Malan"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)} 
                className="input-style"
              />
              <br /><br />
              <label className="label-style">Mot de passe :</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passe}
                onChange={(e) => setPasse(e.target.value)} 
                className="input-style"
              />
              
              <div style={{ marginTop: "10px", textAlign: "right" }}>
                <Link href="/inscription" style={{ color: "#8B4513", fontWeight: "bold", fontSize: "13px", textDecoration: "none" }}>
                  Mot de passe oublié ?
                </Link>
              </div>
              <br />
              <button type="submit" className="btn-submit">SE CONNECTER</button>
            </form>
          ) : (
            /* NOUVELLES OPTIONS APRÈS CONNEXION */
            <div className="success-actions">
              <div className="success-msg">✅ Connexion réussie !</div>
              <p style={{ color: "#555", fontSize: "14px", marginBottom: "20px" }}>Que souhaitez-vous faire ?</p>
              
              <button onClick={() => router.push("/paiement")} className="btn-primary">
                 💳 ALLER AU PAIEMENT
              </button>
              
              <div className="divider-text">OU</div>

              <button onClick={() => router.push("/catalogue")} className="btn-secondary">
                 🍽️ VOIR LE CATALOGUE
              </button>
            </div>
          )}

          <div style={{ marginTop: "25px", textAlign: "center" }}>
            <span style={{ color: "#5D2E0C", fontSize: "14px" }}>Pas encore de compte ? </span>
            <Link href="/inscription" style={{ color: "#8B4513", fontWeight: "bold", fontSize: "14px" }}>
              S'inscrire ici
            </Link>
          </div>
        </div>

        <br /><br />
        <Link href="/" style={{ color: "white", fontFamily: "Verdana", textDecoration: "none", opacity: 0.9 }}>
          <b>← Retour à l'accueil</b>
        </Link>
      </center>

      <style jsx>{`
        .login-card {
          background-color: #ffffff;
          display: inline-block;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0px 15px 35px rgba(0,0,0,0.5);
          text-align: left;
          width: 380px;
          animation: slideUp 0.6s ease;
        }

        .success-actions { text-align: center; animation: fadeIn 0.5s ease; }
        .success-msg { color: #2E7D32; font-weight: bold; font-size: 18px; margin-bottom: 10px; }
        
        .btn-primary {
          width: 100%;
          padding: 15px;
          background: #2E7D32;
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: bold;
          cursor: pointer;
          margin-bottom: 10px;
          transition: 0.3s;
        }

        .btn-secondary {
          width: 100%;
          padding: 12px;
          background: white;
          color: #8B4513;
          border: 2px solid #8B4513;
          border-radius: 10px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        .divider-text { color: #888; font-size: 12px; margin: 10px 0; font-weight: bold; }

        .btn-primary:hover { background: #1B5E20; transform: scale(1.02); }
        .btn-secondary:hover { background: #fdf5e6; }

        .label-style { font-size: 13px; color: #5D2E0C; font-weight: bold; text-transform: uppercase; display: block; margin-bottom: 5px; }
        .input-style { padding: 12px; border-radius: 8px; border: 2px solid #ddd; width: 100%; color: black; font-size: 16px; }
        .btn-submit { width: 100%; height: 50px; background-color: #8B4513; color: white; font-weight: bold; border-radius: 10px; border: none; cursor: pointer; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}