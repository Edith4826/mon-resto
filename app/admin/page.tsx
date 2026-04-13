"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; 
import * as XLSX from 'xlsx'; 

// Interfaces existantes
interface User { id: number; nom: string; email: string; statut: "Connecté" | "Déconnecté"; methode: string; inscrit: string; genre: "H" | "F" | "EH" | "EF"; }
interface Histo { nom: string; action: string; heure: string; }
interface Commande { id: number; client: string; plat: string; heure: string; etat: "Validé" | "Annulé"; }
interface Employe { id: number; nom: string; role: "Livreur" | "Cuisinier" | "Serveur"; contact: string; statut: "En service" | "Repos"; }
interface Fournisseur { id: number; entreprise: string; produit: string; contact: string; }
interface Stock { id: number; article: string; quantite: number; unite: string; niveau: "Bon" | "Critique"; }

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // --- DONNÉES SIMULÉES POUR LES STATISTIQUES ---
  const statsVentes = {
    jour: 24,
    semaine: 168,
    annee: 5400,
    caTotal: 1250000, // Chiffre d'affaires
    depenses: 800000,  // Coûts (achats, salaires)
  };
  const benefice = statsVentes.caTotal - statsVentes.depenses;

  const [users, setUsers] = useState<User[]>([
    { id: 1, nom: "Koné Issa", email: "issa@mail.com", statut: "Connecté", methode: "Orange Money", inscrit: "07/04/2026", genre: "H" },
    { id: 2, nom: "Tano Ama Danielle", email: "danielle@mail.com", statut: "Connecté", methode: "Wave", inscrit: "07/04/2026", genre: "F" },
    { id: 3, nom: "Koffi Axel", email: "axel@mail.com", statut: "Connecté", methode: "Espèces", inscrit: "07/04/2026", genre: "EH" },
    { id: 4, nom: "Aya Marie", email: "marie@mail.com", statut: "Connecté", methode: "Wave", inscrit: "07/04/2026", genre: "EF" },
    { id: 5, nom: "Kouadio Olswade", email: "olswade@mail.com", statut: "Connecté", methode: "MTN MoMo", inscrit: "06/04/2026", genre: "H" },
    { id: 6, nom: "Konan Yao", email: "yao@mail.com", statut: "Connecté", methode: "Orange Money", inscrit: "02/04/2026", genre: "H" },
    { id: 7, nom: "Awa Touré", email: "awa@mail.com", statut: "Déconnecté", methode: "MTN MoMo", inscrit: "15/01/2026", genre: "F" },
  ]);

  const [employes] = useState<Employe[]>([
    { id: 1, nom: "Traoré Moussa", role: "Livreur", contact: "01020304", statut: "En service" },
    { id: 2, nom: "Bamba Lassina", role: "Livreur", contact: "05060708", statut: "Repos" },
    { id: 3, nom: "Chef Diallo", role: "Cuisinier", contact: "09090909", statut: "En service" },
  ]);

  const [stocks] = useState<Stock[]>([
    { id: 1, article: "Attiéké", quantite: 50, unite: "Boules", niveau: "Bon" },
    { id: 2, article: "Poisson Carpe", quantite: 3, unite: "Kg", niveau: "Critique" },
  ]);

  const [fournisseurs] = useState<Fournisseur[]>([
    { id: 1, entreprise: "Pêcherie Abidjan", produit: "Poissons frais", contact: "27 22 00 11" },
    { id: 2, entreprise: "Grossiste SODECI", produit: "Boissons & Eau", contact: "01 01 02 02" },
  ]);

  const [corbeille, setCorbeille] = useState<User[]>([]);
  
  // Fonctions outils
  const imprimerRapport = () => { window.print(); };
  const exporterExcel = () => {
    const dataToExport = users.map(u => ({ Nom: u.nom, Email: u.email, Statut: u.statut, Methode: u.methode, Inscription: u.inscrit }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");
    XLSX.writeFile(workbook, "Rapport_Administration.xlsx");
  };

  const handleLogout = () => { if (confirm("Voulez-vous vraiment quitter ?")) { window.location.replace("/connexion"); } };
  const deconnecterUser = (id: number) => { setUsers(users.map(u => u.id === id ? { ...u, statut: "Déconnecté" } : u)); };
  const supprimerUser = (user: User) => { setUsers(users.filter(u => u.id !== user.id)); setCorbeille([...corbeille, user]); };

  // Styles réutilisables
  const statCardStyle = {
    padding: "15px", 
    border: "1px solid #ddd", 
    borderRadius: "10px", 
    textAlign: "center" as const, 
    minWidth: "140px",
    backgroundColor: "#fff"
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5", padding: "20px", color: "#333", fontFamily: "Arial" }}>
      
      {/* HEADER */}
      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>ADMINISTRATION RESTO</h1>
          <p style={{ margin: 0, color: "#666" }}>Gestion Globale • 07 Avril 2026</p>
          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <button onClick={imprimerRapport} style={{ padding: "8px 15px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>🖨️ IMPRIMER</button>
            <button onClick={exporterExcel} style={{ padding: "8px 15px", backgroundColor: "#198754", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>📊 EXPORT EXCEL</button>
          </div>
        </div>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <button onClick={() => setActiveTab("corbeille")} style={{ backgroundColor: activeTab === "corbeille" ? "#f8f9fa" : "white", border: "1px solid #ccc", padding: "10px", borderRadius: "8px", cursor: "pointer", fontSize: "20px" }}>🗑️</button>
            <button onClick={handleLogout} style={{ backgroundColor: "#dc3545", color: "white", padding: "12px 25px", borderRadius: "8px", border: "none", fontWeight: "bold", cursor: "pointer" }}>DÉCONNEXION</button>
        </div>
      </div>

      <style jsx global>{` @media print { .no-print { display: none !important; } body { background-color: white !important; padding: 0 !important; } } `}</style>

      {/* NAVIGATION */}
      <div className="no-print" style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <Link href="/"><button style={{ padding: "12px 20px", backgroundColor: "#2E7D32", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>🏠 VOIR LE SITE</button></Link>

        {["dashboard", "stats", "sessions", "personnel", "stocks", "inscrits"].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)} 
            style={{ padding: "12px 20px", backgroundColor: activeTab === tab ? "#000" : "#fff", color: activeTab === tab ? "#fff" : "#000", border: "1px solid #ccc", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", textTransform: "capitalize" }}
          >
            {tab === "stats" ? "📊 Stats" : tab === "stocks" ? "📦 Stocks" : tab}
          </button>
        ))}
      </div>

      {/* ZONE DE CONTENU */}
      <div style={{ backgroundColor: "white", padding: "25px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", color: "#000" }}>
        
        {/* DASHBOARD ENRICHI */}
        {activeTab === "dashboard" && (
          <div>
            <h3 style={{ marginBottom: "15px" }}>Vue d'ensemble</h3>
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", justifyContent: "center" }}>
              <div style={statCardStyle}><b>TOTAL CLIENTS</b><br/>{users.length}</div>
              <div style={{...statCardStyle, color: "#428bca"}}><b>LIVREURS</b><br/>{employes.filter(e => e.role === "Livreur").length}</div>
              <div style={{...statCardStyle, color: "#dc3545"}}><b>ALERTES STOCK</b><br/>{stocks.filter(s => s.niveau === "Critique").length}</div>
              <div style={{...statCardStyle, backgroundColor: "#e8f5e9", borderColor: "#2E7D32"}}><b>VENTES JOUR</b><br/>{statsVentes.jour}</div>
            </div>
          </div>
        )}

        {/* NOUVEL ONGLET STATISTIQUES (GAINS ET PERTES) */}
        {activeTab === "stats" && (
          <div>
            <h3>Analyse des Ventes & Finances</h3>
            
            <h4 style={{ color: "#666" }}>Volume de Plats Vendus</h4>
            <div style={{ display: "flex", gap: "15px", marginBottom: "30px" }}>
              <div style={statCardStyle}><b>Aujourd'hui</b><br/>{statsVentes.jour} plats</div>
              <div style={statCardStyle}><b>Cette Semaine</b><br/>{statsVentes.semaine} plats</div>
              <div style={statCardStyle}><b>Cette Année</b><br/>{statsVentes.annee} plats</div>
            </div>

            <h4 style={{ color: "#666" }}>Bilan Financier (FCFA)</h4>
            <div style={{ display: "flex", gap: "15px" }}>
              <div style={{...statCardStyle, flex: 1}}><b>Chiffre d'Affaires</b><br/>{statsVentes.caTotal.toLocaleString()} F</div>
              <div style={{...statCardStyle, flex: 1, color: "#dc3545"}}><b>Dépenses</b><br/>{statsVentes.depenses.toLocaleString()} F</div>
              <div style={{...statCardStyle, flex: 1, backgroundColor: benefice >= 0 ? "#e8f5e9" : "#ffebee", borderColor: benefice >= 0 ? "green" : "red", color: benefice >= 0 ? "green" : "red"}}>
                <b>{benefice >= 0 ? "GAINS (Bénéfice)" : "PERTES"}</b><br/>
                {benefice.toLocaleString()} F
              </div>
            </div>
          </div>
        )}

        {activeTab === "sessions" && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: "2px solid #000", textAlign: "left" }}><th style={{padding: "10px"}}>NOM</th><th style={{padding: "10px"}}>ACTION</th></tr></thead>
            <tbody>
              {users.filter(u => u.statut === "Connecté").map(u => (
                <tr key={u.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "15px" }}><b>{u.nom}</b><br/><small>{u.email}</small></td>
                  <td><button onClick={() => deconnecterUser(u.id)} style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>DÉCONNECTER</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "stocks" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div><h4>Articles</h4>
              {stocks.map(s => (
                <div key={s.id} style={{ padding: "10px", border: "1px solid #eee", marginBottom: "5px", borderRadius: "8px", borderLeft: s.niveau === "Critique" ? "5px solid red" : "5px solid green" }}>
                  <b>{s.article}</b> : {s.quantite} {s.unite} {s.niveau === "Critique" && "⚠️"}
                </div>
              ))}
            </div>
            <div><h4>Fournisseurs</h4>
              {fournisseurs.map(f => (
                <div key={f.id} style={{ padding: "10px", border: "1px solid #ddd", marginBottom: "5px" }}><b>{f.entreprise}</b> ({f.produit})</div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "personnel" && (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ backgroundColor: "#f8f9fa" }}><th style={{padding: "10px", textAlign: "left"}}>NOM</th><th>RÔLE</th><th>STATUT</th></tr></thead>
              <tbody>
                {employes.map(emp => (
                  <tr key={emp.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "12px" }}><b>{emp.nom}</b></td>
                    <td>{emp.role}</td>
                    <td style={{ color: emp.statut === "En service" ? "green" : "red" }}>● {emp.statut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        )}
      </div>

      {/* MODALE FICHE CLIENT */}
      {selectedUser && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "white", borderRadius: "20px", width: "380px", padding: "25px" }}>
            <h2>FICHE PERSONNELLE</h2>
            <p><b>NOM :</b> {selectedUser.nom}</p>
            <button onClick={() => setSelectedUser(null)} style={{ width: "100%", padding: "10px", backgroundColor: "#000", color: "#fff", border: "none", borderRadius: "10px" }}>FERMER</button>
          </div>
        </div>
      )}
    </div>
  );
}