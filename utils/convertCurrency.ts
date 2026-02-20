/**
 * converte um valor monetário em reias para centavos
 * @param {string} amount - valor monetario em reais a ser convertido
 * @returns {number} O valor convertido em centavos
 */
export default function convertRealToCent(amount: string) {
  const numericPrice = parseFloat(amount.replace(/\./g, "").replace(",", "."));
  const priceInCents = Math.round(numericPrice * 100);

  return priceInCents;
}
