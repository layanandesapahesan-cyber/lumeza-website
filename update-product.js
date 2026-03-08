async function getPrisma() {
  const { prisma: prismaPromise } = await import('./lib/prisma.ts');
  return await prismaPromise;
}

async function updateProduct() {
  const prisma = await getPrisma();
  try {
    // Contoh update produk berdasarkan slug
    const slug = process.argv[2]; // Ambil slug dari command line argument

    if (!slug) {
      console.log('❌ Usage: node update-product.js <slug>');
      console.log('📝 Example: node update-product.js business-line-icons');
      process.exit(1);
    }

    // Cek apakah produk ada
    const existingProduct = await prisma.product.findUnique({
      where: { slug }
    });

    if (!existingProduct) {
      console.log(`❌ Product with slug "${slug}" not found`);
      process.exit(1);
    }

    console.log('📦 Current product data:');
    console.log(`   Name: ${existingProduct.name}`);
    console.log(`   Type: ${existingProduct.type}`);
    console.log(`   Category: ${existingProduct.category}`);
    console.log(`   Price: Rp${existingProduct.price.toLocaleString()}`);
    console.log(`   Sale Price: ${existingProduct.salePrice ? 'Rp' + existingProduct.salePrice.toLocaleString() : 'No sale'}`);
    console.log(`   Downloads: ${existingProduct.downloads}`);
    console.log(`   Views: ${existingProduct.views}`);

    // Update data produk
    const updateData = {
      // Uncomment dan ubah field yang ingin diupdate

      // name: 'New Product Name',
      // description: 'Updated description...',
      // price: 199000,
      // salePrice: 149000,
      // images: JSON.stringify(['https://new-image-url.com/image.jpg']),
      // fileUrl: 'https://new-download-url.com/file.zip',
      // tags: JSON.stringify(['new', 'tags', 'here']),
      // downloads: existingProduct.downloads + 1,
      // views: existingProduct.views + 1,

      // Contoh update: tambah views dan downloads
      downloads: existingProduct.downloads + Math.floor(Math.random() * 10) + 1,
      views: existingProduct.views + Math.floor(Math.random() * 50) + 5,
    };

    const updatedProduct = await prisma.product.update({
      where: { slug },
      data: updateData
    });

    console.log('\n✅ Product updated successfully!');
    console.log(`📦 Updated: ${updatedProduct.name}`);
    console.log(`🔗 Slug: ${updatedProduct.slug}`);
    console.log(`💰 Price: Rp${updatedProduct.price.toLocaleString()}`);
    console.log(`📊 Downloads: ${updatedProduct.downloads} (+${updateData.downloads - existingProduct.downloads})`);
    console.log(`👁️  Views: ${updatedProduct.views} (+${updateData.views - existingProduct.views})`);

  } catch (error) {
    console.error('❌ Error updating product:', error.message);
  } finally {
    // Note: Prisma client handles disconnection automatically in this setup
  }
}

updateProduct();