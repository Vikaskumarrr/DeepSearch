#!/bin/bash

echo "🔧 Starting DeepSearch build process..."

# Ensure Prisma client is generated
echo "📦 Generating Prisma client..."
npx prisma generate

# Check if Prisma client was generated successfully
if [ ! -d "./node_modules/.prisma" ]; then
    echo "❌ Prisma client generation failed!"
    exit 1
fi

echo "✅ Prisma client generated successfully"

# Build the Next.js application
echo "🚀 Building Next.js application..."
npm run build

echo "🎉 Build completed successfully!"
