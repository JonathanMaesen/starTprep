import dotenv from "dotenv";
import { MongoClient } from "mongodb"
dotenv.config();
let client: MongoClient;

function createClient() {
    try {
        const uri = `mongodb+srv://${process.env.MONGODBUSERNAME}:${process.env.MONGODBPASSWORD}@${process.env.MONGODBCLUSTERURL}/`;
        client = new MongoClient(uri);
        console.log(`database connect for user ${process.env.MONGODBUSERNAME}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
createClient();
//exports the client to be used in other scripts
export function getClient() {
    return client;
}
//possibility when all collections are defined we coould use a enum
enum collectionenum {
    collectionenum = "collectionenum"
}

// insert a object in a collection
export async function insertOneObjMongodb(collectionin: string, obj: any) {
    try {
        await client.connect();
        const result = await client.db("StarTprep").collection(collectionin).insertOne(obj);
        return result
    } catch (e) {
        console.error(e);
    }
}
// insert arr of objects in a collection
export async function insertArrObjMongodb(collectionin: string, objarr: any) {
    try {
        await client.connect();
        const result = await client.db("StarTprep").collection(collectionin).insertMany(objarr);
        return result
    } catch (e) {
        console.error(e);
    }
}
//returns the first element of an collection
export async function getFirstElementMongoDb(collectionin: string) {
    try {
        await client.connect();
        const result = await client.db("StarTprep").collection(collectionin).findOne({});
        return result
    } catch (e) {
        console.error(e);
    }
}
//parse an parameter that will filter on all the data of a collection and give the first one back
export async function getFirstElementMongoDbWithParameter(collectionin: string, parameter: any) {
    try {
        await client.connect();
        const result = await client.db("StarTprep").collection(collectionin).findOne(parameter);
        return result
    } catch (e) {
        console.error(e);
    }
}
//get an array of data based on the database and the collection given
export async function getAllDataQueryMongoDB(collectionin: string, query: any) {
    try {
        await client.connect();
        const result = await client.db("StarTprep").collection(collectionin).find(query).toArray();
        return result
    } catch (e) {
        console.error(e);
    }
}
//get an array of data based on the database and the collection given with queryparameter
export async function getAllDataMongoDB(collectionin: string): Promise<any> {
    try {
        await client.connect();
        const result = await client.db("StarTprep").collection(collectionin).find({}).toArray();
        return result;
    } catch (e) {
        console.error(e);
    }
}
//parse the sortparameter you want to sort on it
export async function getSortedCollection(collectionin: string, sortparameter: any) {
    try {
        await client.connect();
        const collection = await client.db("StarTprep").collection(collectionin);
        const result = await collection.find({}).sort(sortparameter).toArray();
        return result
    } catch (e) {
        console.error(e);
    }
}
//parse the sortparameter and the collactionparameter you want to sort on it
export async function getSortedCollectionCollection(collectionin: string, sortparameter: any, collationParameter: any) {
    try {
        await client.connect();
        const collection = await client.db("StarTprep").collection(collectionin);
        const result = await collection.find({}).sort(sortparameter).collation(collationParameter).toArray();
        return result
    } catch (e) {
        console.error(e);
    }
}
//limit the return arr 
export async function getDataWithLimit(collectionin: string, limitamount: number) {
    try {
        await client.connect();
        const collection = await client.db("StarTprep").collection(collectionin);
        const result = await collection.find({}).limit(limitamount).toArray();
        return result
    } catch (e) {
        console.error(e);
    }
}
//skip an amount and limit the return arr
export async function getDataWithLimitSkip(collectionin: string, skipamount: number, limitamount: number) {
    try {
        await client.connect();
        const collection = await client.db("StarTprep").collection(collectionin);
        const result = await collection.find({}).skip(skipamount).limit(limitamount).toArray();
        return result
    } catch (e) {
        console.error(e);
    }
}
// //update 1 element 
export async function updateElement(db: string, collectionin: string, updatequeryset1: any, updatequeryset2: any) {
    try {
        await client.connect();
        const collection = await client.db("StarTprep").collection(collectionin);
        const result = await collection.updateOne(updatequeryset1, updatequeryset2);
        return result
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
// //update elements 
export async function updateElements(db: string, collectionin: string, updatequeryset1: any, updatequeryset2: any) {
    try {
        await client.connect();
        const collection = await client.db("StarTprep").collection(collectionin);
        const result = await collection.updateMany(updatequeryset1, updatequeryset2);
        return result
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//delete 1 element 
export async function deleteElement(collectionin: string, updatequery: any) {
    try {
        await client.connect();
        const collection = await client.db("StarTprep").collection(collectionin);
        const result = await collection.deleteOne(updatequery);
        return result
    } catch (e) {
        console.error(e);
    }
}
//delete elements 
export async function deleteElements(collectionin: string, updatequery: any) {
    try {
        await client.connect();
        const collection = await client.db("StarTprep").collection(collectionin);
        const result = await collection.deleteMany(updatequery);
        return result
    } catch (e) {
        console.error(e);
    }
}
//creates a index
export async function createMongodbindex(collectionin: string, indexquery: any) {
    try {
        await client.connect();
        const collection = await client.db("StarTprep").collection(collectionin);
        await collection.createIndex(indexquery);
    } catch (e) {
        console.error(e);
    }
}

//use this to get a the collection obj so you can do custom operations with it
export async function getCollectionObj(collectionin: string) {
    try {
        await client.connect();
        const result = await client.db("StarTprep").collection(collectionin);
        return result
    } catch (e) {
        console.error(e);
    }
}
//when the app shutdowns, shut down the connection
process.on("SIGINT", async () => {
    await client.close();
    console.log("Closing the mongodbd client");
    process.exit();
});
export async function closeConnection() {
    await client.close();
    console.log("MongoDB connection closed");
}