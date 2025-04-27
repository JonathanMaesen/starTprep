import dotenv from "dotenv";
import { MongoClient } from "mongodb"
dotenv.config();
let client: MongoClient;

/**
 * Creates a MongoDB client and connects to the database using environment variables.
 */
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

/**
 * Retrieves the MongoDB client instance.
 * 
 * @returns The MongoDB client instance.
 */
//exports the client to be used in other scripts
export function getClient() {
    return client;
}
//possibility when all collections are defined we coould use a enum
enum collectionenum {
    collectionenum = "collectionenum"
}

/**
 * Inserts a single object into a specified MongoDB collection.
 * 
 * @param collectionin - The name of the collection.
 * @param obj - The object to insert.
 * @returns The result of the insertion.
 */
export async function insertOneObjMongodb(collectionin: string, obj: any) {
    try {
        await client.connect();
        const result = await client.db("StarTprep").collection(collectionin).insertOne(obj);
        return result
    } catch (e) {
        console.error(e);
    } 
}

/**
 * Inserts an array of objects into a specified MongoDB collection.
 * 
 * @param collectionin - The name of the collection.
 * @param objarr - The array of objects to insert.
 * @returns The result of the insertion.
 */
export async function insertArrObjMongodb(collectionin: string, objarr: any) {
    try {
        await client.connect();
        const result = await client.db("StarTprep").collection(collectionin).insertMany(objarr);
        return result
    } catch (e) {
        console.error(e);
    } 
}

/**
 * Retrieves the first element from a specified MongoDB collection.
 * 
 * @param collectionin - The name of the collection.
 * @returns The first element in the collection.
 */
export async function getFirstElementMongoDb(collectionin: string) {
    try {
        await client.connect();
        const result = await client.db("StarTprep").collection(collectionin).findOne({});
        return result
    } catch (e) {
        console.error(e);
    } 
}

/**
 * Retrieves the first element from a specified MongoDB collection based on a filter parameter.
 * 
 * @param collectionin - The name of the collection.
 * @param parameter - The filter parameter.
 * @returns The first matching element in the collection.
 */
export async function getFirstElementMongoDbWithParameter(collectionin: string, parameter: any) {
    try {
        await client.connect();
        const result = await client.db("StarTprep").collection(collectionin).findOne(parameter);
        return result
    } catch (e) {
        console.error(e);
    } 
}

/**
 * Retrieves all data from a specified MongoDB collection based on a query.
 * 
 * @param collectionin - The name of the collection.
 * @param query - The query to filter the data.
 * @returns An array of matching data.
 */
export async function getAllDataQueryMongoDB(collectionin: string, query: any) {
    try {
        await client.connect();
        const result = await client.db("StarTprep").collection(collectionin).find(query).toArray();
        return result
    } catch (e) {
        console.error(e);
    } 
}

/**
 * Retrieves all data from a specified MongoDB collection.
 * 
 * @param collectionin - The name of the collection.
 * @returns An array of all data in the collection.
 */
export async function getAllDataMongoDB(collectionin: string) : Promise<any> {
    try {
        await client.connect();
        const result = await client.db("StarTprep").collection(collectionin).find({}).toArray();
        return result;
    } catch (e) {
        console.error(e);
    } 
}

/**
 * Retrieves sorted data from a specified MongoDB collection.
 * 
 * @param collectionin - The name of the collection.
 * @param sortparameter - The parameter to sort the data by.
 * @returns A sorted array of data.
 */
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

/**
 * Retrieves sorted data from a specified MongoDB collection with collation.
 * 
 * @param collectionin - The name of the collection.
 * @param sortparameter - The parameter to sort the data by.
 * @param collationParameter - The collation parameter for sorting.
 * @returns A sorted array of data.
 */
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

/**
 * Retrieves a limited number of data entries from a specified MongoDB collection.
 * 
 * @param collectionin - The name of the collection.
 * @param limitamount - The maximum number of entries to retrieve.
 * @returns An array of data entries.
 */
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

/**
 * Retrieves a limited number of data entries from a specified MongoDB collection, skipping a specified number of entries.
 * 
 * @param collectionin - The name of the collection.
 * @param skipamount - The number of entries to skip.
 * @param limitamount - The maximum number of entries to retrieve.
 * @returns An array of data entries.
 */
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

/**
 * Updates a single element in a specified MongoDB collection.
 * 
 * @param db - The database name.
 * @param collectionin - The name of the collection.
 * @param updatequeryset1 - The query to find the element to update.
 * @param updatequeryset2 - The update data.
 * @returns The result of the update operation.
 */
// //update 1 element 
export async function updateElement(db:string, collectionin:string, updatequeryset1:any,updatequeryset2:any) {
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

/**
 * Updates multiple elements in a specified MongoDB collection.
 * 
 * @param db - The database name.
 * @param collectionin - The name of the collection.
 * @param updatequeryset1 - The query to find the elements to update.
 * @param updatequeryset2 - The update data.
 * @returns The result of the update operation.
 */
// //update elements 
export async function updateElements(db:string, collectionin:string,updatequeryset1:any,updatequeryset2:any) {
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

/**
 * Deletes a single element from a specified MongoDB collection.
 * 
 * @param collectionin - The name of the collection.
 * @param updatequery - The query to find the element to delete.
 * @returns The result of the delete operation.
 */
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

/**
 * Deletes multiple elements from a specified MongoDB collection.
 * 
 * @param collectionin - The name of the collection.
 * @param updatequery - The query to find the elements to delete.
 * @returns The result of the delete operation.
 */
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

/**
 * Creates an index in a specified MongoDB collection.
 * 
 * @param collectionin - The name of the collection.
 * @param indexquery - The index query.
 */
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

/**
 * Retrieves a MongoDB collection object for custom operations.
 * 
 * @param collectionin - The name of the collection.
 * @returns The MongoDB collection object.
 */
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

/**
 * Closes the MongoDB client connection when the application shuts down.
 */
//when the app shutdowns, shut down the connection
process.on("SIGINT", async () => {
    await client.close();
    console.log("Closing the mongodbd client");
    process.exit();
});

/**
 * Closes the MongoDB client connection.
 */
export async function closeConnection() {
    await client.close();
    console.log("MongoDB connection closed");
}