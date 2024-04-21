import { client } from "../index.js";


export async function createUser(data) {
    return await client.db("startoon_app").collection("signupData").insertOne(data);
}

export async function getUserByName(email) {
    return await client.db("startoon_app").collection("signupData").findOne({ _id:email });
}

export async function updateUserLoginInfo(email) {
    const user = await getUserByName(email);
    const loginInfo = {
      loginDate: new Date(),
      count: user.loginInfo ? user.loginInfo.count + 1 : 1
    };
    await client.db("startoon_app").collection("signupData").updateOne(
      { _id: email },
      { $set: { loginInfo: loginInfo } }
    );
  }
  
  export async function saveLoginInfo(loginInfo) {
    await client.db("startoon_app").collection("loginInfo").insertOne(loginInfo);
  }
