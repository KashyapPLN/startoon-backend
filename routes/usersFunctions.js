import { client } from "../index.js";


export async function createUser(data) {
    return await client.db("marlotask").collection("signupData").insertOne(data);
}

export async function updateUser(_id,data) {
    return await client.db("marlotask").collection("signupData").updateOne({ _id: _id }, { $set: data });
}
export async function updateUserPassword(_id,data) {
    return await client.db("marlotask").collection("signupData").updateOne({ _id: _id }, { $set: data });
}
export async function updateUserPhoneNumber(_id,data) {
    return await client.db("marlotask").collection("signupData").updateOne({ _id: _id }, { $set: data });
}
export async function getUserByName(userName) {
    return await client.db("marlotask").collection("signupData").findOne({ _id:userName });
}



