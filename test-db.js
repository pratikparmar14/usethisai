const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Attempting to connect to the database...');
        await prisma.$connect();
        console.log('Successfully connected to the database!');

        const count = await prisma.profession.count();
        console.log(`Connection verified. Found ${count} professions.`);

        await prisma.$disconnect();
    } catch (error) {
        console.error('Connection failed:', error.message);
        process.exit(1);
    }
}

main();
