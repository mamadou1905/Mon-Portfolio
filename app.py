import streamlit as st
import pandas as pd
import joblib
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))
from predi import predire_prix

# --- Configuration de la page ---
st.set_page_config(
    page_title="🏡 Estimation IA - Immobilier", 
    page_icon="🤖",
    layout="centered"
)

# --- Titre et en-tête ---
st.title("🏡 Estimation de prix immobilier avec IA")
st.write("Projet réalisé chez **Microdata** par Mamadou Dian DIALLO (HEC Rabat – Licence 1 IA & Gestion)")

# --- Saisie utilisateur ---
st.header("📝 Caractéristiques du bien")

col1, col2 = st.columns(2)

with col1:
    ville = st.text_input(
        "🌆 Ville", 
        value="Casablanca", 
        placeholder="Ex: Casablanca, Rabat, Marrakech..."
    )
    surface = st.number_input(
        "📏 Surface (m²)", 
        min_value=10, 
        max_value=1000, 
        value=100,
        help="Surface habitable en mètres carrés"
    )
    
with col2:
    type_bien = st.selectbox(
        "🏠 Type de bien", 
        ["Appartement", "Maison / Villa", "Terrain"],
        help="Sélectionnez le type de bien immobilier"
    )
    pieces = st.number_input(
        "🚪 Nombre de pièces", 
        min_value=0, 
        max_value=20, 
        value=3,
        help="Nombre de pièces principales (0 pour un terrain)"
    )

# --- Validation de la ville ---
villes_valides = ["Casablanca", "Rabat", "Marrakech", "Tanger", "Fès"]
ville_utilisee = ville.strip().title() if ville else "Casablanca"

if ville_utilisee not in villes_valides:
    st.warning(f"⚠️ Ville '{ville_utilisee}' non reconnue. Utilisation de 'Casablanca' par défaut.")
    ville_utilisee = "Casablanca"

# --- Aide utilisateur ---
with st.expander("ℹ️ Guide d'utilisation"):
    st.write("""
    **📋 Villes reconnues par le modèle:**
    - 🏙️ **Casablanca** - Prix élevé
    - 🏛️ **Rabat** - Prix moyen-élevé  
    - 🌴 **Marrakech** - Prix moyen
    - ⚓ **Tanger** - Prix moyen
    - 🏺 **Fès** - Prix abordable
    
    **💡 Conseils:**
    - Pour les terrains, mettez 0 pièces
    - Les prix sont estimés en MAD (Dirham Marocain)
    - L'estimation inclut l'effet de la ville, surface et type de bien
    """)

# --- Bouton de prédiction ---
st.markdown("---")

if st.button("🔮 Estimer le prix", type="primary", use_container_width=True):
    with st.spinner("Calcul de l'estimation en cours..."):
        prix_estime = predire_prix(surface, pieces, type_bien, ville_utilisee)
    
    if prix_estime is not None:
        # Affichage du résultat principal
        st.success(f"## 💰 Estimation : **{prix_estime:,.0f} MAD**")
        
        # Affichage détaillé
        with st.expander("🔍 Détails de l'analyse", expanded=True):
            st.write(f"**📊 Paramètres utilisés :**")
            
            col_info1, col_info2 = st.columns(2)
            with col_info1:
                st.write(f"**🌆 Ville:** {ville_utilisee}")
                if ville.strip().title() != ville_utilisee:
                    st.write(f"*⚠️ Saisie originale: {ville}*")
                st.write(f"**🏠 Type de bien:** {type_bien}")
                
            with col_info2:
                st.write(f"**📏 Surface:** {surface} m²")
                st.write(f"**🚪 Pièces:** {pieces}")
            
            # Comparaison avec autres villes
            st.write(f"**🌍 Comparaison avec autres villes:**")
            comparaison_data = []
            
            for v in villes_valides:
                if v != ville_utilisee:
                    prix_comparaison = predire_prix(surface, pieces, type_bien, v)
                    difference = prix_comparaison - prix_estime
                    pourcentage = (difference / prix_estime) * 100
                    
                    comparaison_data.append({
                        'Ville': v,
                        'Prix': prix_comparaison,
                        'Difference': difference,
                        'Pourcentage': pourcentage
                    })
            
            # Afficher les comparaisons
            for comp in comparaison_data:
                if comp['Difference'] > 0:
                    st.write(f"- **{comp['Ville']}:** {comp['Prix']:,.0f} MAD (+{comp['Difference']:,.0f} MAD, +{comp['Pourcentage']:.1f}%)")
                else:
                    st.write(f"- **{comp['Ville']}:** {comp['Prix']:,.0f} MAD ({comp['Difference']:+,.0f} MAD, {comp['Pourcentage']:+.1f}%)")
                    
    else:
        st.error("❌ Erreur lors de l'estimation. Vérifiez la console pour plus de détails.")

# --- Pied de page ---
st.markdown("---")
st.markdown(
    "<div style='text-align: center; color: gray;'>"
    "🤖 Application développée avec Streamlit & Scikit-learn | "
    "📊 Données: Marché immobilier marocain"
    "</div>", 
    unsafe_allow_html=True
)