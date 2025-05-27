import { getFirstElementMongoDbWithParameter, getSortedCollection, insertOneObjMongodb } from "./database";
import { role, User, UserWeb } from "./types";
import bcrypt from "bcrypt";
import env from "dotenv";
import * as jwt from "jsonwebtoken";

env.config();

const saltround: number = Number(process.env.SALTROUNDS ?? 10);

export async function checkUserPassword(namein: string, password: string): Promise<Boolean> {
    try {
        const response = await getFirstElementMongoDbWithParameter("users", { name: namein });
        if (response == null) {
            return false;
        }
        let isSame: boolean = await bcrypt.compare(password, response.password);
        if (!isSame) {
            return false;
        }
        return true;
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

export async function getUserInfobyname(name: string) {
    const response = await getFirstElementMongoDbWithParameter("users", { name: name });
    if (!response) {
        return null;
    }
    return response;
}

export async function createUser(name: string, role: role, password: string, mail: string) {
    const users = await getSortedCollection("users", { id: -1 });
    const newid = users && users.length > 0 ? (users[0].id + 1) : 1;
    const hashedpassword: string = await bcrypt.hash(password, saltround);
    const temp: User = {
        id: newid,
        name: name,
        role: role,
        password: hashedpassword,
        mail: mail
    }
    await insertOneObjMongodb("users", temp);
}

export async function createUserJwtToken(iduser: number)
{
    const user = await getUserInfobyid(iduser);
    if(user != null){
        const webUser: UserWeb = {
            id: user.id,
            name: user.name,
            role: user.role
        }    
        const token = jwt.sign(JSON.stringify(webUser), process.env.JWT_SECRET!);
        return token;
    }
}
