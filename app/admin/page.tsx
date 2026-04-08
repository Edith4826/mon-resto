"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Interfaces existantes
interface User { id: number; nom: string; email: string; statut: "Connecté" | "Déconnecté"; methode: string; inscrit: string; genre: "H" | "F" | "EH" | "EF"; }
interface Histo { nom: string; action: string; heure: string; }
interface Commande { id: number; client: string; plat: string; heure: string; etat: "Validé" | "Annulé"; }

// --- NOUVELLES INTERFACES ---
interface Employe { id: number; nom: string; role: "Livreur" | "Cuisinier" | "Serveur"; contact: string; statut: "En service" | "Repos"; }
interface Fournisseur { id: number; entreprise: string; produit: string; contact: string; }
interface Stock { id: number; article: string; quantite: number; unite: string; niveau: "Bon" | "Critique"; }

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("sessions");
  const [search, setSearch] = useState("");
  const [typeRecherche, setTypeRecherche] = useState<"" | "Validé" | "Annulé">("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Données Utilisateurs (Gardées intactes)
  const [users, setUsers] = useState<User[]>([
    { id: 1, nom: "Koné Issa", email: "issa@mail.com", statut: "Connecté", methode: "Orange Money", inscrit: "07/04/2026", genre: "H" },
    { id: 2, nom: "Tano Ama Danielle", email: "danielle@mail.com", statut: "Connecté", methode: "Wave", inscrit: "07/04/2026", genre: "F" },
    { id: 3, nom: "Koffi Axel", email: "axel@mail.com", statut: "Connecté", methode: "Espèces", inscrit: "07/04/2026", genre: "EH" },
    { id: 4, nom: "Aya Marie", email: "marie@mail.com", statut: "Connecté", methode: "Wave", inscrit: "07/04/2026", genre: "EF" },
    { id: 5, nom: "Kouadio Olswade", email: "olswade@mail.com", statut: "Connecté", methode: "MTN MoMo", inscrit: "06/04/2026", genre: "H" },
    { id: 6, nom: "Konan Yao", email: "yao@mail.com", statut: "Connecté", methode: "Orange Money", inscrit: "02/04/2026", genre: "H" },
    { id: 7, nom: "Awa Touré", email: "awa@mail.com", statut: "Déconnecté", methode: "MTN MoMo", inscrit: "15/01/2026", genre: "F" },
  ]);

  // --- NOUVELLES DONNÉES ---
  const [employes] = useState<Employe[]>([
    { id: 1, nom: "Traoré Moussa", role: "Livreur", contact: "01020304", statut: "En service" },
    { id: 2, nom: "Bamba Lassina", role: "Livreur", contact: "05060708", statut: "Repos" },
    { id: 3, nom: "Chef Diallo", role: "Cuisinier", contact: "09090909", statut: "En service" },
  ]);

  const [fournisseurs] = useState<Fournisseur[]>([
    { id: 1, entreprise: "Pêcherie Abidjan", produit: "Poissons frais", contact: "27 22 00 11" },
    { id: 2, entreprise: "Grossiste SODECI", produit: "Boissons & Eau", contact: "01 01 02 02" },
  ]);

  const [stocks] = useState<Stock[]>([
    { id: 1, article: "Attiéké", quantite: 50, unite: "Boules", niveau: "Bon" },
    { id: 2, article: "Poisson Carpe", quantite: 3, unite: "Kg", niveau: "Critique" },
  ]);

  const [corbeille, setCorbeille] = useState<User[]>([]);
  const [commandes] = useState<Commande[]>([
    { id: 1, client: "Kouadio Olswade", plat: "Foutou Banane", heure: "10:52", etat: "Annulé" },
    { id: 2, client: "Koné Issa", plat: "Garba Spécial", heure: "10:45", etat: "Validé" },
    { id: 3, client: "Tano Ama Danielle", plat: "Alloco Poisson", heure: "10:50", etat: "Validé" },
  ]);
  const [historique] = useState<Histo[]>([{ nom: "Bamba Sara", action: "Déconnecté", heure: "07:22" }]);

  // Stats augmentées
  const total = users.length;
  const h = users.filter(u => u.genre === "H").length;
  const f = users.filter(u => u.genre === "F").length;
  const e = users.filter(u => u.genre === "EH" || u.genre === "EF").length;
  const nbLivreurs = employes.filter(emp => emp.role === "Livreur").length;
  const stockAlerte = stocks.filter(s => s.niveau === "Critique").length;

  const handleLogout = () => { if (confirm("Voulez-vous vraiment quitter ?")) { window.location.replace("/connexion"); } };
  const deconnecterUser = (id: number) => { setUsers(users.map(u => u.id === id ? { ...u, statut: "Déconnecté" } : u)); };
  const supprimerUser = (user: User) => { setUsers(users.filter(u => u.id !== user.id)); setCorbeille([...corbeille, user]); };
  const restaurerUser = (user: User) => { setCorbeille(corbeille.filter(u => u.id !== user.id)); setUsers([...users, user]); };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5", padding: "20px", color: "#333", fontFamily: "Arial" }}>
      
      {/* HEADER */}
      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
        <div style={{ color: "#000" }}>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>ADMINISTRATION RESTO</h1>
          <p style={{ margin: 0, color: "#666" }}>Gestion Globale • 07 Avril 2026</p>
        </div>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <button onClick={() => setActiveTab("corbeille")} style={{ backgroundColor: activeTab === "corbeille" ? "#f8f9fa" : "white", border: "1px solid #ccc", padding: "10px", borderRadius: "8px", cursor: "pointer", fontSize: "20px" }}>🗑️</button>
            <button onClick={handleLogout} style={{ backgroundColor: "#dc3545", color: "white", padding: "12px 25px", borderRadius: "8px", border: "none", fontWeight: "bold", cursor: "pointer" }}>DÉCONNEXION</button>
        </div>
      </div>

      {/* TABS NAVIGATION (AJOUT DE PERSONNEL ET STOCKS) */}
      <div className="no-print" style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        {["dashboard", "sessions", "commandes", "personnel", "stocks", "inscrits", "historique"].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)} 
            style={{ padding: "12px 20px", backgroundColor: activeTab === tab ? "#000" : "#fff", color: activeTab === tab ? "#fff" : "#000", border: "1px solid #ccc", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", textTransform: "capitalize" }}
          >
            {tab === "stocks" ? "📦 Stocks & Fournisseurs" : tab === "personnel" ? "👥 Personnel" : tab}
          </button>
        ))}
      </div>

      {/* ZONE DE CONTENU */}
      <div style={{ backgroundColor: "white", padding: "25px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", color: "#000" }}>
        
        {activeTab === "dashboard" && (
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "10px", textAlign: "center", minWidth: "120px" }}><b>CLIENTS</b><br/>{total}</div>
            <div style={{ padding: "15px", border: "1px solid #428bca", borderRadius: "10px", textAlign: "center", minWidth: "120px", color: "#428bca" }}><b>LIVREURS</b><br/>{nbLivreurs}</div>
            <div style={{ padding: "15px", border: "1px solid #5cb85c", borderRadius: "10px", textAlign: "center", minWidth: "120px", color: "#5cb85c" }}><b>ENFANTS</b><br/>{e}</div>
            <div style={{ padding: "15px", border: "1px solid #dc3545", borderRadius: "10px", textAlign: "center", minWidth: "120px", color: "#dc3545" }}><b>ALERTES STOCK</b><br/>{stockAlerte}</div>
          </div>
        )}

        {/* ONGLETS EXISTANTS GARDÉS INTACTS */}
        {activeTab === "sessions" && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: "2px solid #000", textAlign: "left" }}><th style={{padding: "10px"}}>NOM</th><th style={{padding: "10px"}}>ACTION</th></tr></thead>
            <tbody>
              {users.filter(u => u.statut === "Connecté").map(u => (
                <tr key={u.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "15px", color: "#000" }}>
                    <b>{u.nom}</b> 
                    <span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", marginLeft: "8px", backgroundColor: (u.genre === "F" || u.genre === "EF") ? "#df80ff" : "#5cb85c" }}></span>
                    <br/><span style={{fontSize: "12px", color: "#666"}}>{u.email}</span>
                  </td>
                  <td style={{ display: "flex", gap: "10px", padding: "15px" }}>
                    <button onClick={() => deconnecterUser(u.id)} style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }}>DÉCONNECTER</button>
                    <button onClick={() => supprimerUser(u)} style={{ backgroundColor: "#ffc107", color: "black", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }}>🗑️ SUPPRIMER</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* --- NOUVEL ONGLET PERSONNEL --- */}
        {activeTab === "personnel" && (
          <div>
            <h3>Gestion des Employés (Livreurs & Cuisiniers)</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ backgroundColor: "#f8f9fa" }}>
                <tr><th style={{padding: "10px", textAlign: "left"}}>NOM</th><th>RÔLE</th><th>CONTACT</th><th>STATUT</th></tr>
              </thead>
              <tbody>
                {employes.map(emp => (
                  <tr key={emp.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "12px" }}><b>{emp.nom}</b></td>
                    <td>{emp.role}</td>
                    <td>{emp.contact}</td>
                    <td><span style={{ color: emp.statut === "En service" ? "green" : "red" }}>● {emp.statut}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- NOUVEL ONGLET STOCKS --- */}
        {activeTab === "stocks" && (
          <div>
            <h3>📦 État des Stocks</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <h4>Articles</h4>
                {stocks.map(s => (
                  <div key={s.id} style={{ padding: "10px", border: "1px solid #eee", marginBottom: "5px", borderRadius: "8px", borderLeft: s.niveau === "Critique" ? "5px solid red" : "5px solid green" }}>
                    <b>{s.article}</b> : {s.quantite} {s.unite} 
                    {s.niveau === "Critique" && <span style={{ color: "red", fontSize: "12px", marginLeft: "10px" }}>⚠️ RÉAPPROVISIONNER !</span>}
                  </div>
                ))}
              </div>
              <div>
                <h4>Fournisseurs</h4>
                {fournisseurs.map(f => (
                  <div key={f.id} style={{ padding: "10px", backgroundColor: "#fdfdfd", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "5px" }}>
                    <b>{f.entreprise}</b> ({f.produit})<br/>
                    <small>📞 {f.contact}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RESTE DU CODE IDENTIQUE */}
        {activeTab === "inscrits" && (
          <>
            <div style={{ position: "relative", marginBottom: "25px" }}>
              <input type="text" placeholder="Rechercher un client..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: "100%", padding: "12px", border: "1px solid #e0e0e0", borderRadius: "12px", fontSize: "15px", outline: "none", color: "#000" }} />
            </div>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 10px" }}>
                <thead><tr style={{ color: "#888", fontSize: "13px" }}><th style={{textAlign: "left", paddingLeft: "20px"}}>Client</th><th style={{textAlign: "left"}}>Paiement</th><th style={{textAlign: "right", paddingRight: "20px"}}>Actions</th></tr></thead>
                <tbody>
                  {users.filter(u => u.nom.toLowerCase().includes(search.toLowerCase())).map(u => (
                    <tr key={u.id} style={{ backgroundColor: "#f8f9fa" }}>
                      <td style={{ padding: "15px 20px", borderRadius: "12px 0 0 12px", fontWeight: "bold" }}>{u.nom}</td>
                      <td>{u.methode}</td>
                      <td style={{ textAlign: "right", paddingRight: "20px", borderRadius: "0 12px 12px 0" }}>
                        <button onClick={() => setSelectedUser(u)} style={{ backgroundColor: "white", color: "#007bff", border: "1px solid #007bff", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", marginRight: "5px" }}>👁️ VOIR</button>
                        <button onClick={() => supprimerUser(u)} style={{ backgroundColor: "white", color: "#dc3545", border: "1px solid #dc3545", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </>
        )}

        {activeTab === "corbeille" && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: "2px solid #dc3545", textAlign: "left" }}><th style={{padding: "10px"}}>NOM</th><th style={{padding: "10px"}}>ACTION</th></tr></thead>
            <tbody>
              {corbeille.map(u => (
                <tr key={u.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "15px", color: "#000" }}>{u.nom}</td>
                  <td><button onClick={() => restaurerUser(u)} style={{ backgroundColor: "#28a745", color: "white", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }}>🔄 RESTAURER</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "historique" && (
           <table style={{ width: "100%", borderCollapse: "collapse" }}>
             <thead><tr style={{ borderBottom: "2px solid #000", textAlign: "left" }}><th style={{padding: "10px"}}>NOM</th><th style={{padding: "10px"}}>ACTION</th><th style={{padding: "10px"}}>HEURE</th></tr></thead>
             <tbody>{historique.map((h, i) => (<tr key={i} style={{ borderBottom: "1px solid #ddd" }}><td style={{ padding: "15px", color: "#000" }}>{h.nom}</td><td style={{ color: "red" }}>{h.action}</td><td style={{ color: "#000" }}>{h.heure}</td></tr>))}</tbody>
           </table>
        )}

        {activeTab === "commandes" && (
          <div>
            <select onChange={(e) => setTypeRecherche(e.target.value as any)} style={{ padding: "10px", borderRadius: "5px", marginBottom: "20px" }}>
              <option value="">-- Choisir liste --</option>
              <option value="Validé">Validées</option>
              <option value="Annulé">Annulées</option>
            </select>
            {typeRecherche && (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr style={{ borderBottom: "2px solid #000", textAlign: "left" }}><th style={{padding: "10px"}}>CLIENT</th><th style={{padding: "10px"}}>PLAT</th><th style={{padding: "10px"}}>HEURE</th></tr></thead>
                <tbody>{commandes.filter(c => c.etat === typeRecherche).map(c => (<tr key={c.id} style={{ borderBottom: "1px solid #ddd" }}><td style={{ padding: "15px", color: "#000" }}>{c.client}</td><td>{c.plat}</td><td>{c.heure}</td></tr>))}</tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* FICHE CLIENT (GARDÉE IDENTIQUE) */}
      {selectedUser && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "white", borderRadius: "20px", width: "380px", boxShadow: "0 20px 40px rgba(0,0,0,0.3)", overflow: "hidden" }}>
            <div style={{ backgroundColor: "#000", color: "white", padding: "20px", textAlign: "center" }}>
              <h2 style={{ margin: 0, fontSize: "18px", letterSpacing: "1px" }}>FICHE PERSONNELLE</h2>
            </div>
            <div style={{ padding: "25px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div><label style={{ color: "#888", fontSize: "11px", fontWeight: "bold" }}>NOM COMPLET</label><div style={{ fontWeight: "bold", fontSize: "16px" }}>{selectedUser.nom}</div></div>
                <div><label style={{ color: "#888", fontSize: "11px", fontWeight: "bold" }}>EMAIL</label><div>{selectedUser.email}</div></div>
                <div><label style={{ color: "#888", fontSize: "11px", fontWeight: "bold" }}>DATE D'INSCRIPTION</label><div>{selectedUser.inscrit}</div></div>
                <div>
                  <label style={{ color: "#888", fontSize: "11px", fontWeight: "bold" }}>SEXE / GENRE</label>
                  <div style={{ fontWeight: "bold" }}>
                    {selectedUser.genre === "H" && "👨 HOMME"}
                    {selectedUser.genre === "F" && "👩 FEMME"}
                    {selectedUser.genre === "EH" && "🧒 ENFANT (Garçon)"}
                    {selectedUser.genre === "EF" && "🧒 ENFANT (Fille)"}
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedUser(null)} style={{ width: "100%", marginTop: "30px", padding: "14px", backgroundColor: "#000", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" }}>FERMER LA FICHE</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}