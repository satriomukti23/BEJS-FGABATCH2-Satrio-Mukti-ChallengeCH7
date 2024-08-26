const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

async function main(){
    const admin = await prisma.role.create({
        data: {
            name: 'admin'
        }
    })

    const user = await prisma.role.create({
        data: {
            name: 'user'
        }
    })

    console.log({admin, user})
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        await prisma.$disconnect()
        process.exit(1)
    })
