const { prisma } = require('./lib/prisma');

async function checkProducts() {
  try {
    // Count total products
    const totalCount = await prisma.product.count();
    console.log(`✅ Total products in database: ${totalCount}`);

    // Get sample products
    const products = await prisma.product.findMany({
      take: 5,
      select: {
        slug: true,
        name: true,
        type: true,
        category: true,
        price: true,
        downloads: true,
        views: true
      }
    });

    console.log('\n📦 Sample products:');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   Type: ${product.type}, Category: ${product.category}`);
      console.log(`   Price: Rp${product.price.toLocaleString()}`);
      console.log(`   Downloads: ${product.downloads}, Views: ${product.views}`);
      console.log('');
    });

    // Check product types distribution
    const typeStats = await prisma.product.groupBy({
      by: ['type'],
      _count: { type: true }
    });

    console.log('📊 Product distribution by type:');
    typeStats.forEach(stat => {
      console.log(`   ${stat.type}: ${stat._count.type} products`);
    });

    // Check icon styles
    const iconStats = await prisma.product.groupBy({
      by: ['style'],
      _count: { style: true },
      where: { type: 'icon' }
    });

    console.log('\n🎨 Icon distribution by style:');
    iconStats.forEach(stat => {
      if (stat.style) {
        console.log(`   ${stat.style}: ${stat._count.style} products`);
      }
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkProducts();