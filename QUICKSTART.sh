#!/bin/bash

# LUMEZA WEBSITE - QUICK START GUIDE
# =================================
# Script ini akan setup project Lumeza dengan cepat

set -e

echo "🚀 Starting Lumeza Website Setup..."
echo "===================================="
echo ""

# Step 1: Install Dependencies
echo "📦 Step 1: Installing Dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Step 2: Generate Prisma
echo "🔧 Step 2: Generating Prisma Client..."
npx prisma generate
echo "✅ Prisma generated"
echo ""

# Step 3: Setup Database
echo "🗄️  Step 3: Setting up Database..."
npx prisma db push
echo "✅ Database setup complete"
echo ""

# Step 4: Seed Database
echo "🌱 Step 4: Seeding Database with sample products..."
npx prisma db seed
echo "✅ Database seeded with 30+ products"
echo ""

# Step 5: Final Check
echo "✅ Step 5: All systems ready!"
echo ""

echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Configure Environment Variables:"
echo "   - Copy .env.example ke .env.local"
echo "   - Add your Resend API key"
echo "   - Update email addresses"
echo ""
echo "2. Start Development Server:"
echo "   npm run dev"
echo ""
echo "3. Open Browser:"
echo "   http://localhost:3000"
echo ""
echo "4. For Deployment:"
echo "   - Read DEPLOYMENT.md"
echo "   - Follow Vercel setup instructions"
echo ""
echo "📞 Need Help?"
echo "Visit: https://github.com/yourusername/lumeza-website"
echo ""
