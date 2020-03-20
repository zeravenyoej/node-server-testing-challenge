const supertest = require("supertest")
const db = require('./data/config')
const server = require('./index')

beforeEach(async () => {
	await db.seed.run()
})


// test("register user", async () => {
//     const res = await supertest(server)
//         .post('/api/auth/register')
//         .send({ username: "darlene", password: "iammother" })
//     expect(res.statusCode).toBe(201)
//     expect(res.type).toBe("application/json")
//     expect(res.body.username).toBe("darlene")
// })

test("login user", async () => {
    const res = await supertest(server)
        .post('/api/auth/login')
        .send({ username: "darlene", password: "iammother" })
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toBe(/welcome/i)
})

// test("delete user", async () => {
//     const res = await supertest(server)
//         .post('/api/auth/register')
//         .send({ username: "darlene", password: "iammother" })
//     expect(res.statusCode).toBe(201)
//     expect(res.type).toBe("application/json")
//     expect(res.body.username).toBe("darlene")
// })





// test("get users route", async () => {
//     const res = await supertest(server).get('/api/users')
//     expect(res.statusCode).toBe(200)
//     expect(res.type).toBe("application/json")
//     //expect(res.body.message).toBe(users)
// })


// test("get contacts", async () => {
//     const res = await supertest(server).get('/api/users')
//     expect(res.statusCode).toBe(200)
//     expect(res.type).toBe("application/json")
//     //expect(res.body.message).toBe(users)
// })


// test("get contacts by id", async () => {
//     const res = await supertest(server).get('/api/users')
//     expect(res.statusCode).toBe(200)
//     expect(res.type).toBe("application/json")
//     //expect(res.body.message).toBe(users)
// })

// test("post contacts", async () => {
//     const res = await supertest(server).get('/api/users')
//     expect(res.statusCode).toBe(200)
//     expect(res.type).toBe("application/json")
//     //expect(res.body.message).toBe(users)
// })