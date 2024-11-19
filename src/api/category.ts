import api from "@/api/index";

const CategoryApi = {
    getAll() {
        return api.get("/category-list").then<string[]>(r=>{
            return r.data;
        }).catch(err=>{
            return err;
        });
    }
}

export default CategoryApi;