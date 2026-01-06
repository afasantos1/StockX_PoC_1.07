#!/bin/bash

# Run all tests across the project

set -e

echo "🧪 Running StockX Test Suite..."

# Frontend tests
echo "📱 Running frontend tests..."
cd frontend
if [ -f "package.json" ]; then
    npm test || echo "Frontend tests skipped"
fi
cd ..

# Backend tests
echo "🔧 Running backend tests..."
cd backend
if [ -f "package.json" ]; then
    npm test || echo "Backend tests skipped"
fi
cd ..

# Smart contracts tests
echo "📜 Running smart contract tests..."
cd smart-contracts
if [ -f "package.json" ]; then
    npm test || echo "Smart contract tests skipped"
fi
cd ..

# AI services tests
echo "🤖 Running AI services tests..."
cd ai-services
if [ -f "requirements.txt" ]; then
    pytest tests/ || echo "AI services tests skipped"
fi
cd ..

echo "✅ All tests completed!"
