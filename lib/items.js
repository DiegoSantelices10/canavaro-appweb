import { getProducts } from 'services/storeService'

export async function getPathsFromTitle() {
    const items = await getProducts();
  
    return items.map((item) => {
      return {
        params: {
          id: convertToPath(item.nombre),
        },
      };
    });
  }
  
  export async function getItemData(id) {
    const items = await getProducts();
    const product = items.find((item) => convertToPath(item.nombre) === id);
    return {
      id,
      data: product,
    };
  }
  
  export function convertToPath(title) {
    return title.toLowerCase().replace(/\s/g, "-");
  }