import { Router } from 'express'
import ProductManager from '../manager/ProductManager.js'

const fileManager = new ProductManager('products.json')
const router = Router()


router.get('./', async (req, res) => {
    const products = await fileManager.get()
    res.json({ products})
})

router.post('./', async (req, res) =>{
    const product = req.body
    const productAdded = await fileManager.add(product)
    res.json({status: "success", productAdded})

})


export default router