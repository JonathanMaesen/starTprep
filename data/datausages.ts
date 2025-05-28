import { getAllDataMongoDB, insertOneObjMongodb, deleteElement, insertArrObjMongodb, getCollectionObj, updateElement, updateElements } from "./database";
import { Ingredient, Dish, Floorelement, Proteintype, Categorytype } from "./types";
export let ingredients: Ingredient[];
export let dishes: Dish[];
export let floor: Floorelement[];
export let dishmaster: {
    categoryMaster: string[];
    proteinTypeMaster: string[];
} = {
    categoryMaster: [],
    proteinTypeMaster: []
};

/**
 * Fetches and sets the category master data from the "categories" collection.
 */
async function getCategoryMaster() {
    const data: Categorytype[] = await getAllDataMongoDB("categories");
    const mappedData = data.map(e => e.nameofcategorie);
    dishmaster.categoryMaster = mappedData;
}

/**
 * Fetches and sets the protein type master data from the "proteinname" collection.
 */
async function getProteinMaster() {
    const data: Proteintype[] = await getAllDataMongoDB("proteinname");
    const mappedData = data.map(e => e.nameofprotein);
    dishmaster.proteinTypeMaster = mappedData;
}

/**
 * Combines category and protein type master data into the dishmaster object.
 */
export async function makeDishmaster() {
    try {
        await getCategoryMaster();
        await getProteinMaster();
    } catch (error) {
        console.error("failed making the dish");
        console.error(error);
    }

}

/**
 * Fetches all ingredient data from the "ingredients" collection and sets it to the ingredients array.
 */
async function getDataIngredients() {
    const data: Ingredient[] | undefined = await getAllDataMongoDB("ingredients");
    if (data) {
        ingredients = data;
    } else {
        logbackend("Error when fetching ingredients\nExiting the process");
        process.exit(1);
    }
}

/**
 * Fetches all dish data from the "dishes" collection and sets it to the dishes array.
 */
async function getDishes() {
    const data: Dish[] | undefined = await getAllDataMongoDB("dishes");
    if (data) {
        dishes = data;
    } else {
        logbackend("Error when fetching dishes\nExiting the process");
        process.exit(1);
    }
}

/**
 * Fetches all floor data from the "floor" collection and sets it to the floor array.
 */
async function getFloor() {
    const data: Floorelement[] | undefined = await getAllDataMongoDB("floor");
    if (data) {
        floor = data;
    } else {
        logbackend("Error when fetching floor\nExiting the proccess");
        process.exit(1);
    }
}

/**
 * Adds a new ingredient to the ingredients array and inserts it into the "ingredients" collection.
 * 
 * @param objin - The ingredient object to add.
 */
export async function pushIngredient(objin: Ingredient) {
    try {
        ingredients.push(objin);
        const response = await insertOneObjMongodb("ingredients", objin);
    } catch (e) {
        console.error(e);
    }
}

/**
 * Adds a new categorie to the categoriemaster array of categoriemaster and inserts it into the "categorie" collection.
 * 
 * @param categorieMasterNew - The categorieMasterNew string to add.
 */
export async function pushCategorieMaster(categorieMasterNew: string) {
    try {
        dishmaster.categoryMaster.push(categorieMasterNew);
        await insertOneObjMongodb("categories", categorieMasterNew);
    } catch (e) {
        console.error(e);
    }
}

/**
 * Adds a new protein to the proteinmaster array of proteinmaster and inserts it into the "protein" collection.
 * 
 * @param proteinMasterNew - The proteinMasterNew string to add.
 */
export async function pushProteinMaster(proteinMasterNew: string) {
    try {
        dishmaster.proteinTypeMaster.push(proteinMasterNew);
        await insertOneObjMongodb("proteinname", proteinMasterNew);
    } catch (e) {
        console.error(e);
    }
}

/**
 * Adds a new dish to the dishes array and inserts it into the "dishes" collection.
 * 
 * @param dish - The dish object to add.
 */
export async function pushDish(dish: Dish) {
    try {
        dishes.push(dish);
        const response = await insertOneObjMongodb("dishes", dish);
    } catch (e) {
        console.error(e);
    }
}

/**
 * Adds a new floor element to the floor array and inserts it into the "floor" collection.
 * 
 * @param floorElement - The floor element object to add.
 */
export async function pushFloorElement(floorElement: Floorelement) {
    try {
        floor.push(floorElement);
        const response = await insertOneObjMongodb("floor", floorElement);
    } catch (e) {
        console.error(e);
    }
}

/**
 * Deletes an ingredient from the ingredients array and the "ingredients" collection.
 * 
 * @param idin - The ID of the ingredient to delete.
 */
export async function deleteIngredient(idin: number) {
    try {
        const indexofelement = ingredients.findIndex((e) => { return e.id == idin });
        ingredients.splice(indexofelement, 1);
        const response = await deleteElement("ingredients", { id: idin });
    } catch (e) {
        console.error(e);
    }
}

/**
 * Deletes a dish from the dishes array and the "dishes" collection.
 * 
 * @param dishId - The ID of the dish to delete.
 */
export async function deleteDish(dishId: number) {
    try {
        const indexofelement = dishes.findIndex((e) => { return e.dishId == dishId });
        dishes.splice(indexofelement, 1);
        const response = await deleteElement("dishes", { dishId: dishId });
    } catch (e) {
        console.error(e);
    }
}

/**
 * Deletes a floor element from the floor array and the "floor" collection.
 * 
 * @param follownummer - The identifier of the floor element to delete.
 */
export async function deleteFloorElemenut(follownummer: string) {
    try {
        const indexofelement = floor.findIndex((e) => { return e.follownummer == follownummer });
        floor.splice(indexofelement, 1);
        const response = await deleteElement("floor", { follownummer: follownummer });
    } catch (e) {
        console.error(e);
    }
}

/**
 * Deletes a protein type from the proteinTypeMaster array and the "proteinname" collection.
 * 
 * @param proteinName - The name of the protein type to delete.
 */
export async function deleteProteinType(proteinName: string) {
    try {
        const indexofelement = dishmaster.proteinTypeMaster.findIndex((e) => e === proteinName);
        if (indexofelement !== -1) {
            dishmaster.proteinTypeMaster.splice(indexofelement, 1);
            const response = await deleteElement("proteinname", { nameofprotein: proteinName });
        }
    } catch (e) {
        console.error(e);
    }
}

/**
 * Deletes a category from the categoryMaster array and the "categories" collection.
 * 
 * @param categoryName - The name of the category to delete.
 */
export async function deleteCategory(categoryName: string) {
    try {
        const indexofelement = dishmaster.categoryMaster.findIndex((e) => e === categoryName);
        if (indexofelement !== -1) {
            dishmaster.categoryMaster.splice(indexofelement, 1);
            const response = await deleteElement("categories", { nameofcategorie: categoryName });
        }
    } catch (e) {
        console.error(e);
    }
}

/**
 * Inserts an array of ingredients into the ingredients array and the "ingredients" collection.
 * 
 * @param ingredients - The array of ingredients to insert.
 */
export async function insertIngredientArray(ingredients: Ingredient[]) {
    try {
        ingredients.push(...ingredients);
        const response = await insertArrObjMongodb("ingredients", ingredients);
    } catch (e) {
        console.error(e);
    }
}

/**
 * Inserts an array of dishes into the dishes array and the "dishes" collection.
 * 
 * @param dishes - The array of dishes to insert.
 */
export async function insertDishArray(dishes: Dish[]) {
    try {
        dishes.push(...dishes);
        const response = await insertArrObjMongodb("dishes", dishes);
    } catch (e) {
        console.error(e);
    }
}

/**
 * Inserts an array of floor elements into the floor array and the "floor" collection.
 * 
 * @param floorElements - The array of floor elements to insert.
 */
export async function insertFloorElementArray(floorElements: Floorelement[]) {
    try {
        floor.push(...floorElements);
        const response = await insertArrObjMongodb("floor", floorElements);
    } catch (e) {
        console.error(e);
    }
}

/**
 * Inserts an array of protein types into the proteinTypeMaster array and the "proteinname" collection.
 * 
 * @param proteins - The array of protein type names to insert.
 */
export async function insertProteinArray(proteins: string[]) {
    try {
        dishmaster.proteinTypeMaster.push(...proteins);
        const proteinObjects = proteins.map(name => ({ nameofprotein: name }));
        const response = await insertArrObjMongodb("proteinname", proteinObjects);
    } catch (e) {
        console.error(e);
    }
}

/**
 * Inserts an array of categories into the categoryMaster array and the "categories" collection.
 * 
 * @param categories - The array of category names to insert.
 */
export async function insertCategoryArray(categories: string[]) {
    try {
        dishmaster.categoryMaster.push(...categories);
        const categoryObjects = categories.map(name => ({ nameofcategorie: name }));
        const response = await insertArrObjMongodb("categories", categoryObjects);
    } catch (e) {
        console.error(e);
    }
}

/**
 * Updates an ingredient in the "ingredients" collection and refreshes the ingredients array.
 * 
 * @param id - The ID of the ingredient to update.
 * @param updateData - The data to update the ingredient with.
 */
export async function updateIngredient(id: number, updateData: Partial<Ingredient>) {
    try {
        const collection = await getCollectionObj("ingredients");
        if (collection) {
            await collection.updateOne(
                { id: id },
                { $set: updateData }
            );
            await getDataIngredients();
        }
    } catch (e) {
        console.error(e);
    }
}

/**
 * Updates a dish in the "dishes" collection and refreshes the dishes array.
 * 
 * @param dishId - The ID of the dish to update.
 * @param updateData - The data to update the dish with.
 */
export async function updateDish(dishId: number, updateData: Partial<Dish>) {
    try {
        const collection = await getCollectionObj("dishes");
        if (collection) {
            await collection.updateOne(
                { dishId: dishId },
                { $set: updateData }
            );
            getDishes()
        }
    } catch (e) {
        console.error(e);
    }
}

/**
 * Updates a floor element in the "floor" collection and refreshes the floor array.
 * 
 * @param follownummer - The identifier of the floor element to update.
 * @param updateData - The data to update the floor element with.
 */
export async function updateFloorElement(follownummer: string, updateData: Partial<Floorelement>) {
    try {
        const collection = await getCollectionObj("floor");
        if (collection) {
            await collection.updateOne(
                { follownummer: follownummer },
                { $set: updateData }
            );
            await getFloor();
        }
    } catch (e) {
        console.error(e);
    }
}

/**
 * Find a single `Floorelement` whose `follownummer` field matches the value
 * supplied.
 *
 * @param follownummer – the value of the `follownummer` field to look up
 * @returns the matching document or `null` when no match is found
 */
export async function findFloorElement(
    follownummer: string,
): Promise<Floorelement | null> {
    try {
        const collection = await getCollectionObj("floor");
        if (!collection) return null;
        const doc = await collection.findOne<Floorelement>({ follownummer });
        console.log({ searchedFor: follownummer, result: doc });
        return doc as Floorelement | null;
    } catch (e) {
        console.error(e);
        return null;
    }
}

/**
 * Logs an error message to the backend log.
 * 
 * @param error - The error message to log.
 */
function logbackend(error: string) {
    console.log(error);
};

/**
 * Fetches initial data for the application from the database.
 */
async function fetchStartDatabase() {
    const functionarr = [getDataIngredients, getDishes, getFloor, makeDishmaster]
    for (const element of functionarr) {
        await element();
    }
}
fetchStartDatabase();