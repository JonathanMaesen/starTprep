export interface Ingredient {
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

export type role = "ADMIN" | "KEUKEN" | "SERVEERSTER" | "DEVELOPER"
export interface User {
    id: number,
    name: string,
    role: role,
    password: string,
    mail: string
}

export interface UserWeb {
    id: number,
    name: string,
    role: string
}

export interface Proteintype {
    nameofprotein: string
}

export interface Categorytype {
    nameofcategorie: string
}

export interface Ticket {
    follownummer: string,
    chairAndDish: chairAndDish[],
}

export interface chairAndDish {
    chair: number,
    dish: Dish[]
}

// export interface Token{

// }
