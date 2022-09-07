export async function getProducts() {
    const res = await fetch("http://localhost:3000/api/items")
    const products = await res.json()

    return products
}