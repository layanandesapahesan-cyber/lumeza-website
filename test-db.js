import { prisma } from './lib/prisma.js'

async function checkData() {
  try {
    const products = await prisma.product.findMany({ take: 1 })
    console.log('First product:', JSON.stringify(products[0], null, 2))
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkData()