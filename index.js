import express, { response } from "express";
import { MongoClient } from "mongodb";


const app = express();

// const MONGO_URL = "mongodb://localhost";
const MONGO_URL = "mongodb://127.0.0.1";

const PORT = 4000;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected ✌😊");
  return client;
}

const client = await createConnection();

const desserts =[
    {
      id: 1,
      name: "Rasmalai",
      quantitydisplay: "1 pc",
      price: 45,
      pic: "https://www.chefkunalkapur.com/wp-content/uploads/2021/06/Rasmalai-3-1300x867.jpg?v=1625130326",
      rating: "4",
      category: "https://banner2.cleanpng.com/20180601/at/kisspng-vegetarian-cuisine-biryani-indian-cuisine-vegetabl-vegetarian-5b11c235a92d48.569689881527890485693.jpg",
      type: "Milk Deserts",
      qty: 0,
      offer: "50% off | Use WELCOME50"
    },
    {
      id: 2,
      name: "Gulab Jamun",
      quantitydisplay: "2 pc",
      price: 50,
      pic: "https://images.freeimages.com/images/large-previews/095/gulab-jamun-1637925.jpg",
      category: "https://banner2.cleanpng.com/20180601/at/kisspng-vegetarian-cuisine-biryani-indian-cuisine-vegetabl-vegetarian-5b11c235a92d48.569689881527890485693.jpg",
      rating: "4.5",
      type: "Fried",
      qty: 0,
      offer: "50% off | Use WELCOME50"
    },
    {
      id: 3,
      name: "Chocolate Brownies",
      quantitydisplay: "1 pc",
      price: 99,
      pic: "https://images.pexels.com/photos/3666/chocolate-dessert-brownies-cake.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: "4",
      category: "https://icons.iconarchive.com/icons/erudus/allergy/256/eggs-allergy-amber-icon.png",
      type: "Brownies",
      qty: 0,
      offer: "50% off | Use WELCOME50"
    },
    {
      id: 4,
      name: "Jalebi",
      quantitydisplay: "250 gm",
      price: 90,
      pic: "https://cdn.wallpapersafari.com/10/84/aSCOHM.jpg",
      rating: "4",
      category: "https://banner2.cleanpng.com/20180601/at/kisspng-vegetarian-cuisine-biryani-indian-cuisine-vegetabl-vegetarian-5b11c235a92d48.569689881527890485693.jpg",
      type: "Fried",
      qty: 0,
      offer: "50% off | Use WELCOME50"
    },
    {
      id: 5,
      name: "Mixed Donuts",
      quantitydisplay: "250 gm",
      price: 499,
      pic: "https://images.deliveryhero.io/image/fd-th/LH/gjo6-hero.jpg",
      rating: "4",
      category: "https://icons.iconarchive.com/icons/erudus/allergy/256/eggs-allergy-amber-icon.png",
      type: "Donuts",
      qty: 0,
      offer: "50% off | Use WELCOME50"
    },
    {
      id: 6,
      name: "Chocolate Donuts",
      quantitydisplay: "1 pc",
      price: 99,
      pic: "https://foodbythegram.com/wp-content/uploads/2021/02/03153E18-0DF2-4321-8ED4-50D0D5687CB2-4044-000000E0D87D6C61.jpg",
      rating: "3.5",
      category: "https://icons.iconarchive.com/icons/erudus/allergy/256/eggs-allergy-amber-icon.png",
      type: "Donuts",
      qty: 0,
      offer: "50% off | Use WELCOME50"
    },
    {
      id: 7,
      name: "Mango Cheese cake",
      quantitydisplay: "1 pc",
      price: 149,
      pic: "https://img4.goodfon.com/wallpaper/nbig/b/9a/tort-kusok-chizkeik-mango.jpg",
      rating: "4",
      category: "https://banner2.cleanpng.com/20180601/at/kisspng-vegetarian-cuisine-biryani-indian-cuisine-vegetabl-vegetarian-5b11c235a92d48.569689881527890485693.jpg",
      type: "Cheesecake",
      qty: 0,
      offer: "50% off | Use WELCOME50"
    },
    {
      id: 8,
      name: "Chocolate Muffins",
      quantitydisplay: "4 pc",
      price: 200,
      pic: "https://images.pexels.com/photos/3650438/pexels-photo-3650438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: "3",
      category: "https://icons.iconarchive.com/icons/erudus/allergy/256/eggs-allergy-amber-icon.png",
      type: "Muffins",
      qty: 0,
      offer: "50% off | Use WELCOME50"
    },
    {
      id: 9,
      name: "Chocolate Ice Cream",
      quantitydisplay: "150 ml",
      price: 99,
      pic: "https://images.pexels.com/photos/2586924/pexels-photo-2586924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: "4",
      category: "https://banner2.cleanpng.com/20180601/at/kisspng-vegetarian-cuisine-biryani-indian-cuisine-vegetabl-vegetarian-5b11c235a92d48.569689881527890485693.jpg",
      type: "Frozen",
      qty: 0,
      offer: "50% off | Use WELCOME50"
    },
    {
      id: 10,
      name: "Mixed Sugar Candies",
      quantitydisplay: "150 gm",
      price: 99,
      pic: "https://images.pexels.com/photos/1906435/pexels-photo-1906435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "https://banner2.cleanpng.com/20180601/at/kisspng-vegetarian-cuisine-biryani-indian-cuisine-vegetabl-vegetarian-5b11c235a92d48.569689881527890485693.jpg",
      rating: "4",
      type: "Candies",
      qty: 0,
      offer: "50% off | Use WELCOME50"
    },
    {
      id: 11,
      name: "Mixed South Indian Sweet Box",
      quantitydisplay: "250 gm",
      price: 249,
      pic: "https://cdn.shopify.com/s/files/1/1857/6931/products/Assorted_x800_c10e5d8f-10d2-4a30-9740-99c446688752_1200x.jpg?v=1620730546",
      rating: "3.5",
      category: "https://banner2.cleanpng.com/20180601/at/kisspng-vegetarian-cuisine-biryani-indian-cuisine-vegetabl-vegetarian-5b11c235a92d48.569689881527890485693.jpg",
      type: "South Indian",
      qty: 0,
      offer: "50% off | Use WELCOME50"
    },
    {
      id: 12,
      name: "Mixed North Indian Sweet Box",
      quantitydisplay: "250 gm",
      price: 249,
      pic: "https://wallpaperaccess.com/full/4498025.jpg",
      rating: "3",
      category: "https://banner2.cleanpng.com/20180601/at/kisspng-vegetarian-cuisine-biryani-indian-cuisine-vegetabl-vegetarian-5b11c235a92d48.569689881527890485693.jpg",
      type: "North Indian",
      qty: 0,
      offer: "50% off | Use WELCOME50"
    },
    {
      id: 13,
      name: "Strawberry Smoothie",
      quantitydisplay: "250 ml",
      price: 249,
      pic: "https://cdn.mos.cms.futurecdn.net/AWZkNxYWYWLC2v6cmLSf2G.png",
      rating: "3.5",
      category: "https://banner2.cleanpng.com/20180601/at/kisspng-vegetarian-cuisine-biryani-indian-cuisine-vegetabl-vegetarian-5b11c235a92d48.569689881527890485693.jpg",
      type: "Smoothies",
      qty: 0,
      offer: "50% off | Use WELCOME50"
    },
    {
      id: 14,
      name: "Marshmellows",
      quantitydisplay: "100 gm",
      price: 120,
      pic: "https://images.pexels.com/photos/89731/pexels-photo-89731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: "3",
      category: "https://banner2.cleanpng.com/20180601/at/kisspng-vegetarian-cuisine-biryani-indian-cuisine-vegetabl-vegetarian-5b11c235a92d48.569689881527890485693.jpg",
      type: "Candies",
      qty: 0,
      offer: "50% off | Use WELCOME50"
    },
    {
      id: 15,
      name: "Burfis",
      quantitydisplay: "250 gm",
      price: 299,
      pic: "https://wallpaperaccess.com/full/4498512.jpg",
      rating: "3.5",
      category: "https://banner2.cleanpng.com/20180601/at/kisspng-vegetarian-cuisine-biryani-indian-cuisine-vegetabl-vegetarian-5b11c235a92d48.569689881527890485693.jpg",
      type: "Sweets",
      qty: 0,
      offer: "50% off | Use WELCOME50"
    },
    {
      id: 16,
      name: "Fruit cakes",
      quantitydisplay: "250 gm",
      price: 299,
      rating: "3",
      pic: "https://62be89f511735611ddffc9ef--effulgent-cassata-437a9a.netlify.app/dc4.jpeg",
      category: "https://banner2.cleanpng.com/20180601/at/kisspng-vegetarian-cuisine-biryani-indian-cuisine-vegetabl-vegetarian-5b11c235a92d48.569689881527890485693.jpg",
      type: "Cakes",
      qty: 0,
      offer: "50% off | Use WELCOME50"
    },
    {
      id: "17",
      name: "Coconut Laddoos",
      quantitydisplay: "250 gm",
      price: 250,
      pic: "https://images.unsplash.com/photo-1609540969455-ad5ea19be121?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
      rating: "3.5",
      category: "https://banner2.cleanpng.com/20180601/at/kisspng-vegetarian-cuisine-biryani-indian-cuisine-vegetabl-vegetarian-5b11c235a92d48.569689881527890485693.jpg",
      type: "Sweets",
      qty: 0,
      deliverytime: "30 min",
      offer: "50% off | Use WELCOME50"
    }
  ];


app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/dessert', function (req, res) {
    res.send(desserts)
  })

  app.get('/dessert/:id', async function (req, res) {
    const {id} = req.params;
    console.log(req.params,id);
    //  const item = desserts.filter((mi)=> mi.id==id);
    const item= await client.db("GID_project").collection("DessertsData").findOne({id:parseInt(id)})
    
    item ? res.send(item) : res.status(400).send({msg : "menu item not found"});
  })
 


app.listen(PORT,()=>console.log(`App Started in ${PORT}`));