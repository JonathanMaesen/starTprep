import { getAllDataMongoDB, insertOneObjMongodb, deleteElement, insertArrObjMongodb, getCollectionObj, updateElement, updateElements } from "./database";
import mongodb, { ObjectId } from "mongodb";
import {Ingredient, Dish, Floorelement, User} from "./types";
let users : User[];
async function getUsers() {
    users = await getAllDataMongoDB("users");
    console.log(users);
}
getUsers();