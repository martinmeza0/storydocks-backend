const express = require('express')
const app = express()
app.use(express.json())


let products = [
 {
    id: 1,
    name: 'apple',
    description: 'lLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla massa ex, ut sagittis ipsum semper nec. Duis condimentum diam nec nisi molestie',
    image: 'image',
    price: '$10'
 },
 {
    id: 2,
    name: 'banana',
    description: 'lLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla massa ex, ut sagittis ipsum semper nec. Duis condimentum diam nec nisi molestie',
    image: 'image',
    price: '$15'
 },
 {
    id: 3,
    name: 'kiwi',
    description: 'lLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla massa ex, ut sagittis ipsum semper nec. Duis condimentum diam nec nisi molestie',
    image: 'image',
    price: '$23'
 },
]

app.get('/', (request, response) => {
    response.send('<h1>api</h1>')
})

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
        image: product.image,
        price: product.price
    }

    products = products.concat(newProduct)
    response.json(newProduct)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
