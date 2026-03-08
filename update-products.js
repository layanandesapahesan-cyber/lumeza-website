async function getPrisma() {
  const { prisma: prismaPromise } = await import('./lib/prisma.ts');
  return await prismaPromise;
}

async function updateProducts() {
  const prisma = await getPrisma();
  try {
    console.log('🚀 Lumeza Product Update Tool');
    console.log('================================');

    const args = process.argv.slice(2);

    if (args.length === 0) {
      showHelp();
      return;
    }

    const command = args[0];

    switch (command) {
      case 'list':
        await listProducts();
        break;

      case 'update':
        if (args.length < 2) {
          console.log('❌ Usage: node update-products.js update <slug> [field1=value1] [field2=value2] ...');
          return;
        }
        const slug = args[1];
        const updates = parseUpdates(args.slice(2));
        await updateProduct(slug, updates);
        break;

      case 'bulk-update':
        if (args.length < 3) {
          console.log('❌ Usage: node update-products.js bulk-update <type> <field> <value>');
          console.log('📝 Example: node update-products.js bulk-update icon price 199000');
          return;
        }
        const type = args[1];
        const field = args[2];
        const value = args[3];
        await bulkUpdate(type, field, value);
        break;

      case 'add-views':
        if (args.length < 3) {
          console.log('❌ Usage: node update-products.js add-views <slug> <count>');
          return;
        }
        const productSlug = args[1];
        const viewCount = parseInt(args[2]);
        await addViews(productSlug, viewCount);
        break;

      default:
        console.log(`❌ Unknown command: ${command}`);
        showHelp();
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    // Note: Prisma client handles disconnection automatically in this setup
  }
}

function showHelp() {
  console.log('\n📋 Available Commands:');
  console.log('  list                          - List all products');
  console.log('  update <slug> [updates...]    - Update specific product');
  console.log('  bulk-update <type> <field> <value> - Update all products of a type');
  console.log('  add-views <slug> <count>      - Add views to a product');
  console.log('');
  console.log('📝 Examples:');
  console.log('  node update-products.js list');
  console.log('  node update-products.js update business-line-icons name="New Name" price=199000');
  console.log('  node update-products.js bulk-update icon price 199000');
  console.log('  node update-products.js add-views business-line-icons 100');
}

async function listProducts() {
  const prisma = await getPrisma();
  const products = await prisma.product.findMany({
    select: {
      slug: true,
      name: true,
      type: true,
      category: true,
      price: true,
      downloads: true,
      views: true
    },
    orderBy: { createdAt: 'desc' }
  });

  console.log(`\n📦 Found ${products.length} products:\n`);

  products.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name}`);
    console.log(`   Slug: ${product.slug}`);
    console.log(`   Type: ${product.type} | Category: ${product.category}`);
    console.log(`   Price: Rp${product.price.toLocaleString()}`);
    console.log(`   Stats: ${product.downloads} downloads, ${product.views} views`);
    console.log('');
  });
}

function parseUpdates(args) {
  const updates = {};

  args.forEach(arg => {
    const [key, value] = arg.split('=');
    if (key && value !== undefined) {
      // Parse different data types
      if (value === 'null') {
        updates[key] = null;
      } else if (value === 'true') {
        updates[key] = true;
      } else if (value === 'false') {
        updates[key] = false;
      } else if (!isNaN(value)) {
        updates[key] = parseFloat(value);
      } else if (value.startsWith('[') && value.endsWith(']')) {
        // JSON array
        updates[key] = JSON.stringify(value.slice(1, -1).split(',').map(s => s.trim()));
      } else {
        updates[key] = value;
      }
    }
  });

  return updates;
}

async function updateProduct(slug, updates) {
  const prisma = await getPrisma();
  try {
    const existingProduct = await prisma.product.findUnique({
      where: { slug }
    });

    if (!existingProduct) {
      console.log(`❌ Product with slug "${slug}" not found`);
      return;
    }

    console.log(`📦 Updating: ${existingProduct.name}`);
    console.log('🔄 Changes:', updates);

    const updatedProduct = await prisma.product.update({
      where: { slug },
      data: updates
    });

    console.log('✅ Product updated successfully!');
    console.log(`📦 ${updatedProduct.name} (${updatedProduct.slug})`);

  } catch (error) {
    console.error('❌ Update failed:', error.message);
  }
}

async function bulkUpdate(type, field, value) {
  const prisma = await getPrisma();
  try {
    // Parse value
    let parsedValue = value;
    if (value === 'null') parsedValue = null;
    else if (!isNaN(value)) parsedValue = parseFloat(value);
    else if (value === 'true') parsedValue = true;
    else if (value === 'false') parsedValue = false;

    const result = await prisma.product.updateMany({
      where: { type },
      data: { [field]: parsedValue }
    });

    console.log(`✅ Bulk update completed!`);
    console.log(`📊 Updated ${result.count} ${type} products`);
    console.log(`🔄 Set ${field} = ${parsedValue}`);

  } catch (error) {
    console.error('❌ Bulk update failed:', error.message);
  }
}

async function addViews(slug, count) {
  const prisma = await getPrisma();
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      select: { name: true, views: true }
    });

    if (!product) {
      console.log(`❌ Product with slug "${slug}" not found`);
      return;
    }

    const newViews = product.views + count;

    await prisma.product.update({
      where: { slug },
      data: { views: newViews }
    });

    console.log(`✅ Views updated for: ${product.name}`);
    console.log(`👁️  ${product.views} → ${newViews} (+${count})`);

  } catch (error) {
    console.error('❌ Failed to add views:', error.message);
  }
}

updateProducts();