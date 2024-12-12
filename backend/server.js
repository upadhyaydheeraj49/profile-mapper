const express = require('express');
const path = require('path');
const {open} = require('sqlite');
const sqlite3 = require('sqlite3');
const jwt = require('jsonwebtoken');

const app = express();
let db = null;
const port = process.env.PORT || 3000;

const initializeServerAndDb = async () => {
    const dbPath = path.join(__dirname, "profileMapper.db");
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });
    }
    catch(e) {
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    }
    app.listen(port, () => {
        console.log('Server Started');
    });
}
initializeServerAndDb();

app.post('/api/login', async (req, res) => {
    console.log(req.body);
    const userDetails = req.body;
    const {username, password, type} = userDetails;
    const validateUserQuery = `SELECT * FROM users WHERE username LIKE ${username};`;
    const dbUser = await db.get(validateUserQuery);

    if (dbUser !== undefined) {
        //check pass and type
        if (password !== dbUser.password) {
            res.status(400);
            res.send({error_msg: "Invalid password"})
        } else if (type !== dbUser.type) {
            res.status(400);
            res.send({error_msg: "Invalid user type"})
        } else {
            const jwt_token = await jwt.sign({username}, 'secret_key');
            res.send({jwt_token});
        }
    }
    else {
        res.status(400);
        res.send({error_msg: "Invalid user"});
    }
})

const authenticateToken = async (request, response, next) => {
    let jwtToken
    authHeader = request.headers['authorization']

    if (authHeader !== undefined) {
    //take out the token
    jwtToken = authHeader.split(' ')[1]
    }

    await jwt.verify(jwtToken, 'secret_key', (error, payload) => {
    if (error) {
        response.status(401)
        response.send('Invalid JWT Token')
    } else {
        next()
    }
    })
}

app.get('/api/persons', async (req, res) => {
    const getPersonsQuery = `SELECT * FROM persons;`
    const data = await db.all(getPersonsQuery);
    res.send(data);
});

app.get('/api/persons/:id', async (req, res) => {
    const {id} = req.params;
    const getPersonQuery = `SELECT * FROM persons WHERE persons.id=${id}`;
    const data = await db.get(getPersonQuery);
    res.send(data);
});