// TripWise - Interactive Budget Breakdown Chart & Financial Engine

let budgetChartInstance = null;

const DEFAULT_SLIDERS = {
  transport: 35,
  hotel: 25,
  food: 15,
  activities: 15,
  emergency: 10
};

let currentTotalBudget = 25000;
let categoryPercentages = { ...DEFAULT_SLIDERS };

function initBudgetChart() {
  const chartCanvas = document.getElementById('budgetChartCanvas');
  if (!chartCanvas) return;

  const ctx = chartCanvas.getContext('2d');
  
  if (budgetChartInstance) {
    budgetChartInstance.destroy();
  }

  budgetChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Transport', 'Hotel Stay', 'Food & Dining', 'Activities & Sightseeing', 'Emergency Buffer'],
      datasets: [{
        data: [
          categoryPercentages.transport,
          categoryPercentages.hotel,
          categoryPercentages.food,
          categoryPercentages.activities,
          categoryPercentages.emergency
        ],
        backgroundColor: [
          '#2563eb', // Blue
          '#0d9488', // Teal
          '#f97316', // Orange
          '#7c3aed', // Purple
          '#64748b'  // Slate
        ],
        borderWidth: 3,
        borderColor: '#ffffff',
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw || 0;
              const rupees = Math.round((currentTotalBudget * value) / 100);
              return ` ${label}: ${value}% (₹${rupees.toLocaleString('en-IN')})`;
            }
          }
        }
      },
      cutout: '72%'
    }
  });

  updateBudgetTotalsDisplay();
}

function updateBudgetCategory(category, newPercent) {
  categoryPercentages[category] = parseInt(newPercent, 10);
  
  // Normalize or update chart
  if (budgetChartInstance) {
    budgetChartInstance.data.datasets[0].data = [
      categoryPercentages.transport,
      categoryPercentages.hotel,
      categoryPercentages.food,
      categoryPercentages.activities,
      categoryPercentages.emergency
    ];
    budgetChartInstance.update();
  }

  updateBudgetTotalsDisplay();
}

function setTotalBudgetAmount(amount) {
  currentTotalBudget = Math.max(1000, parseInt(amount, 10) || 0);
  updateBudgetTotalsDisplay();
  if (budgetChartInstance) budgetChartInstance.update();
}

function updateBudgetTotalsDisplay() {
  const totalPercent = Object.values(categoryPercentages).reduce((a, b) => a + b, 0);
  
  const transportAmt = Math.round((currentTotalBudget * categoryPercentages.transport) / 100);
  const hotelAmt = Math.round((currentTotalBudget * categoryPercentages.hotel) / 100);
  const foodAmt = Math.round((currentTotalBudget * categoryPercentages.food) / 100);
  const activitiesAmt = Math.round((currentTotalBudget * categoryPercentages.activities) / 100);
  const emergencyAmt = Math.round((currentTotalBudget * categoryPercentages.emergency) / 100);

  const totalSpent = transportAmt + hotelAmt + foodAmt + activitiesAmt;
  const remaining = currentTotalBudget - totalSpent;

  // Ensure remaining includes emergency allocation
  const remainingWithEmergency = remaining - emergencyAmt;

  // Update DOM elements if present
  const totalBudgetEl = document.getElementById('displayTotalBudget');
  const totalSpentEl = document.getElementById('displayTotalSpent');
  const remainingBudgetEl = document.getElementById('displayRemainingBudget');

  if (totalBudgetEl) totalBudgetEl.innerText = `₹${currentTotalBudget.toLocaleString('en-IN')}`;
  if (totalSpentEl) totalSpentEl.innerText = `₹${totalSpent.toLocaleString('en-IN')}`;
  if (remainingBudgetEl) {
    const displayRemaining = remainingWithEmergency;
    remainingBudgetEl.innerText = `₹${displayRemaining.toLocaleString('en-IN')}`;
    remainingBudgetEl.className = displayRemaining >= 0 
      ? 'text-xl font-bold text-teal-600' 
      : 'text-xl font-bold text-rose-600';
  }

  // Category specific amount labels
  const categories = ['transport', 'hotel', 'food', 'activities', 'emergency'];
  categories.forEach(cat => {
    const valEl = document.getElementById(`val-${cat}`);
    const amt = Math.round((currentTotalBudget * categoryPercentages[cat]) / 100);
    
    if (valEl) valEl.innerText = `₹${amt.toLocaleString('en-IN')}`;
  });
}
