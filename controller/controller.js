const { initializeApp } = require("firebase/app");
const { getDatabase, set, ref, onValue, DataSnapshot } = require("firebase/database");


const firebaseConfig = {
    apiKey: "AIzaSyBExdqUMNwNvlZhETruXaNvzIBAVJzRctk",
    authDomain: "date-666d2.firebaseapp.com",
    projectId: "date-666d2",
    storageBucket: "date-666d2.appspot.com",
    messagingSenderId: "936686004542",
    appId: "1:936686004542:web:0f949e221ba7771ee9246f",
    measurementId: "G-VDL8JP4KTC"
};

const app = initializeApp(firebaseConfig);

const checkValue = async (req, res) => {
    try {
        const db = getDatabase();
        const { value } = req.body;
        let changed = false;

        if (value === "Accepted" || value === "Rejected") {
            const dataSnapshot = await new Promise((resolve, reject) => {
                onValue(ref(db, 'value/'), (snapshot) => {
                    resolve(snapshot);
                }, (error) => {
                    reject(error);
                });
            });

            if (!dataSnapshot.exists()) {
                await set(ref(db, "value"), { value });
                res.status(200).json({
                    message: value === "Accepted" ? "Disable Rejected" : "Disable Accepted"
                });
            } else {
                res.status(200).json({
                    message: "Cannot Change"
                });
            }
        } else {
            res.status(400).json({
                message: "Invalid value"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const message = async(req, res) => {
    const db = await getDatabase();
    const {text} = req.body;    
    const value = {
        message : text
    }
    await set(ref(db, "message"), { value });
    res.status(200).json({
        message: 'Message Sent'
    })

}

module.exports = { checkValue, message }