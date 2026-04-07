"use client";
import React, { useState } from "react";
import Link from "next/link";

interface User { id: number; nom: string; email: string; statut: "Connecté" | "Déconnecté"; methode: string; inscrit: string; }
interface Histo { nom: string; action: string; heure: string; }
interface Commande { id: number; client: string; plat: string; heure: string; etat: "Validé" | "Annulé"; }

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("sessions");
  const [search, setSearch] = useState("");
  const [typeRecherche, setTypeRecherche] = useState<"" | "Validé" | "Annulé">("");
  const [ordreHeure, setOrdreHeure] = useState<"asc" | "desc">("desc");

  const [users, setUsers] = useState<User[]>([
    { id: 1, nom: "Koné Issa", email: "issa@mail.com", statut: "Connecté", methode: "Orange Money", inscrit: "07/04/2026" },
    { id: 2, nom: "Tano Ama Danielle", email: "danielle@mail.com", statut: "Connecté", methode: "Wave", inscrit: "07/04/2026" },
    { id: 3, nom: "Kouadio Olswade", email: "olswade@mail.com", statut: "Connecté", methode: "MTN MoMo", inscrit: "06/04/2026" },
    { id: 4, nom: "Kouadio Désiré", email: "desire@mail.com", statut: "Connecté", methode: "Wave", inscrit: "06/04/2026" },
    { id: 5, nom: "Konan Yao", email: "yao@mail.com", statut: "Connecté", methode: "Orange Money", inscrit: "02/04/2026" },
    { id: 6, nom: "Sery Marc", email: "marc@mail.com", statut: "Connecté", methode: "Wave", inscrit: "10/03/2026" },
    { id: 7, nom: "Awa Touré", email: "awa@mail.com", statut: "Déconnecté", methode: "MTN MoMo", inscrit: "15/01/2026" },
  ]);

  const [commandes] = useState<Commande[]>([
    { id: 1, client: "Kouadio Olswade", plat: "Foutou Banane", heure: "10:52", etat: "Annulé" },
    { id: 2, client: "Koné Issa", plat: "Garba Spécial", heure: "10:45", etat: "Validé" },
    { id: 3, client: "Tano Ama Danielle", plat: "Alloco Poisson", heure: "10:50", etat: "Validé" },
  ]);

  const [historique, setHistorique] = useState<Histo[]>([{ nom: "Bamba Sara", action: "Déconnecté", heure: "07:22" }]);

  // --- NOUVELLE FONCTION EXPORT ---
  const exporterExcel = () => {
    let csv = "Client;Plat;Heure;Etat\n";
    commandes.filter(c => c.etat === typeRecherche).forEach(c => {
      csv += `${c.client};${c.plat};${c.heure};${c.etat}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `commandes_${typeRecherche}.csv`;
    a.click();
  };

  const deconnecterUser = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, statut: "Déconnecté" } : u));
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5", padding: "20px", color: "#333", fontFamily: "Arial" }}>
      
      {/* HEADER */}
      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
        <div style={{ color: "#000" }}>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>ADMINISTRATION RESTO</h1>
          <p style={{ margin: 0, color: "#666" }}>Tableau de bord • 07 Avril 2026</p>
        </div>
        <Link href="/" style={{ backgroundColor: "#dc3545", color: "white", padding: "12px 25px", borderRadius: "8px", textDecoration: "none", fontWeight: "bold" }}>QUITTER</Link>
      </div>

      {/* TABS */}
      <div className="no-print" style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {["sessions", "historique", "inscrits", "commandes"].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)} 
            style={{
              padding: "12px 20px",
              backgroundColor: activeTab === tab ? "#000" : "#fff",
              color: activeTab === tab ? "#fff" : "#000",
              border: "1px solid #ccc",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              textTransform: "capitalize"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENU */}
      <div style={{ backgroundColor: "white", padding: "25px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", color: "#000" }}>
        
        {activeTab === "sessions" && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: "2px solid #000", textAlign: "left" }}><th style={{padding: "10px"}}>NOM</th><th style={{padding: "10px"}}>ACTION</th></tr></thead>
            <tbody>
              {users.filter(u => u.statut === "Connecté").map(u => (
                <tr key={u.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "15px", color: "#000" }}><b>{u.nom}</b><br/><span style={{fontSize: "12px", color: "#666"}}>{u.email}</span></td>
                  <td><button onClick={() => deconnecterUser(u.id)} style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }}>DÉCONNECTER</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "inscrits" && (
          <>
            <input 
              type="text" 
              placeholder="Rechercher un nom..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              style={{ width: "100%", padding: "12px", marginBottom: "20px", border: "2px solid #ccc", borderRadius: "8px", color: "#000" }} 
            />
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ borderBottom: "2px solid #000", textAlign: "left" }}><th style={{padding: "10px"}}>NOM</th><th style={{padding: "10px"}}>PAIEMENT</th><th style={{padding: "10px"}}>STATUT</th></tr></thead>
              <tbody>
                {users.filter(u => u.nom.toLowerCase().includes(search.toLowerCase())).map(u => (
                  <tr key={u.id} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "15px", color: "#000" }}><b>{u.nom}</b></td>
                    <td style={{ color: "#000" }}>{u.methode}</td>
                    <td style={{ color: u.statut === "Connecté" ? "green" : "red", fontWeight: "bold" }}>{u.statut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === "historique" && (
           <table style={{ width: "100%", borderCollapse: "collapse" }}>
             <thead><tr style={{ borderBottom: "2px solid #000", textAlign: "left" }}><th style={{padding: "10px"}}>NOM</th><th style={{padding: "10px"}}>ACTION</th><th style={{padding: "10px"}}>HEURE</th></tr></thead>
             <tbody>
               {historique.map((h, i) => (
                 <tr key={i} style={{ borderBottom: "1px solid #ddd" }}><td style={{ padding: "15px", color: "#000" }}>{h.nom}</td><td style={{ color: "red" }}>{h.action}</td><td style={{ color: "#000" }}>{h.heure}</td></tr>
               ))}
             </tbody>
           </table>
        )}

        {activeTab === "commandes" && (
          <div>
            <div className="no-print" style={{display: "flex", gap: "10px", marginBottom: "20px", alignItems: "center"}}>
               <select onChange={(e) => setTypeRecherche(e.target.value as any)} style={{ padding: "10px", borderRadius: "5px", color: "#000", border: "1px solid #ccc" }}>
                 <option value="">-- Choisir liste --</option>
                 <option value="Validé">Validées</option>
                 <option value="Annulé">Annulées</option>
               </select>

               {/* BOUTONS D'ACTION (PUISSANCE) */}
               {typeRecherche && (
                 <>
                  <button onClick={exporterExcel} style={{ backgroundColor: "#28a745", color: "white", border: "none", padding: "10px 15px", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
                    📊 Excel
                  </button>
                  <button onClick={() => window.print()} style={{ backgroundColor: "#007bff", color: "white", border: "none", padding: "10px 15px", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
                    🖨️ Imprimer
                  </button>
                 </>
               )}
            </div>

            {typeRecherche && (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #000", textAlign: "left" }}>
                    <th style={{padding: "10px"}}>CLIENT</th>
                    <th style={{padding: "10px"}}>PLAT</th>
                    {/* TRI PAR HEURE */}
                    <th 
                      onClick={() => setOrdreHeure(ordreHeure === "asc" ? "desc" : "asc")} 
                      style={{padding: "10px", cursor: "pointer", textDecoration: "underline"}}
                    >
                      HEURE {ordreHeure === "asc" ? "▲" : "▼"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {commandes
                    .filter(c => c.etat === typeRecherche)
                    .sort((a, b) => ordreHeure === "asc" ? a.heure.localeCompare(b.heure) : b.heure.localeCompare(a.heure))
                    .map(c => (
                      <tr key={c.id} style={{ borderBottom: "1px solid #ddd" }}>
                        <td style={{ padding: "15px", color: "#000" }}>{c.client}</td>
                        <td style={{ color: "#000" }}>{c.plat}</td>
                        <td style={{ color: "#000" }}>{c.heure}</td>
                      </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

      </div>
      <style jsx global>{` @media print { .no-print { display: none !important; } } `}</style>
    </div>
  );
}