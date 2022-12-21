const { Router } = require('express')
import productManager from '../routes/manager/ProductManager'

const router = Router()
const products = []

router.get('./', (req, res) => {
    res.json({ products})
})

router.post('./', (req, res) =>{
    const product = req.body
    products.push(product)

    res.json({status: "success"})

})


export default router