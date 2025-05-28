

'use client'

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Smile, Meh, Frown, Loader2Icon } from 'lucide-react';
import DisplayTweetText from '@/components/DisplayTweetText';

const iconMap = {
  positive: <Smile className="text-green-600 w-44 h-44 sm:w-80 sm:h-7w-80" />,
  negative: <Frown className="text-red-600 w-44 h-44 sm:w-80 sm:h-7w-80" />,
  neutral: <Meh className="text-yellow-500 w-44 h-44 sm:w-80 sm:h-7w-80" />,
};

export default function SentimentPage() {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [wait, setWait] = useState(false);

  const handlePredict = async () => {
    if (!text.trim()) {
      setError("⚠️ Veuillez saisir un texte avant de prédire.");
      setPrediction(null);
      return;
    }
    setWait(true);
    setPrediction(null);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setPrediction(data.prediction);
    } catch (err) {
      setError("Erreur lors de la prédiction. Vérifiez le serveur Flask." + (err ? ` (${err})` : ""));
    } finally {
      setWait(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 flex flex-col justify-center items-center p-6 sm:p-10">
      <div className="flex flex-col sm:flex-row sm:space-x-10 w-full max-w-7xl">

        {/* Main Card */}
        <div className="flex-1 bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-purple-200 mb-8 sm:mb-0">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-purple-700 mb-6 drop-shadow-md">
            Analyse de Sentiment 🇺🇸🗳️
          </h1>
          <p className="text-center text-gray-700 mb-6 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Ce modèle prédit si un texte est <span className="font-semibold text-green-600">positif</span>, <span className="font-semibold text-red-600">négatif</span> ou <span className="font-semibold text-yellow-500">neutre</span> en lien avec l{`'`}élection présidentielle USA 2024.
          </p>

          <textarea
            placeholder="Écris ici ton avis..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-2xl border border-purple-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-400 transition resize-y p-4 text-base sm:text-lg shadow-sm"
            rows={4}
            autoFocus
          />

          <div className="flex justify-center mt-6">
            <Button
              onClick={handlePredict}
              className="bg-purple-600 hover:bg-purple-700 px-8 sm:px-12 text-lg sm:text-xl py-4 sm:py-5 rounded-xl text-white font-bold shadow-lg transition duration-300"
              disabled={wait}
            >
              {wait ? "Prédiction en cours..." : "Prédire"}
            </Button>
          </div>

          {error && (
            <div className="flex items-center gap-3 justify-center text-red-600 font-medium mt-8 bg-red-100 p-4 rounded-xl shadow-inner">
              <AlertCircle className="w-6 h-6" /> {error}
            </div>
          )}

          {wait && (
            <div className="flex justify-center mt-10">
              <Loader2Icon className="text-purple-400 w-16 h-16 animate-spin" />
            </div>
          )}

          {prediction && (
            <Card className="border-4 border-purple-300 rounded-3xl shadow-xl max-w-xl mx-auto mt-10">
              <CardContent className="flex flex-col items-center gap-4 p-6 sm:p-8">
                <div>{iconMap[prediction] || <Meh className="text-gray-400 w-16 h-16" />}</div>
                <p className="text-lg sm:text-xl text-gray-800 text-center italic px-4 sm:px-6">{`"`}{text}{`"`}</p>
                <p
                  className={`text-2xl sm:text-3xl font-extrabold uppercase ${prediction === 'positif' ? 'text-green-600' :
                    prediction === 'negatif' ? 'text-red-600' :
                      'text-yellow-500'
                    }`}
                >
                  {prediction}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar / Tweet Display */}
        <div className="flex-1 max-w-lg w-full">
          <DisplayTweetText />
        </div>
      </div>
    </div>
  );
}
