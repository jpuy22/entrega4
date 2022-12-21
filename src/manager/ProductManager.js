//const fs = require('fs')
import fs from 'fs'

class ProductManager{

    constructor(path){
        this.path = path
        this.format = 'utf-8'
    }

    total = (path) => {
        if(fs.existsSync(path)){
            let content = fs.readFileSync(path, 'utf-8')
            let products = JSON.parse(content)
            const count = products.length
            return count
        }else return 0
    }
    getNextId = (list) => {
        if(list){
            const count = list.length
            return (count >0) ? list[count-1].id + 1: 1
        }else return 1
    }

    read = async () => {
        if(fs.existsSync(this.path)){
            return await fs.promises.readFile(this.path, 'utf-8').then(r=> JSON.parse(r))
        }
        return []
        
    }

    getProduct = async () => {
        try{
            const products = await this.read()
            return products
        }catch(error){
            console.log(error)
        }
    }

    
    getProdObj = () => {
        if(fs.existsSync(this.path)){
            
            let content = fs.readFileSync(this.path, 'utf-8')
            return JSON.parse(content)
            
            return fs.promises.readFile(this.path, 'utf-8').then(r=> JSON.parse(r))
            
            
        }else{
            return []
        } 
    }
    
    get = async () =>{
        try{
            if(fs.existsSync(this.path)){
                return await fs.promises.readFile(this.path, 'utf-8').then(r => JSON.parse(r))
            }else{
                return []
            } 
        }catch(error){
            console.log(error)
        }
    }
    
    add = async (obj) => {
        const list = await this.read()
        const nextId = this.getNextId(list)
        obj.id = nextId
        list.push(obj)
        fs.writeFileSync(this.path, list, error => {
            if(error) return console.log('Hubo un error al escribir archivo')
        })   

        
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const product = {
            id: this.getNextId(this.path),
            //title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
        }

        let products = []
        if(fs.existsSync(this.path)){
            products = JSON.parse(fs.readFileSync(this.path, 'utf-8'))  
            
        }
        console.log('Lista productos: ',products)
        console.log('El producto agregado: ', product)
        products.push(product)
        let stg = JSON.stringify(products)
        fs.writeFileSync(this.path, stg, error => {
            if(error) return console.log('Hubo un error al escribir archivo')
        })   
    }
/*
    //Add product 2
    addProduct = (obj) => {
        const product = {
            id: this.getNextId(this.path),
            name: obj.name,
            title: obj.title,
            description: obj.description,
            price: obj.price,
            thumbnail: obj.thumbnail,
            code: obj.code,
            stock: obj.stock,
        }

        let products = []
        if(fs.existsSync(this.path)){
            products = JSON.parse(fs.readFileSync(this.path, 'utf-8'))  
            
        }
        console.log('Lista productos: ',products)
        console.log('El producto agregado: ', product)
        products.push(product)
        let stg = JSON.stringify(products)
        fs.writeFileSync(this.path, stg, error => {
            if(error) return console.log('Hubo un error al escribir archivo')
        })   
    }
    
*/
    getById = (id) => {
        try{
            let total = this.total(this.path)
            if((id>0) && (id<(total+1))){
               let products = this.getProdObj(this.path)
                return products[id-1]
            }else return 'Not found'
        }catch(error){
            console.log(error)
        }
    }

    update = (id, title, description, price, thumbnail, code, stock) => {
        try{
            let products = this.getProdObj(this.path)
            let product = this.getProductById(id)
            if(product != null){
                if(title) products[id-1].title = title
                if(description) products[id-1].description = description
                if(price) products[id-1].price = price
                if(thumbnail) products[id-1].thumbnail = thumbnail
                if(code) products[id-1].code = code
                if(stock) products[id-1].stock = stock
        
                let stg = JSON.stringify(products)
                fs.writeFileSync(this.path, stg, error => {
                    if(error) return console.log('Hubo un error al escribir archivo')
                    return true
                }) 
            }else{
                return false
            }
        }catch(error){
            console.log(error)
        }
    }

    //Borrado logico, deja el producto en null
    delete = (id) => {
        try{
            let products = this.getProdObj(this.path)
            products[id-1].title = null
            products[id-1].description = null
            products[id-1].price = null
            products[id-1].thumbnail = null
            products[id-1].code = null
            products[id-1].stock = null

            let stg = JSON.stringify(products)
            fs.writeFileSync(this.path, stg, error => {
                if(error) return console.log('Hubo un error al escribir archivo')
                return true
            }) 
        }catch(error){
            console.log(error)
        }
    }
}


//module.exports = ProductManager;
export default ProductManager


