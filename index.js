const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

let products = [
 {
    id: 1,
    name: 'Yellow sport set',
    description: 'lLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla massa ex, ut sagittis ipsum semper nec. Duis condimentum diam nec nisi molestie',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=420&q=80',
    price: '$10'
 },
 {
    id: 2,
    name: 'Blue winter jacket',
    description: 'lLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla massa ex, ut sagittis ipsum semper nec. Duis condimentum diam nec nisi molestie',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    price: '$15'
 },
 {
    id: 3,
    name: 'Brown leather jacket',
    description: 'lLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla massa ex, ut sagittis ipsum semper nec. Duis condimentum diam nec nisi molestie',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=495&q=80',
    price: '$23'
 },
]

//get all products
app.get('/api/products', (request, response) => {
    response.json(products)
})

//get the specific product
app.get('/api/products/:id', (request, response) => {
    const id = Number(request.params.id)
    const product = products.find(product => product.id === id) 

    if (product) return response.json(product) //status 200
    return response.status(404).end() //status 404, the product don't exist
})

app.delete('/api/products/:id', (request, response) => {
    const id = Number(request.params.id)
    products = products.filter(product => product.id !== id)
    response.status(204).end() //no content
})

app.post('/api/products', (request, response) => {
    const product = request.body
    const ids = products.map(product => product.id)
    const maxId = Math.max(...ids)

    const newProduct = {
        id: maxId +1,
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price
    }

    products = products.concat(newProduct) //add the new product to the list
    response.json(newProduct)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})