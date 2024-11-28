

// const a = {body: "abcd"}

// const {c,d} = a.jk;

// console.log (`a ${a}\n c ${c}\n d ${d}\n`)


// console.log(process.env.mysql_host)
// console.log(process.env.mysql_user)
// console.log(process.env.mysql_password)
// console.log(process.env.mysql_database)
// console.log(process.env.secret)

// import path from 'node:path'

// const __dirname = import.meta.dirname;
// const frontend = path.join(__dirname, 'frontend');

// console.log(frontend)



const animals = { cat: "cat1", dog: "dog1", lion: "lion1" }

Object.entries(animals).forEach(([key, value]) => {
    console.log(`${key}: ${value}`)
});


for (const [key, value] of Object.entries(animals)) {
    console.log(
        `changing\n-> ${key}: ${value}\n`
    );
}