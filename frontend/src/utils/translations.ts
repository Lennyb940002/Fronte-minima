export const statusTranslations = {
  completed: 'Effectué',
  pending: 'En attente',
  cancelled: 'Annulé'
} as const;

export const paymentMethodTranslations = {
  cash: 'Espèces',
  card: 'Carte',
  transfer: 'Virement'
} as const;

export const statusColors = {
  completed: 'bg-green-500',
  pending: 'bg-yellow-500',
  cancelled: 'bg-red-500'
} as const;