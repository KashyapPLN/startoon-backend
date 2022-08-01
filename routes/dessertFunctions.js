import { client } from "../index.js";

export async function udateDessertById(id, data) {
    return await client.db("GID_project").collection("DessertsData").updateOne({ id: parseInt(id) }, { $set: data });
}
export async function deleteDessertById(id) {
    return await client.db("GID_project").collection("DessertsData").deleteOne({ id: parseInt(id) });
}
export async function addDesserts(data) {
    return await client.db("GID_project").collection("DessertsData").insertMany(data);
}
export async function getDessertById(id) {
    return await client.db("GID_project").collection("DessertsData").findOne({ id: parseInt(id) });
}
export async function getAllDesserts(req) {
    return await client.db("GID_project").collection("DessertsData").find(req.query).toArray();
}
