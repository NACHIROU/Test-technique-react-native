import { z } from "zod";

// Schema pour le dashboard
export const DashboardSchema = z.object({
    btcBalance: z.number().min(0, 'Le solde ne peut pas etre negatif'),
    btcPrice: z.number().min(0, 'le prix doit etre positif ou egal a 0'),

});

// Schema pour le formulaire de retrait
export const WithdrawSchema = z.object({
    amountXOF: z.number().min(500, 'Le montant minimum est de 500 FCFA'),
    phoneNumber: z.string().regex(/^[0-9]{10}$/, 'Le numero de telephone doit contenir 10 chiffres'),
    provider: z.enum(['MTN', 'Moov']),
    
});

export const TransactionTypeEnum = z.enum([
  'retrait', 
  'depot', 
  'achat_crypto', 
  'paiement_facture',
  'transfert_interne'
]);

// Extraction des types
export type DashboardData = z.infer<typeof DashboardSchema>;
export type WithdrawData = z.infer<typeof WithdrawSchema>;
export type TransactionType = z.infer<typeof TransactionTypeEnum>;