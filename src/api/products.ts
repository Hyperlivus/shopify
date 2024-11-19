import api from "@/api/index";
import {ProductType} from "@/types/Product";


export type GetAllDto = {
    page ?: number;
    itemsInPage ?: number;
    query ?: string;
}
const ProductsApi = {
    getAll(dto:GetAllDto){
        const start = (dto.page && dto.itemsInPage)? ((dto.page - 1) * dto.itemsInPage) : undefined;
        return api.get(`/search`, {
            params : {
                skip : start,
                limit : dto.itemsInPage,
                q : dto.query,
            }
        }).then<{products:ProductType[]}>(res=>{

            return res.data.products;
        }).catch(err=>{
            return err;
        })
    },
    getOne(id:number):Promise<ProductType>{
        return api.get(`/${id}`).then<ProductType>(r=>{
            return r.data;
        }).catch(err=>{
            return err;
        })
    },
    async getByProducts(ids:number[]){
        const products:ProductType[] = [];
        for (const id of ids){
            const product = await ProductsApi.getOne(id);
            products.push(product);
        }
        return products;
    }
}

export default ProductsApi;