import { Product } from '../models/Product.js'

function normalizeBoolean(value) {
  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'number') {
    return value === 1
  }

  if (typeof value === 'string') {
    return ['1', 'true', 'yes'].includes(value.toLowerCase())
  }

  return false
}

function validateProductPayload(payload, { partial = false } = {}) {
  const requiredFields = ['name', 'category', 'categoryLabel', 'price', 'image', 'tagline', 'dealTag']

  if (!partial) {
    const missing = requiredFields.filter((field) => !payload[field] && payload[field] !== 0)
    if (missing.length > 0) {
      return `Faltan campos obligatorios: ${missing.join(', ')}`
    }
  }

  if (payload.price !== undefined && (!Number.isFinite(Number(payload.price)) || Number(payload.price) <= 0)) {
    return 'El precio debe ser un numero mayor a 0.'
  }

  if (
    payload.originalPrice !== undefined &&
    payload.originalPrice !== null &&
    payload.originalPrice !== '' &&
    (!Number.isFinite(Number(payload.originalPrice)) || Number(payload.originalPrice) <= 0)
  ) {
    return 'El precio original debe ser nulo o un numero mayor a 0.'
  }

  return null
}

export async function listProducts(_req, res, next) {
  try {
    const rows = await Product.findAll({ order: [['id', 'ASC']] })
    res.json(rows)
  } catch (error) {
    next(error)
  }
}

export async function createProduct(req, res, next) {
  try {
    const validationError = validateProductPayload(req.body)
    if (validationError) {
      return res.status(400).json({ message: validationError })
    }

    const created = await Product.create({
      name: String(req.body.name).trim(),
      category: String(req.body.category).trim(),
      categoryLabel: String(req.body.categoryLabel).trim(),
      price: Number(req.body.price),
      originalPrice:
        req.body.originalPrice === null || req.body.originalPrice === ''
          ? null
          : Number(req.body.originalPrice),
      image: String(req.body.image).trim(),
      featured: normalizeBoolean(req.body.featured),
      adminOnly: normalizeBoolean(req.body.adminOnly),
      tagline: String(req.body.tagline).trim(),
      dealTag: String(req.body.dealTag).trim(),
    })

    return res.status(201).json(created)
  } catch (error) {
    next(error)
  }
}

export async function updateProduct(req, res, next) {
  try {
    const productId = Number(req.params.id)

    if (!Number.isInteger(productId)) {
      return res.status(400).json({ message: 'ID invalido.' })
    }

    const validationError = validateProductPayload(req.body, { partial: true })
    if (validationError) {
      return res.status(400).json({ message: validationError })
    }

    const payload = {}
    const updatableFields = [
      'name',
      'category',
      'categoryLabel',
      'price',
      'originalPrice',
      'image',
      'featured',
      'adminOnly',
      'tagline',
      'dealTag',
    ]

    updatableFields.forEach((field) => {
      if (!Object.hasOwn(req.body, field)) {
        return
      }

      if (field === 'price') {
        payload[field] = Number(req.body[field])
        return
      }

      if (field === 'originalPrice') {
        payload[field] = req.body[field] === null || req.body[field] === '' ? null : Number(req.body[field])
        return
      }

      if (field === 'featured' || field === 'adminOnly') {
        payload[field] = normalizeBoolean(req.body[field])
        return
      }

      payload[field] = String(req.body[field]).trim()
    })

    if (Object.keys(payload).length === 0) {
      return res.status(400).json({ message: 'No hay campos para actualizar.' })
    }

    const product = await Product.findByPk(productId)
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado.' })
    }

    await product.update(payload)
    return res.json(product)
  } catch (error) {
    next(error)
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const productId = Number(req.params.id)

    if (!Number.isInteger(productId)) {
      return res.status(400).json({ message: 'ID invalido.' })
    }

    const deletedRows = await Product.destroy({ where: { id: productId } })

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado.' })
    }

    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}
