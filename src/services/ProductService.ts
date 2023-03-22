import IProduct from "@/types/IProduct"
const ProductService = {
    get: async () => {
        try {
            const token = localStorage.getItem('token')
            const requestHeaders: HeadersInit = new Headers();
            requestHeaders.set('Authorization', token || '')
            const response = await fetch(`${process.env.api}/api/products/findByCategory/1`, {
                headers: requestHeaders
            })
            const responseJson = await response.json()
            return responseJson
        } catch (e) {
            console.log(e)
        }
    },
    store: async (product: IProduct) => {
        try {
            console.log(product.image1)
            const token = localStorage.getItem('token')
            const requestHeaders: HeadersInit = new Headers();
            requestHeaders.set('Content-Type', 'multipart/form-data');
            const formData: FormData = new FormData()
            formData.append('name', product.name)
            formData.append('description', product.description)
            formData.append('price', String(product.price))
            formData.append('stock', String(product.stock))
            formData.append('image', product.image)
            requestHeaders.set('Authorization', token || '')
    
            const response = await fetch(`${process.env.api}/api/products/create`, {
                method: 'POST',
                body: formData,
              
            })
            const responseJson = await response.json()
            return responseJson
        } catch (e) {
            console.log(e)
        }
    },
    update: async (product: IProduct) => {
        try {
            const token = localStorage.getItem('token')
            const requestHeaders: HeadersInit = new Headers();
            requestHeaders.set('Content-Type', 'application/json');
            requestHeaders.set('Authorization', token || '')
            const response = await fetch(`${process.env.api}/api/products`, {
                headers: requestHeaders,
                method: 'PUT',
                body: JSON.stringify(product),
           
            })
            console.log(response)
            const responseJson = await response.json()
            return responseJson
        } catch (e) {
            console.log(e)
        }
    },

    delete: async (product_id: number) => {
        try {
            const token = localStorage.getItem('token')
            const requestHeaders: HeadersInit = new Headers();
            requestHeaders.set('Authorization', token || '')
            const response = await fetch(`${process.env.api}/api/products/${product_id}`, {
                headers: requestHeaders,
                method: 'DELETE'
            })
            console.log(response)
            const responseJson = await response.json()
            return responseJson
        } catch (e) {
            console.log(e)
        }
    }
}

export default ProductService