// Carga los datos iniciales (precios, accesorios, cupones) en la base de datos.
// Uso: npm run db:seed   (con DATABASE_URL apuntando a la base de Vercel/Neon)
const { PrismaClient } = require('@prisma/client');
const data = require('./seed-data.json');

const prisma = new PrismaClient();

async function main() {
  for (const { id, updatedAt, ...t } of data.tableModels) {
    await prisma.tableModel.upsert({ where: { name: t.name }, update: t, create: t });
  }
  for (const { id, updatedAt, ...a } of data.accessories) {
    await prisma.accessory.upsert({ where: { key: a.key }, update: a, create: a });
  }
  for (const { id, updatedAt, createdAt, ...c } of data.coupons) {
    await prisma.coupon.upsert({ where: { code: c.code }, update: c, create: c });
  }
  // Frases: solo se cargan si la tabla está vacía (para no duplicar ni pisar cambios del admin)
  if (data.phrases && (await prisma.phrase.count()) === 0) {
    await prisma.phrase.createMany({ data: data.phrases.map((text, order) => ({ text, order })) });
  }
  console.log('Seed completado');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
