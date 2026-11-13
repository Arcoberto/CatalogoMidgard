const fs = require('fs');
let content = fs.readFileSync('prisma/schema.prisma', 'utf8');

const couponModel = `
model Coupon {
  id             String   @id @default(cuid())
  code           String   @unique
  discountType   String   // "percentage" | "fixed"
  discountValue  Float
  target         String   // "general" | "table_only" | "desk_only" | "shelf_only"
  isActive       Boolean  @default(true)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
`;

if (!content.includes('model Coupon')) {
  content += couponModel;
  fs.writeFileSync('prisma/schema.prisma', content);
  console.log('Added Coupon model to schema.prisma');
} else {
  console.log('Coupon model already exists. Updating it...');
  // Just in case it was partially added
  content = content.replace(/model Coupon \{[\s\S]*?\}/, couponModel.trim());
  fs.writeFileSync('prisma/schema.prisma', content);
}
