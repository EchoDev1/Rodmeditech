process.env.DATABASE_URL = 'file:./dev.db';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('\n=== Checking Database ===\n');

    // Check Admin users
    const admins = await prisma.admin.findMany();
    console.log('Admin Users:', admins.length);
    admins.forEach(admin => {
      console.log(`  - ${admin.email} (${admin.name})`);
    });

    // Check Contact Info
    const contactInfo = await prisma.contactInfo.findMany({
      orderBy: { order: 'asc' }
    });
    console.log('\nContact Information:', contactInfo.length, 'entries');
    contactInfo.forEach(info => {
      console.log(`  - ${info.title} (${info.type})`);
      console.log(`    Content: ${info.content}`);
    });

    // Check FAQs
    const faqs = await prisma.fAQ.findMany();
    console.log('\nFAQs:', faqs.length, 'entries');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
