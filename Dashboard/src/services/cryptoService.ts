import axios from 'axios';

// On utilise l'API Binance qui a des limites de requêtes (Rate Limits)
// beaucoup plus souples que CoinGecko pour un usage gratuit, évitant l'erreur 429.
const BASE_URL = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCEUR';

export const getBitcoinPriceInXOF = async (): Promise<number> => {
  try {
    const response = await axios.get(BASE_URL);
    
    // L'API Binance renvoie sous ce format: { "symbol": "BTCEUR", "price": "60000.00" }
    const priceInEur = parseFloat(response.data.price);
    
    // On convertit de l'Euro au Franc CFA (1 EUR = 655.957 XOF)
    return priceInEur * 655.957;
  } catch (error: any) {
    console.warn("Erreur réseau/Axios (souvent 429):", error.message);
    
    // PRIX DE SECOURS: Si l'API échoue, on renvoie une valeur estimative réaliste
    // plutôt que de crasher ou d'afficher "0 FCFA" (ex: estimation à 62 000 EUR).
    console.log("⚠️ Utilisation du prix de secours (Fallback) pour le Bitcoin ⚠️");
    const fallbackEurPrice = 62000;
    return fallbackEurPrice * 655.957;
  }
};