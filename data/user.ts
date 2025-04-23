import { getAllDataMongoDB, insertOneObjMongodb, deleteElement, insertArrObjMongodb, getCollectionObj, updateElement, updateElements } from "./database";
import mongodb, { ObjectId } from "mongodb";
import { Ingredient, Dish, Floorelement, User } from "./types";
let users: User[];
let sessions: Token[];
async function getUsers() {
    users = await getAllDataMongoDB("users");
}
getUsers();

export function checkUserPassword(idin: number, password: string): boolean {
    const userindex: number = users.findIndex((e) => { return e.id == idin });
    if (userindex == -1) {
        console.log("index is wrong" + userindex);
        return false;
    }
    if (users[userindex].password != password) {
        console.log("password is wrong");
        return false;
    }
    return true;
}

export function checkSessions(token: any) {

}