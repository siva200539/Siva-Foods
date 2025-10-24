const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = 7001;
app.use(cors());  
app.use(express.json());
const users = [];
const secretKey = "try-a-pwd";

// =================== AUTH ===================
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.sendStatus(201);
  console.log("✅ User registered successfully");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((us) => us.username === username);

  if (user) {
    const isValidUser = await bcrypt.compare(password, user.password);
    if (isValidUser) {
      const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
      res.json({ token });
      console.log("✅ Login successful");
    } else {
      res.status(401).json({ message: "Invalid credentials (wrong password)" });
    }
  } else {
    res.status(401).json({ message: "User not found, please register first" });
  }
});

// =================== MONGO SETUP ===================
const uri =
  "mongodb+srv://siva2005bharathi_db_user:test1@cluster0.iectls7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const food = client.db("demo").collection("food");
    const fdata = client.db("demo").collection("fdata");

    // =================== FOOD ROUTES ===================
    app.post("/upload", async (req, res) => {
      const data = req.body;
      const result = await food.insertOne(data);
      res.send(result);
    });

    app.post("/upload1", async (req, res) => {
      const data = req.body;
      const result = await fdata.insertMany(data);
      res.send(result);
    });

    app.get("/getall", async (req, res) => {
      const result = await food.find().toArray();
      res.send(result);
    });

    app.get("/getone/:id", async (req, res) => {
      const id = req.params.id;
      const result = await food.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.get("/getal", async (req, res) => {
      const result = await fdata.find().toArray();
      res.send(result);
    });

    app.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;
      const result = await food.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.delete("/erase/:id", async (req, res) => {
      const id = req.params.id;
      const result = await fdata.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.patch("/editfood/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      const result = await food.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData },
        { upsert: true }
      );
      res.send(result);
    });

    // =================== ORDER SYSTEM (uses existing 'food' collection) ===================
    app.post("/placeorder", async (req, res) => {
      try {
        const { name, dish, amount, tableNo, transaction } = req.body;

        if (!dish || !amount) {
          return res.status(400).json({ message: "Missing dish or amount" });
        }

        const orderData = {
          name,
          dish,
          amount: Number(amount),
       
          transaction,
          status: "Order Placed",
          createdAt: new Date(),
        };
        
        const result = await food.insertOne(orderData);
        res
          .status(201)
          .json({ message: "✅ Order stored in food collection", result });
        console.log("✅ Order stored:", orderData);
      } catch (err) {
        console.error("❌ Failed to store order:", err);
        res.status(500).json({ message: "Failed to place order" });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB successfully!");
  } finally {
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log("🚀 Server running on port", port);
});
