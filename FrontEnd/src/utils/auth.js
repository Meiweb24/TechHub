/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\utils\auth.js
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
export const hashPassword = (value) => {
  const input = String(value)
  let hash = 0x811c9dc5

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index)
    hash = Math.imul(hash, 0x01000193)
  }

  return (hash >>> 0).toString(16).padStart(8, '0')
}

export const ADMIN_CREDENTIALS = {
  username: 'admin',
  passwordHash: 'fdc422fd',
}


