require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

// Initialize Prisma client
const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@rodmeditech.com' },
    update: {},
    create: {
      email: 'admin@rodmeditech.com',
      password: hashedPassword,
      name: 'Admin User'
    }
  });
  console.log('✓ Admin user created:', admin.email);

  // Create About page content
  const about = await prisma.aboutPage.upsert({
    where: { id: 'default' },
    update: {
      mission: "To deliver world-class hospital equipment through transparent partnerships, expert installation, and unwavering after-sales support — ensuring every facility we serve operates at the highest standard of care.",
      vision: "To be Africa's most trusted partner for hospital equipment — empowering healthcare facilities with technology that saves lives and improves patient outcomes at every level of care."
    },
    create: {
      id: 'default',
      mission: "To deliver world-class hospital equipment through transparent partnerships, expert installation, and unwavering after-sales support — ensuring every facility we serve operates at the highest standard of care.",
      vision: "To be Africa's most trusted partner for hospital equipment — empowering healthcare facilities with technology that saves lives and improves patient outcomes at every level of care."
    }
  });
  console.log('✓ About page content created');

  // Create Values
  const values = [
    { title: "Excellence", description: "We deliver only the highest quality equipment, backed by rigorous testing and certifications.", icon: "star", order: 0 },
    { title: "Integrity", description: "Transparent dealings, honest pricing, and genuine partnerships define every relationship.", icon: "shield", order: 1 },
    { title: "Innovation", description: "We stay at the forefront of medical technology to offer cutting-edge solutions.", icon: "bulb", order: 2 },
    { title: "Reliability", description: "Our 24/7 support and maintenance services ensure your operations never miss a beat.", icon: "clock", order: 3 },
  ];

  for (const value of values) {
    await prisma.value.upsert({
      where: { id: `value-${value.order}` },
      update: value,
      create: { id: `value-${value.order}`, ...value }
    });
  }
  console.log('✓ Core values created:', values.length);

  // Create Milestones
  const milestones = [
    { year: "2009", title: "Company Founded", description: "RodMeditech was established with a vision to bring world-class medical equipment to healthcare facilities across Nigeria.", order: 0 },
    { year: "2012", title: "First Major Contract", description: "Secured a full-facility equipment supply and installation contract for a 200-bed teaching hospital.", order: 1 },
    { year: "2016", title: "Regional Expansion", description: "Expanded operations across West Africa, partnering with leading international OEMs.", order: 2 },
    { year: "2019", title: "500th Hospital Milestone", description: "Equipped our 500th hospital, solidifying our position as a market leader in medical equipment solutions.", order: 3 },
    { year: "2023", title: "Innovation Lab Launched", description: "Opened an in-house innovation lab for equipment testing, training, and technology demonstrations.", order: 4 },
  ];

  for (const milestone of milestones) {
    await prisma.milestone.upsert({
      where: { id: `milestone-${milestone.order}` },
      update: milestone,
      create: { id: `milestone-${milestone.order}`, ...milestone }
    });
  }
  console.log('✓ Milestones created:', milestones.length);

  // Create Founders
  const founders = [
    {
      id: 'founder-1',
      name: "Dr. Rodney Okonkwo",
      role: "Co-Founder & CEO",
      bio: "Dr. Rodney Okonkwo is a biomedical engineer with over 18 years of experience in healthcare technology. With a Ph.D. in Biomedical Engineering from Imperial College London, he has led the strategic direction of RodMeditech from a small consultancy to the region's premier medical equipment provider. His expertise spans medical imaging systems, hospital infrastructure planning, and regulatory compliance across multiple African markets.",
      specialties: JSON.stringify(["Medical Imaging", "Strategic Planning", "Regulatory Affairs", "Hospital Infrastructure"]),
      portfolio: "https://linkedin.com/in/rodney-okonkwo",
      email: "rodney@rodmeditech.com",
      order: 0
    },
    {
      id: 'founder-2',
      name: "Engr. Medinat Adeyemi",
      role: "Co-Founder & COO",
      bio: "Engr. Medinat Adeyemi is a certified clinical engineer and operations specialist with 16 years of hands-on experience in large-scale medical equipment installation. She holds an M.Sc. in Clinical Engineering from the University of Lagos and has personally supervised the commissioning of equipment in over 300 hospitals. Her meticulous project management and deep technical knowledge ensure every installation meets international safety standards.",
      specialties: JSON.stringify(["Installation & Commissioning", "Project Management", "Clinical Engineering", "Staff Training"]),
      portfolio: "https://linkedin.com/in/medinat-adeyemi",
      email: "medinat@rodmeditech.com",
      order: 1
    },
  ];

  for (const founder of founders) {
    await prisma.founder.upsert({
      where: { id: founder.id },
      update: founder,
      create: founder
    });
  }
  console.log('✓ Founders created:', founders.length);

  // Create Contact Info
  const contactInfoData = [
    {
      id: 'contact-1',
      type: 'address',
      title: 'Visit Us',
      content: JSON.stringify(["123 Medical Drive, Suite 400", "Lagos, Nigeria"]),
      order: 0
    },
    {
      id: 'contact-2',
      type: 'phone',
      title: 'Call Us',
      content: JSON.stringify(["+234 (0) 800-RODMED", "+234 (0) 812-345-6789"]),
      order: 1
    },
    {
      id: 'contact-3',
      type: 'email',
      title: 'Email Us',
      content: JSON.stringify(["info@rodmeditech.com", "sales@rodmeditech.com"]),
      order: 2
    },
    {
      id: 'contact-4',
      type: 'hours',
      title: 'Business Hours',
      content: JSON.stringify(["Mon - Fri: 8:00 AM - 6:00 PM", "24/7 Emergency Support"]),
      order: 3
    },
  ];

  for (const info of contactInfoData) {
    await prisma.contactInfo.upsert({
      where: { id: info.id },
      update: info,
      create: info
    });
  }
  console.log('✓ Contact info created:', contactInfoData.length);

  // Create FAQs
  const faqs = [
    {
      id: 'faq-1',
      question: "What is the typical lead time for equipment delivery?",
      answer: "Standard equipment ships within 4-8 weeks. Custom configurations may take 10-14 weeks. We provide tracking throughout.",
      order: 0,
      isActive: true
    },
    {
      id: 'faq-2',
      question: "Do you offer financing options?",
      answer: "Yes. We partner with healthcare finance institutions to offer leasing, installment plans, and equipment-as-a-service models.",
      order: 1,
      isActive: true
    },
    {
      id: 'faq-3',
      question: "Do you service equipment from other vendors?",
      answer: "We provide multi-vendor maintenance for major brands. Contact us with your equipment list for a custom service proposal.",
      order: 2,
      isActive: true
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.upsert({
      where: { id: faq.id },
      update: faq,
      create: faq
    });
  }
  console.log('✓ FAQs created:', faqs.length);

  console.log('\n✅ Database seeded successfully!\n');
  console.log('Admin Login Credentials:');
  console.log('Email: admin@rodmeditech.com');
  console.log('Password: admin123\n');
  console.log('⚠️  Remember to change the admin password after first login!');
  console.log('\nAdmin portal URL: http://localhost:3000/admin');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
