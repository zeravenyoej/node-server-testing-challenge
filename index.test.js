const supertest = require("supertest")
const db = require('./data/config')
const server = require('./index')

beforeEach(async () => {
	await db.seed.run()
})

// afterAll(async () => {
// 	await db.destroy()
// })

test("register user", async () => {
    const res = await supertest(server)
        .post('/api/auth/register')
        .send({ username: "michael", password: "iammother" })
    expect(res.statusCode).toBe(201)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toBe("Welcome michael! Now go log in please!")
})

test("login user", async () => {
    const res = await supertest(server)
        .post('/api/auth/login')
        .send({ username: "joey", password: "iforgot123" })
    expect(res.type).toBe("application/json")
    expect(res.body.message).toBe("Welcome joey")
})

// test("delete user", async () => {
//     const res = await supertest(server).del('/api/auth/1').send({ username: "joey", password: "iforgot123" })
//     expect(res.statusCode).toBe(200)
//     expect(res.type).toBe("application/json")
//     expect(res.body.message).toBe("user has been deleted")
// })


test("get users route", async () => {
    const res = await supertest(server)
        .post('/api/auth/login')
        .send({ username: "joey", password: "iforgot123" })

    const token = res.cookie
    // split(",").map((item)=>{item.split(";")[0].join(";")})
    console.log(res.headers["set-cookie"][0])
    const response = await supertest(server).get('/api/users').set('cookies', [token])
    expect(response.statusCode).toBe(200)
    expect(response.type).toBe("application/json")
    // expect(res.body).toHaveLength(3)
})


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