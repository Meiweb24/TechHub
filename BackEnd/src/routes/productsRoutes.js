/**
 * Archivo: BackEnd/src\routes\productsRoutes.js
 * Proposito: Define la logica principal de productsRoutes dentro de TechHub.
 */
import { Router } from 'express'
import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productsController.js'

const router = Router()

router.get('/', listProducts)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router

