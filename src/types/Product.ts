export type Dimension = {
    width : number;
    height : number;
    depth : number;
}
export type ReviewType = {
    rating : number;
    comment : string;
    reviewerName : string;
    reviewerEmail : string;
}

export type ProductType = {
    id : number;
    title : string;
    description : string;
    stock : number;
    discountPercentage : number;
    category : string;
    rating : number;
    price : number;
    tags:  string[];
    weight : number;
    dimensions : Dimension;
    reviews : ReviewType[];
    images : string[];
    brand : string;

}