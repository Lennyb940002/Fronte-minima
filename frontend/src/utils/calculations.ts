export function calculateMarginPercentage(salePrice: number, unitCost: number, quantity: number): string {
  return ((salePrice - unitCost * quantity) / (unitCost * quantity) * 100).toFixed(2);
}

export function formatCurrency(amount: number): string {
  return `${amount.toFixed(2)} €`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('fr-FR');
}