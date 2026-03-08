async function getPrisma() {
  const { prisma: prismaPromise } = await import('./lib/prisma.ts');
  return await prismaPromise;
}

async function addProduct() {
  const prisma = await getPrisma();
  try {
    console.log('🆕 Add New Product to Lumeza');
    console.log('==============================');

    // Template produk baru
    const newProduct = {
      slug: 'your-product-slug', // harus unik
      name: 'Your Product Name',
      description: 'Detailed description of your product...',
      type: 'icon', // 'icon', 'template', atau 'illustration'
      style: 'line', // untuk icon: 'line', 'glyph', 'color' | untuk template: null
      category: 'Business', // kategori produk
      price: 149000, // harga dalam Rupiah
      salePrice: null, // harga diskon, null jika tidak ada diskon
      images: JSON.stringify(['https://your-image-url.com/image1.jpg']), // array gambar
      fileUrl: 'https://your-download-url.com/file.zip', // URL file download
      tags: JSON.stringify(['tag1', 'tag2', 'tag3']), // array tags
      downloads: 0, // mulai dari 0
      views: 0 // mulai dari 0
    };

    // Validasi input
    if (!newProduct.slug || !newProduct.name || !newProduct.description) {
      console.log('❌ Error: slug, name, and description are required!');
      console.log('📝 Please edit the newProduct object above with your product details.');
      return;
    }

    // Cek apakah slug sudah ada
    const existing = await prisma.product.findUnique({
      where: { slug: newProduct.slug }
    });

    if (existing) {
      console.log(`❌ Error: Product with slug "${newProduct.slug}" already exists!`);
      console.log('💡 Choose a different slug.');
      return;
    }

    // Buat produk baru
    const createdProduct = await prisma.product.create({
      data: newProduct
    });

    console.log('✅ Product added successfully!');
    console.log(`📦 ${createdProduct.name}`);
    console.log(`🔗 Slug: ${createdProduct.slug}`);
    console.log(`🏷️  Type: ${createdProduct.type}`);
    console.log(`📂 Category: ${createdProduct.category}`);
    console.log(`💰 Price: Rp${createdProduct.price.toLocaleString()}`);
    console.log(`🆔 ID: ${createdProduct.id}`);

  } catch (error) {
    console.error('❌ Error adding product:', error.message);
  } finally {
    // Note: Prisma client handles disconnection automatically in this setup
  }
}

addProduct();