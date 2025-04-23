import { getAllDataMongoDB, insertOneObjMongodb, deleteElement, insertArrObjMongodb, getCollectionObj, updateElement, updateElements } from "./database";
import { ObjectId } from "mongodb";
import {Ingredient, Dish, Floorelement} from "./types";
export let ingredients: Ingredient[];
export let dishes: Dish[];
export let floor: Floorelement[];

async function getDataIngredients() {
    const data: Ingredient[] | undefined = await getAllDataMongoDB("ingredients");
    if (data) {
        ingredients = data;
    } else {
        logbackend("Error when fetching ingredients\nExiting the process");
        process.exit(1);
    }
}

async function getDishes() {
    const data: Dish[] | undefined = await getAllDataMongoDB("dishes");
    if (data) {
        dishes = data;
    } else {
        logbackend("Error when fetching dishes\nExiting the process");
        process.exit(1);
    }
}

async function getFloor() {
    const data: Floorelement[] | undefined = await getAllDataMongoDB("floor");
    if (data) {
        floor = data;
    } else {
        logbackend("Error when fetching floor\nExiting the proccess");
        process.exit(1);
    }
}

export async function pushIngredient(objin: Ingredient) {
    try {
        const response = await insertOneObjMongodb("ingredients", objin);
    } catch (e) {
        console.error(e);
    }
}

export async function pushDish(dish: Dish) {
    try {
        const response = await insertOneObjMongodb("dishes", dish);
    } catch (e) {
        console.error(e);
    }
}

export async function pushFloorElement(floorElement: Floorelement) {
    try {
        const response = await insertOneObjMongodb("floor", floorElement);
    } catch (e) {
        console.error(e);
    }
}

export async function deleteIngredient(id: number) {
    try {
        const response = await deleteElement("ingredients", { id: id });
    } catch (e) {
        console.error(e);
    }
}

export async function deleteDish(dishId: number) {
    try {
        const response = await deleteElement("dishes", { dishId: dishId });
    } catch (e) {
        console.error(e);
    }
}

export async function deleteFloorElement(follownummer: string) {
    try {
        const response = await deleteElement("floor", { follownummer: follownummer });
    } catch (e) {
        console.error(e);
    }
}

export async function insertIngredientArray(ingredients: Ingredient[]) {
    try {
        const response = await insertArrObjMongodb("ingredients", ingredients);
    } catch (e) {
        console.error(e);
    }
}

export async function insertDishArray(dishes: Dish[]) {
    try {
        const response = await insertArrObjMongodb("dishes", dishes);
    } catch (e) {
        console.error(e);
    }
}

export async function insertFloorElementArray(floorElements: Floorelement[]) {
    try {
        const response = await insertArrObjMongodb("floor", floorElements);
    } catch (e) {
        console.error(e);
    }
}

export async function updateIngredient(id: number, updateData: Partial<Ingredient>) {
    try {
        const collection = await getCollectionObj("ingredients");
        if (collection) {
            const response = await collection.updateOne(
                { id: id },
                { $set: updateData }
            );
            return response;
        }
    } catch (e) {
        console.error(e);
    }
}

export async function updateDish(dishId: number, updateData: Partial<Dish>) {
    try {
        const collection = await getCollectionObj("dishes");
        if (collection) {
            const response = await collection.updateOne(
                { dishId: dishId },
                { $set: updateData }
            );
            return response;
        }
    } catch (e) {
        console.error(e);
    }
}

export async function updateFloorElement(follownummer: string, updateData: Partial<Floorelement>) {
    try {
        const collection = await getCollectionObj("floor");
        if (collection) {
            const response = await collection.updateOne(
                { follownummer: follownummer },
                { $set: updateData }
            );
            return response;
        }
    } catch (e) {
        console.error(e);
    }
}

//need to implement the log database and function
function logbackend(error: string) {
    console.log(error);
};
async function fetchStartDatabase() {
    const functionarr = [getDataIngredients, getDishes, getFloor]
    for (const element of functionarr) {
        await element();
    }
}
fetchStartDatabase();