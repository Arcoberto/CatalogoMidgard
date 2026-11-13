const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.coupon.upsert({
    where: { code: 'AGOSTO5' },
    update: {
      discountType: 'percentage',
      discountValue: 5,
      target: 'general',
      isActive: true,
    },
    create: {
      code: 'AGOSTO5',
      discountType: 'percentage',
      discountValue: 5,
      target: 'general',
      isActive: true,
    },
  });
  console.log('Coupon AGOSTO5 added successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
