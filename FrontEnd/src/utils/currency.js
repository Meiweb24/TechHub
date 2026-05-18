/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\utils\currency.js
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
const formatterCOP = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export const formatCOP = (value) => formatterCOP.format(value)

