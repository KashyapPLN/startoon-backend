import { client } from "../index.js";

export async function getAllCartItemsById(_id) {
    return await client.db("GID_project").collection("cart").findOne({ _id: _id });
}

export async function addItem(req) {
    return await client.db("GID_project").collection("cart").insertOne(req);
}

export async function updateCartById(_id, data) {
    return await client.db("GID_project").collection("cart").updateOne({ _id: _id }, { $set:{'item':data } });
}

export async function deleteCartById(_id) {
    return await client.db("GID_project").collection("cart").deleteOne({ _id: _id });
}
