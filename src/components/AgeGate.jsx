import { useState, useEffect } from 'react';

export default function AgeGate() {
  const [isVerified, setIsVerified] = useState(true); // true par défaut pour éviter le flash

  useEffect(() => {
    const verified = localStorage.getItem('ageVerified');
    if (verified !== 'true') {
      setIsVerified(false);
    }
  }, []);

  const handleVerify = (isAdult) => {
    if (isAdult) {
      localStorage.setItem('ageVerified', 'true');
      setIsVerified(true);
    } else {
      window.location.href = 'https://www.google.ca'; // On expulse les mineurs
    }
  };

  if (isVerified) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-zinc-900 text-black dark:text-white p-6 rounded-lg max-w-md mx-4">
        <h2 className="text-xl font-bold mb-2">Avez-vous 18 ans ou plus ?</h2>
        <p className="mb-4">L'accès au Coin Vert nécessite une vérification d'âge légal pour les articles de fumeur.</p>
        <div className="flex gap-4 justify-end">
          <button
            onClick={() => handleVerify(false)}
            className="px-6 py-2 rounded-lg font-semibold bg-zinc-800 text-white hover:bg-zinc-700 transition"
          >
            Non
          </button>
          <button
            onClick={() => handleVerify(true)}
            className="px-6 py-2 rounded-lg font-bold bg-green-500 text-black hover:bg-green-400 transition shadow-[0_0_15px_rgba(34,197,94,0.5)]"
          >
            Oui, j'ai 18+
          </button>
        </div>
      </div>
    </div>
  );
}