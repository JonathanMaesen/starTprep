import { getFirstElementMongoDbWithParameter } from "./database";
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

export async function createUser(name: string, role: string, password: string, mail: string) {
    const users = await getSortedCollection("users", { id: -1 });
    const newid = users && users.length > 0 ? (users[0].id + 1) : 1;
    const temp: User = {
        id: newid,
        name: name,
        role: role,
        password: password,
        mail: mail
    }
    await insertOneObjMongodb("users", temp);
}
