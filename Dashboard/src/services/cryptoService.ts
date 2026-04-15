import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getBitcoinPriceInXOF = async (): Promise<number> => {
  try {
    // Avec Axios, le résultat est directement dans la propriété .data
    const response = await axios.get(`${BASE_URL}/simple/price`, {
      params: {
        ids: 'bitcoin',
        vs_currencies: 'eur'
      }
    });
    
    // CoinGecko ne gère pas le franc CFA (XOF) nativement.
    // On récupère en Euro et on convertit (1 EUR = 655.957 XOF)
    const priceInEur = response.data.bitcoin.eur;
    return priceInEur * 655.957;
  } catch (error) {
    console.error("Erreur lors de la récupération du prix avec Axios:", error);
    return 0;
  }
};