import { getProducts } from 'services/storeService'

export async function getPathsFromTitle() {
    const items = await getProducts();
    
   return Object.values(items).map((item) => 
          (    
              item.map(product => 
                ({
                  params: 
                  {
                    id: convertToPath(product.nombre)
                  }
                })
              )
          )  
      )
   
  }
  
  export async function getItemData(id) {
    const items = await getProducts();
    console.log("id que llega: ", id)
    const product = Object.values(items).map(item => (item.find(e => convertToPath(e.nombre) == id))).filter(i => i != undefined)
    return {
      id,
      data: product,
    };
  }
  
  export function convertToPath(title) {
    return title.toLowerCase().replace(/\s/g, "-");
  }