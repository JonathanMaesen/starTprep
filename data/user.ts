import { getFirstElementMongoDbWithParameter, getSortedCollection, insertOneObjMongodb } from "./database";
import { User } from "./types";

export async function checkUserPassword(namein: string, password: string): Promise<Boolean> {
    try {
        const response = await getFirstElementMongoDbWithParameter("users", { password: password, name: namein });
        if (response != null) {
            return true;
        }
        return false;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function getUserInfobyid(id: number) {
    const response = await getFirstElementMongoDbWithParameter("users", { id: id });
    if (!response) {
        return null;
    }
    return response;
}

export function checkSessions(token: any) {

}