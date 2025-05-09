const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(cors());

const buatKoneksi = () => {
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "absensi"
    });
}

app.post("/registrasi", (req, res) => {
    const {nik, password} = req.body;
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, (err, hashPass) => {
        if(err){
            console.log(err.message);
            return res.status(500).send(`terjadi error: ${err.message}`);
        }
        else{
            try{
                const koneksi = buatKoneksi();
                const query = "INSERT INTO users (nik, password) VALUES (?,?)";

                koneksi.query(query, [nik, hashPass], (err, success) => {
                    if(err){
                        console.log(err.message);
                        return res.status(500).send(`terjadi error: ${err.message}`);
                    }
                    else{
                        console.log("berhasil");
                        return res.status(200).send(`data berhasil terkirim`);
                    }
                });
                koneksi.end();
            }
            catch(err){
                console.log(err);
                return res.status(500).send(`terjadi error: ${err}`);
            }
        }
    });
});

app.post("/login", (req, res) => {
    const {nik, password} = req.body;

    try{
        const koneksi = buatKoneksi();
        const query = "SELECT * FROM users WHERE nik = ?";

        koneksi.query(query, [nik], (err, results) => {
            if(err){
                console.log(err.message);
                return res.status(500).send(`terjadi error: ${err.message}`);
            }

            if(results.length <= 0){
                console.log("tidak ada user ditemukan");
                return res.status(500).send("tidak ada user ditemukan");
            }

            const userRecords = results[0];

            bcrypt.compare(password, userRecords.password, (err, results) => {
                if(results){
                    console.log("login berhasil");
                    return res.status(200).send("login berhasil");
                }
                else{
                    console.log("password salah");
                    return res.status(404).send("password salah");
                }
            });
        });
        koneksi.end();
    }
    catch(err){
        console.log(err)
        return res.status(500).send(err);
    }
})

app.listen(3000, (req, res) => {
    console.log("server berjalan pada port 3000...");
});