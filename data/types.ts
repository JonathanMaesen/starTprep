import { ObjectId } from "mongodb";
export interface Ingredient {
    _id: ObjectId,
    id: number,
    name: string;
    pricepk: number,
    barcode: string | number,
    unitprice: number,
    quantity: number,
    quantityWeightKg: number
}

export interface Dish {
    dishId: number;
    name: string;
    category: string[];
    proteinType: string[];
    ingredients: Ingredientdish[];
    supplements: Supplement[];
}

export interface Ingredientdish {
    ingredientId: number;
    name: string;
}

export interface Supplement {
    supplementId: number;
    name: string;
}

export interface Floorelement {
    follownummer: string,
    amount: number
}
export interface User {
    id: number,
    name: string,
    role: string,
    password: string,
    mail: string
    password: string,
    mail: string
}

export interface Proteintype {
    nameofprotein: string
}

export interface Categorytype {
    nameofcategorie: string
}
// export interface Token{

// }