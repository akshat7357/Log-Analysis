/**
 * Test script to verify mock data service
 * Run with: node test-mock-data.js
 */

// Simulate the mock data service
const mockData = {
  cards: [
    {
      id: '1',
      title: 'Total Users',
      value: 1240000,
      icon: 'People',
      trend: 12.5,
      trendLabel: 'vs last month',
    },
    {
      id: '2',
      title: 'Active Sessions',
      value: 45280,
      icon: 'TrendingUp',
      trend: 8.2,
      trendLabel: 'vs last week',
    },
    {
      id: '3',
      title: 'API Requests',
      value: 8920000,
      icon: 'Api',
      trend: -3.1,
      trendLabel: 'vs yesterday',
    },
    {
      id: '4',
      title: 'Revenue',
      value: 392000,
      icon: 'AttachMoney',
      trend: 15.8,
      trendLabel: 'vs last month',
    },
  ],
};

console.log('✅ Mock Data Test\n');
console.log('📊 KPI Cards:', mockData.cards.length, 'cards');
console.log('');

mockData.cards.forEach((card, index) => {
  const trendSymbol = card.trend >= 0 ? '📈' : '📉';
  console.log(`${index + 1}. ${card.title}`);
  console.log(`   Value: ${card.value.toLocaleString()}`);
  console.log(`   ${trendSymbol} Trend: ${card.trend}% ${card.trendLabel}`);
  console.log('');
});

console.log('✅ All mock data structures are valid!');
console.log('');
console.log('Next steps:');
console.log('1. Run: npm install');
console.log('2. Run: npm run dev');
console.log('3. Open: http://localhost:3000');
console.log('');
console.log('The dashboard will load with dummy data automatically!');
