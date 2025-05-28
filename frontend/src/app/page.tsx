'use client'

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Smile, Meh, Frown } from 'lucide-react';

const iconMap = {
  positive: <Smile className="text-green-600 w-44 h-44" />,
  negative: <Frown className="text-red-600 w-44 h-44" />,
  neutral: <Meh className="text-yellow-500 w-44 h-44" />,
};

export default function SentimentPage() {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  const handlePredict = async () => {
    if (!text.trim()) {
      setError("⚠️ Veuillez saisir un texte avant de prédire.");
      setPrediction(null);
      return;
    }
    setError("");
    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setPrediction(data.prediction);
    } catch (err) {
      setError("Erreur lors de la prédiction. Vérifiez le serveur Flask.");
      setPrediction(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 p-12 flex flex-col justify-center items-center">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-10 border border-purple-200">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-6 drop-shadow-md">
          Analyse de Sentiment 🇺🇸🗳️
        </h1>
        <p className="text-center text-gray-600 mb-8 text-lg max-w-xl mx-auto">
          Ce modèle prédit si un texte est <span className="font-semibold text-green-600">positif</span>, <span className="font-semibold text-red-600">négatif</span> ou <span className="font-semibold text-yellow-500">neutre</span> en lien avec l'élection présidentielle USA 2024.
        </p>

        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Écris ici ton avis..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 rounded-xl border border-purple-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-400 transition"
            autoFocus
          />
          <Button
            onClick={handlePredict}
            className="bg-purple-600 hover:bg-purple-700 rounded-xl px-6 py-3 text-white font-semibold shadow-lg transition"
          >
            Prédire
          </Button>
        </div>

        {error && (
          <div className="flex items-center gap-3 justify-center text-red-600 font-medium mb-6 bg-red-100 p-3 rounded-lg shadow-inner">
            <AlertCircle className="w-6 h-6" /> {error}
          </div>
        )}

        {prediction && (
          <Card className="border-4 border-purple-300 rounded-3xl shadow-xl max-w-lg mx-auto">
            <CardContent className="flex flex-col items-center gap-6 p-4">
              <div className="mb-4">{iconMap[prediction] || <Meh className="text-gray-400 w-16 h-16" />}</div>
              <p className="text-xl text-gray-800 text-center italic px-6">"{text}"</p>
              <p
                className={`text-2xl font-bold uppercase ${prediction === 'positif' ? 'text-green-600' : prediction === 'negatif' ? 'text-red-600' : 'text-yellow-500'
                  }`}
              >
                {prediction}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
