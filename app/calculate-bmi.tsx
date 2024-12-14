"use client";
import { useState } from "react";

export default function Home() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!height || !weight) {
      alert("La taille et le poids doivent être positifs.");
      return;
    }

    setLoading(true);

    // Envoie des données à l'API FastAPI
    const res = await fetch("http://127.0.0.1:8000/calculate-bmi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ weight, height }),
    });

    const data = await res.json();

    setBmi(data.bmi);
    setCategory(data.status);
    setLoading(false);
  };

  return (
    <div>
      <h1>Calculateur d&apos;IMC</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Poids (kg) :</label>
          <input
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Taille (m) :</label>
          <input
            type="number"
            step="0.01"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
        </div>
        <button type="submit">Calculer IMC</button>
      </form>

      {loading ? (
        <p>Calcul en cours...</p>
      ) : (
        bmi !== null && (
          <div>
            <h2>Votre IMC est : {bmi}</h2>
            <p>Catégorie : {category}</p>
          </div>
        )
      )}
    </div>
  );
}
