import dotenv from "dotenv";
import { MongoClient } from "mongodb"
dotenv.config();
let client: MongoClient;
function createClient() {
    try {
        const uri = `mongodb+srv://${process.env.MONGODBUSERNAME}:${process.env.MONGODBPASSWORD}@${process.env.MONGODBCLUSTERURL}/test?retryWrites=true&w=majority`;
        client = new MongoClient(uri);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
createClient();
export function exportClient() {
    return client;
}
// insert a object in a collection
export async function insertOneObjMongodb(db: string, collectionin: string, obj: any) {
    try {
        await client.connect();
        const result = await client.db(db).collection(collectionin).insertOne(obj);
        return result
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
// insert arr of objects in a collection
export async function insertArrObjMongodb(db: string, collectionin: string, objarr: any) {
    try {
        await client.connect();
        const result = await client.db(db).collection(collectionin).insertMany(objarr);
        return result
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//returns the first element of an collection
export async function getFirstElementMongoDb(db: string, collectionin: string) {
    try {
        await client.connect();
        const result = await client.db(db).collection(collectionin).findOne({});
        return result
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//parse an parameter that will filter on all the data of a collection and give the first one back
export async function getFirstElementMongoDbWithParameter(db: string, collectionin: string, parameter: any) {
    try {
        await client.connect();
        const result = await client.db(db).collection(collectionin).findOne(parameter);
        return result
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//get an array of data based on the database and the collection given
export async function getAllDataQueryMongoDB(db: string, collectionin: string, query: any) {
    try {
        await client.connect();
        const result = await client.db(db).collection(collectionin).find(query).toArray();
        return result
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//get an array of data based on the database and the collection given with queryparameter
export async function getAllDataMongoDB(db: string, collectionin: string) {
    try {
        await client.connect();
        const result = await client.db(db).collection(collectionin).find({});
        return result
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//parse the sortparameter you want to sort on it
export async function getSortedCollection(db: string, collectionin: string, sortparameter: any) {
    try {
        await client.connect();
        const collection = await client.db(db).collection(collectionin);
        const result = await collection.find({}).sort(sortparameter).toArray();
        return result
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//parse the sortparameter and the collactionparameter you want to sort on it
export async function getSortedCollectionCollaction(db: string, collectionin: string, sortparameter: any, collactionparameter: any) {
    try {
        await client.connect();
        const collection = await client.db(db).collection(collectionin);
        const result = await collection.find({}).sort(sortparameter).collation(collactionparameter).toArray();
        return result
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//limit the return arr 
export async function getDataWithLimit(db: string, collectionin: string, limitamount: number) {
    try {
        await client.connect();
        const collection = await client.db(db).collection(collectionin);
        const result = await collection.find({}).limit(limitamount).toArray();
        return result
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//skip an amount and limit the return arr
export async function getDataWithLimitSkip(db: string, collectionin: string, skipamount: number, limitamount: number) {
    try {
        await client.connect();
        const collection = await client.db(db).collection(collectionin);
        const result = await collection.find({}).skip(skipamount).limit(limitamount).toArray();
        return result
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//apparently update parameters are not allowed to be parsed as 1 object but as 2 or 3
//this means that update has to be done for eachimplication seperatly
// //update 1 element 
// export async function updateElement(db:string, collectionin:string, updatequery:any) {
//     try {
//         await client.connect();
//         const collection = await client.db(db).collection(collectionin);
//         const result = await collection.updateOne(updatequery);
//         return result
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }
// //update elements 
// export async function updateElements(db:string, collectionin:string, updatequery:any) {
//     try {
//         await client.connect();
//         const collection = await client.db(db).collection(collectionin);
//         const result = await collection.updateMany(updatequery);
//         return result
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }
//delete 1 element 
export async function deleteElement(db: string, collectionin: string, updatequery: any) {
    try {
        await client.connect();
        const collection = await client.db(db).collection(collectionin);
        const result = await collection.deleteOne(updatequery);
        return result
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//delete elements 
export async function deleteElements(db: string, collectionin: string, updatequery: any) {
    try {
        await client.connect();
        const collection = await client.db(db).collection(collectionin);
        const result = await collection.deleteMany(updatequery);
        return result
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//creates a index
export async function createMongodbindex(db: string, collectionin: string, indexquery: any) {
    try {
        await client.connect();
        const collection = await client.db(db).collection(collectionin);
        await collection.createIndex(indexquery);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

//use this to get a the collection obj so you can do custom operations with it
export async function getCollectionObj(db: string, collectionin: string) {
    try {
        await client.connect();
        const result = await client.db(db).collection(collectionin);
        return result
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}