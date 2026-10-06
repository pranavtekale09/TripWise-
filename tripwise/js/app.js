// TripWise - Main Web Application Logic

let activeDestinationFilter = 'All';
let currentActiveTrip = null;
let savedTripsList = [];

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Theme
  initTheme();

  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Load saved trips from localStorage if available
  const stored = localStorage.getItem('tripwise_saved_trips');
  if (stored) {
    try { savedTripsList = JSON.parse(stored); } catch (e) {}
  }

  renderFlowDiagram();
  renderAIWorkflowDiagram();
  renderUserJourneyDiagram();
  renderSystemArchitectureDiagram();
  renderFeaturesGrid();
  renderDestinations(activeDestinationFilter);
  renderRouteDiagram('Pune', 'Mumbai', 'Goa', 'Gokarna');
  renderItineraryTimeline(SAMPLE_ITINERARIES.goa);
  renderWeatherWidget(SAMPLE_ITINERARIES.goa.weather, SAMPLE_ITINERARIES.goa.weatherForecast);

  initBudgetChart();
  setupEventListeners();

  // Set default dates in form (Today + 7 days)
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 5);

  const startDateInput = document.getElementById('startDate');
  const endDateInput = document.getElementById('endDate');
  
  if (startDateInput) startDateInput.value = today.toISOString().split('T')[0];
  if (endDateInput) endDateInput.value = nextWeek.toISOString().split('T')[0];
});

/* =======================================================
   0. THEME MANAGEMENT (DARK MODE / LIGHT MODE)
   ======================================================= */
function initTheme() {
  const savedTheme = localStorage.getItem('tripwise_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    updateThemeToggleIcons(true);
  } else {
    document.documentElement.classList.remove('dark');
    updateThemeToggleIcons(false);
  }
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('tripwise_theme', isDark ? 'dark' : 'light');
  updateThemeToggleIcons(isDark);
}

function updateThemeToggleIcons(isDark) {
  const btnIcon = document.getElementById('themeToggleIcon');
  const mobileIcon = document.getElementById('mobileThemeToggleIcon');
  const mobileText = document.getElementById('mobileThemeToggleText');

  if (btnIcon) btnIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
  if (mobileIcon) mobileIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
  if (mobileText) mobileText.innerText = isDark ? 'Light Mode' : 'Dark Mode';

  if (window.lucide) lucide.createIcons();
}

/* =======================================================
   1. FLOW DIAGRAM (Step 5 of prompt)
   ======================================================= */
function renderFlowDiagram() {
  const container = document.getElementById('flowDiagramContainer');
  if (!container) return;

  container.innerHTML = FLOW_STEPS.map((step, idx) => `
    <div class="relative flex-1 min-w-[140px] flex flex-col items-center text-center group">
      <!-- Step Badge -->
      <div class="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 shadow-lg shadow-blue-500/10 transition-transform duration-300 group-hover:scale-110">
        <div class="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-slate-800">
          <i data-lucide="${step.icon}" class="w-7 h-7 text-blue-600 group-hover:scale-110 transition-transform"></i>
        </div>
        <span class="absolute -top-2 -right-2 w-6 h-6 bg-slate-900 text-white font-bold text-xs rounded-full flex items-center justify-center border-2 border-white">
          ${step.num}
        </span>
      </div>

      <!-- Title & Desc -->
      <h4 class="mt-3 font-bold text-slate-900 text-sm md:text-base">${step.title}</h4>
      <p class="mt-1 text-xs text-slate-500 px-1 leading-snug">${step.desc}</p>

      <!-- Connecting Arrow for Desktop -->
      ${idx < FLOW_STEPS.length - 1 ? `
        <div class="hidden lg:block absolute top-8 left-[calc(50%+32px)] w-[calc(100%-64px)] h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 z-0">
          <div class="absolute right-0 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-teal-500 transform rotate-45"></div>
        </div>
      ` : ''}
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

/* =======================================================
   2. AI WORKFLOW DIAGRAM (Step 7 of prompt)
   ======================================================= */
function renderAIWorkflowDiagram() {
  const container = document.getElementById('aiWorkflowContainer');
  if (!container) return;

  container.innerHTML = AI_WORKFLOW_STEPS.map((item, idx) => `
    <div class="flex items-center space-x-4 p-4 rounded-xl border border-slate-200/80 bg-white/70 hover:shadow-md transition-all">
      <div class="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center font-bold border ${item.bg}">
        <i data-lucide="${item.icon}" class="w-6 h-6"></i>
      </div>
      <div class="flex-grow">
        <div class="flex items-center justify-between">
          <h4 class="font-bold text-slate-900 text-sm md:text-base">${item.title}</h4>
          <span class="text-xs font-bold text-slate-400">Step ${item.step}</span>
        </div>
        <p class="text-xs text-slate-500 mt-0.5">${item.desc}</p>
      </div>
      ${idx < AI_WORKFLOW_STEPS.length - 1 ? `
        <div class="text-slate-300">
          <i data-lucide="chevron-right" class="w-5 h-5"></i>
        </div>
      ` : ''}
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

/* =======================================================
   3. USER JOURNEY DIAGRAM (Step 12 of prompt)
   ======================================================= */
function renderUserJourneyDiagram() {
  const container = document.getElementById('userJourneyContainer');
  if (!container) return;

  container.innerHTML = USER_JOURNEY_STEPS.map((step, idx) => `
    <div class="relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col items-start group">
      <div class="w-10 h-10 rounded-lg text-white flex items-center justify-center mb-3 shadow-md ${step.color}">
        <i data-lucide="${step.icon}" class="w-5 h-5"></i>
      </div>
      <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Stage 0${idx + 1}</span>
      <h4 class="font-bold text-slate-900 text-base mb-1">${step.stage}: ${step.title}</h4>
      <p class="text-xs text-slate-500 leading-relaxed">${step.desc}</p>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

/* =======================================================
   4. SYSTEM ARCHITECTURE DIAGRAM (Step 13 of prompt)
   ======================================================= */
function renderSystemArchitectureDiagram() {
  const container = document.getElementById('systemArchitectureContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
      <!-- Input Layer -->
      <div class="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <i data-lucide="user" class="w-5 h-5 text-white"></i>
          </div>
          <div>
            <h4 class="font-bold text-white text-base">User Layer</h4>
            <span class="text-xs text-blue-400">TripWise Web Client</span>
          </div>
        </div>
        <div class="space-y-2.5 text-xs text-slate-300">
          <div class="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/60 flex items-center justify-between">
            <span>Destination & Dates</span>
            <i data-lucide="calendar" class="w-4 h-4 text-blue-400"></i>
          </div>
          <div class="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/60 flex items-center justify-between">
            <span>Budget & Preferences</span>
            <i data-lucide="sliders" class="w-4 h-4 text-teal-400"></i>
          </div>
          <div class="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/60 flex items-center justify-between">
            <span>Interests & Style</span>
            <i data-lucide="heart" class="w-4 h-4 text-purple-400"></i>
          </div>
        </div>
      </div>

      <!-- Core AI Planner Engine -->
      <div class="relative bg-gradient-to-b from-blue-900 to-indigo-950 text-white p-6 rounded-2xl border-2 border-blue-500/50 shadow-2xl shadow-blue-500/20">
        <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow">
          Core Engine
        </div>
        <div class="text-center my-3">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-blue-500 to-teal-400 p-0.5 shadow-lg mb-2">
            <div class="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <i data-lucide="cpu" class="w-7 h-7 text-teal-400 animate-pulse"></i>
            </div>
          </div>
          <h4 class="font-extrabold text-white text-lg">AI Trip Planner Engine</h4>
          <p class="text-xs text-blue-300 mt-1">Multi-Constraint Optimization</p>
        </div>

        <div class="grid grid-cols-2 gap-2 mt-4 text-[11px] font-medium text-slate-200">
          <div class="p-2 bg-blue-950/80 rounded-lg border border-blue-800/50 text-center">Maps & Routes API</div>
          <div class="p-2 bg-blue-950/80 rounded-lg border border-blue-800/50 text-center">Hotel Stays Data</div>
          <div class="p-2 bg-blue-950/80 rounded-lg border border-blue-800/50 text-center">Live Weather API</div>
          <div class="p-2 bg-blue-950/80 rounded-lg border border-blue-800/50 text-center">Activity Matcher</div>
          <div class="p-2 bg-blue-950/80 rounded-lg border border-blue-800/50 text-center">Destination Engine</div>
          <div class="p-2 bg-blue-950/80 rounded-lg border border-blue-800/50 text-center">Budget Engine</div>
        </div>
      </div>

      <!-- Output Layer -->
      <div class="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-10 h-10 rounded-lg bg-teal-600 flex items-center justify-center">
            <i data-lucide="file-text" class="w-5 h-5 text-white"></i>
          </div>
          <div>
            <h4 class="font-bold text-white text-base">Output Output</h4>
            <span class="text-xs text-teal-400">Smart Dashboard</span>
          </div>
        </div>
        <div class="space-y-2.5 text-xs text-slate-300">
          <div class="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/60 flex items-center justify-between">
            <span>Day-by-Day Timeline</span>
            <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i>
          </div>
          <div class="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/60 flex items-center justify-between">
            <span>Budget Pie Breakdown</span>
            <i data-lucide="pie-chart" class="w-4 h-4 text-teal-400"></i>
          </div>
          <div class="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/60 flex items-center justify-between">
            <span>Route Map & Weather</span>
            <i data-lucide="map" class="w-4 h-4 text-blue-400"></i>
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

/* =======================================================
   5. FEATURES GRID (Step 14 of prompt)
   ======================================================= */
function renderFeaturesGrid() {
  const container = document.getElementById('featuresGridContainer');
  if (!container) return;

  container.innerHTML = FEATURES_DATA.map(item => `
    <div class="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
      <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <i data-lucide="${item.icon}" class="w-6 h-6"></i>
      </div>
      <h4 class="font-bold text-slate-900 text-lg mb-2">${item.title}</h4>
      <p class="text-slate-600 text-xs md:text-sm leading-relaxed">${item.desc}</p>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

/* =======================================================
   6. DESTINATIONS CARDS & FILTERS (Step 8 of prompt)
   ======================================================= */
const INR_FORMATTER = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

function formatFareEstimate(estimate, travelerCount = 1) {
  const multiplier = estimate.perVehicle ? 1 : travelerCount;
  const minFare = INR_FORMATTER.format(estimate.minFare * multiplier);
  const maxFare = INR_FORMATTER.format(estimate.maxFare * multiplier);
  return `${minFare}–${maxFare}`;
}

function getTravelEstimate(destination, requestedMode = 'Flight') {
  const estimates = destination.travelEstimates || {};
  const mode = estimates[requestedMode] ? requestedMode : Object.keys(estimates)[0];
  return { mode, ...estimates[mode] };
}

function getSelectedTransportMode() {
  return document.querySelector('input[name="transportMode"]:checked')?.value || 'Flight';
}

function renderDestinations(filterCategory = 'All') {
  const container = document.getElementById('destinationsGridContainer');
  if (!container) return;

  const filtered = filterCategory === 'All'
    ? DESTINATIONS
    : DESTINATIONS.filter(d => d.category.includes(filterCategory));

  container.innerHTML = filtered.map(item => {
    const travel = getTravelEstimate(item, getSelectedTransportMode());
    return `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      <!-- Image Header -->
      <div class="relative h-48 overflow-hidden">
        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
        <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 font-bold text-xs px-2.5 py-1 rounded-full border border-white/40 shadow">
          ${item.tag}
        </span>
        <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <div>
            <h3 class="font-extrabold text-xl leading-tight">${item.name}</h3>
            <span class="text-xs text-slate-200 flex items-center gap-1">
              <i data-lucide="map-pin" class="w-3 h-3 text-teal-400"></i> ${item.country}
            </span>
          </div>
          <div class="bg-amber-500/90 backdrop-blur-md px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1 text-slate-950">
            <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i> ${item.rating}
          </div>
        </div>
      </div>

      <!-- Card Body -->
      <div class="p-5 flex-grow flex flex-col justify-between space-y-4">
        <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">${item.description}</p>

        <div class="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100">
          <div>
            <span class="text-slate-400 block text-[10px] uppercase font-bold">Est. Budget</span>
            <span class="font-bold text-slate-900">${item.budget}</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[10px] uppercase font-bold">Duration</span>
            <span class="font-bold text-teal-600">${item.duration}</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[10px] uppercase font-bold">Best Season</span>
            <span class="font-medium text-slate-700">${item.bestTime}</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[10px] uppercase font-bold">Daily Spend</span>
            <span class="font-medium text-slate-700">${item.dailySpend}</span>
          </div>
        </div>

        <div class="rounded-xl bg-teal-50/70 border border-teal-100 px-3 py-2.5">
          <span class="text-teal-700 block text-[10px] uppercase font-bold">${travel.mode} from Pune · return estimate</span>
          <span class="font-bold text-slate-900">${formatFareEstimate(travel)}${travel.perVehicle ? ' / vehicle' : ' / person'}</span>
          <span class="text-slate-500 text-[11px]">${travel.duration} one way · indicative, not live</span>
        </div>

        <button onclick="openDestinationModal('${item.id}')" class="w-full py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center gap-1.5">
          <span>View Details & Plan</span>
          <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

function openDestinationModal(destId) {
  const dest = DESTINATIONS.find(d => d.id === destId);
  if (!dest) return;

  const modalContainer = document.getElementById('destinationModalContainer');
  if (!modalContainer) return;
  const selectedMode = getSelectedTransportMode();

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm modal-backdrop">
      <div class="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl modal-content max-h-[90vh] flex flex-col">
        <!-- Header Image -->
        <div class="relative h-56 flex-shrink-0">
          <img src="${dest.image}" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
          <button onclick="closeDestinationModal()" class="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full text-slate-800 hover:bg-white transition-colors">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
          <div class="absolute bottom-4 left-6 text-white">
            <span class="bg-teal-500 text-slate-950 font-bold text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2 inline-block">
              ${dest.tag}
            </span>
            <h2 class="text-3xl font-extrabold">${dest.name}, ${dest.country}</h2>
            <div class="flex items-center gap-4 text-xs text-slate-200 mt-1">
              <span>⭐ ${dest.rating} (${dest.reviews} reviews)</span>
              <span>🗓️ Best: ${dest.bestTime}</span>
              <span>💰 ${dest.budget}</span>
            </div>
          </div>
        </div>

        <!-- Body Scrollable -->
        <div class="p-6 space-y-5 overflow-y-auto flex-grow text-xs md:text-sm text-slate-700">
          <p class="text-slate-600 leading-relaxed text-sm">${dest.description}</p>

          <div class="travel-estimate-panel p-4 bg-teal-50/70 rounded-2xl border border-teal-100">
            <h4 class="travel-estimate-heading font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <i data-lucide="navigation" class="travel-estimate-icon w-4 h-4 text-teal-600"></i> Travel estimates from Pune
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
              ${Object.entries(dest.travelEstimates).map(([mode, estimate]) => `
                <div class="travel-estimate-card p-3 rounded-xl border ${mode === selectedMode ? 'is-selected border-teal-400 bg-white' : 'border-slate-200 bg-white/70'}">
                  <span class="travel-estimate-mode font-bold text-slate-800">${mode}</span>
                  <span class="travel-estimate-fare block text-sm font-bold text-teal-700">${formatFareEstimate(estimate)}${estimate.perVehicle ? ' / vehicle' : ' / person'}</span>
                  <span class="travel-estimate-meta text-[11px] text-slate-500">${estimate.duration} one way · ${estimate.distanceKm.toLocaleString('en-IN')} km</span>
                </div>
              `).join('')}
            </div>
            <p class="travel-estimate-note text-[11px] text-slate-500 mt-2">Typical return fares; travel time and distance are one way. Prices vary by date and availability and are not live quotes.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-blue-50/70 rounded-2xl border border-blue-100">
              <h4 class="font-bold text-blue-900 mb-2 flex items-center gap-1.5 text-sm">
                <i data-lucide="sparkles" class="w-4 h-4 text-blue-600"></i> Top Attractions
              </h4>
              <ul class="space-y-1.5">
                ${dest.highlights.map(h => `<li class="flex items-center gap-2">✓ <span>${h}</span></li>`).join('')}
              </ul>
            </div>

            <div class="p-4 bg-orange-50/70 rounded-2xl border border-orange-100">
              <h4 class="font-bold text-orange-900 mb-2 flex items-center gap-1.5 text-sm">
                <i data-lucide="utensils" class="w-4 h-4 text-orange-600"></i> Local Food Delicacies
              </h4>
              <ul class="space-y-1.5">
                ${dest.food.map(f => `<li class="flex items-center gap-2">🍴 <span>${f}</span></li>`).join('')}
              </ul>
            </div>
          </div>

          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 class="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <i data-lucide="hotel" class="w-4 h-4 text-teal-600"></i> Recommended Hotel Area
            </h4>
            <p class="text-slate-600 text-xs">${dest.hotelArea}</p>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div>
            <span class="text-xs text-slate-400 block">Est. Package Cost</span>
            <span class="font-extrabold text-slate-900 text-lg">${dest.budget}</span>
          </div>
          <div class="flex gap-3">
            <button onclick="closeDestinationModal()" class="px-4 py-2 rounded-xl text-slate-600 text-xs font-bold hover:bg-slate-200">Close</button>
            <button onclick="quickPlanDestination('${dest.name}')" class="px-5 py-2.5 rounded-xl glow-btn-primary text-white text-xs font-bold flex items-center gap-1.5">
              <span>Plan This Trip Now</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  modalContainer.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeDestinationModal() {
  const modalContainer = document.getElementById('destinationModalContainer');
  if (modalContainer) modalContainer.classList.add('hidden');
}

function quickPlanDestination(destName) {
  closeDestinationModal();
  const input = document.getElementById('destInput');
  if (input) input.value = destName;
  
  const formSection = document.getElementById('planner-form');
  if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
}

/* =======================================================
   7. TRAVEL ROUTE DIAGRAM (Step 9 of prompt)
   ======================================================= */
function renderRouteDiagram(start = 'Pune', stop1 = 'Mumbai', stop2 = 'Goa', dest = 'Gokarna') {
  const container = document.getElementById('routeDiagramContainer');
  if (!container) return;

  const points = [
    { city: start, label: "Starting Point", icon: "navigation", color: "bg-blue-600" },
    { city: stop1, label: "Stop 1 (Coastal)", icon: "car", color: "bg-teal-500" },
    { city: stop2, label: "Stop 2 (Resort)", icon: "plane", color: "bg-purple-500" },
    { city: dest, label: "Final Destination", icon: "flag", color: "bg-rose-500" }
  ];

  container.innerHTML = `
    <div class="relative bg-slate-900 text-white p-6 md:p-8 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      <!-- Background Map Styling Grid -->
      <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div class="relative z-10">
        <div class="flex items-center justify-between mb-8">
          <div>
            <span class="text-teal-400 font-bold text-xs uppercase tracking-wider">Visual Route Planner</span>
            <h3 class="text-xl md:text-2xl font-extrabold text-white">Sample Travel Route Map</h3>
          </div>
          <span class="bg-slate-800 border border-slate-700 text-slate-300 text-xs px-3 py-1 rounded-full font-medium">
            4 Stop Route Sequence
          </span>
        </div>

        <!-- Route Nodes -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          ${points.map((p, idx) => `
            <div class="relative z-10 flex flex-col items-center text-center p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 backdrop-blur-md">
              <div class="w-12 h-12 rounded-2xl ${p.color} text-white flex items-center justify-center shadow-lg mb-3">
                <i data-lucide="${p.icon}" class="w-6 h-6"></i>
              </div>
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">${p.label}</span>
              <h4 class="font-extrabold text-lg text-white">${p.city}</h4>

              ${idx < points.length - 1 ? `
                <div class="hidden md:block absolute top-1/2 -right-6 -translate-y-1/2 z-20 text-teal-400">
                  <i data-lucide="arrow-right" class="w-6 h-6"></i>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

/* =======================================================
   8. DAY-BY-DAY ITINERARY TIMELINE (Step 10 of prompt)
   ======================================================= */
function renderItineraryTimeline(tripData) {
  const container = document.getElementById('itineraryTimelineContainer');
  if (!container) return;

  const data = tripData || SAMPLE_ITINERARIES.goa;

  container.innerHTML = `
    <div class="space-y-8">
      <div class="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">AI Generated Schedule</span>
          <h3 class="text-2xl font-extrabold text-slate-900">${data.destination} – Day by Day Itinerary</h3>
        </div>
        <span class="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-blue-200">
          ${data.duration}
        </span>
      </div>

      <div class="relative timeline-line space-y-8 pl-12">
        ${data.days.map(dayObj => `
          <div class="relative bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <!-- Day Marker -->
            <div class="absolute -left-[45px] top-6 w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 text-white font-extrabold text-sm flex items-center justify-center shadow-lg border-2 border-white">
              D${dayObj.day}
            </div>

            <div class="mb-4 flex items-center justify-between">
              <h4 class="text-lg font-extrabold text-slate-900">Day ${dayObj.day} – ${dayObj.title}</h4>
              <span class="text-xs font-medium text-slate-400">${dayObj.activities.length} Scheduled Activities</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${dayObj.activities.map(act => `
                <div class="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/60 flex items-start gap-3">
                  <div class="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i data-lucide="${act.icon || 'circle'}" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-[10px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md">${act.time}</span>
                      <span class="text-[10px] font-bold text-teal-600 uppercase">${act.category}</span>
                    </div>
                    <h5 class="font-bold text-slate-900 text-sm">${act.title}</h5>
                    <p class="text-xs text-slate-500 mt-0.5 leading-snug">${act.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

/* =======================================================
   9. WEATHER SECTION (Step 16 of prompt)
   ======================================================= */
function renderWeatherWidget(weather, forecast) {
  const container = document.getElementById('weatherWidgetContainer');
  if (!container) return;

  const w = weather || { temp: "29°C", condition: "Sunny", humidity: "65%", wind: "12 km/h" };
  const fc = forecast || [];

  container.innerHTML = `
    <div class="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-3xl shadow-xl border border-blue-400/30">
      <div class="flex items-center justify-between mb-6">
        <div>
          <span class="text-xs uppercase font-bold tracking-wider text-blue-200">Destination Weather</span>
          <h3 class="text-xl font-extrabold">Forecast Insight</h3>
        </div>
        <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
          <i data-lucide="cloud-sun" class="w-6 h-6 text-amber-300"></i>
        </div>
      </div>

      <!-- Current Temp Block -->
      <div class="flex items-center justify-between py-4 border-y border-white/10 mb-6">
        <div>
          <span class="text-4xl font-extrabold">${w.temp}</span>
          <p class="text-xs text-blue-100 mt-1 font-medium">${w.condition}</p>
        </div>
        <div class="text-right text-xs space-y-1 text-blue-100">
          <div>💧 Humidity: <span class="font-bold text-white">${w.humidity}</span></div>
          <div>💨 Wind: <span class="font-bold text-white">${w.wind}</span></div>
        </div>
      </div>

      <!-- Forecast Pills -->
      <div class="grid grid-cols-4 gap-2 text-center text-xs">
        ${fc.map(f => `
          <div class="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
            <span class="block text-[10px] text-blue-200 mb-1 font-bold">${f.day}</span>
            <i data-lucide="${f.icon || 'sun'}" class="w-5 h-5 mx-auto text-amber-300 mb-1"></i>
            <span class="font-bold text-white block">${f.temp}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

/* =======================================================
   10. TRIP PLANNER FORM & AI GENERATOR (Step 6 of prompt)
   ======================================================= */
function setupEventListeners() {
  setupDestinationAutocomplete();

  // Theme Toggle Buttons
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');
  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Navigation Mobile Menu Drawer
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });
  }

  // Trip Form Submit
  const plannerForm = document.getElementById('tripPlannerForm');
  if (plannerForm) {
    plannerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleGenerateTrip();
    });
  }

  document.querySelectorAll('input[name="transportMode"]').forEach(input => {
    input.addEventListener('change', () => renderDestinations(activeDestinationFilter));
  });

  // Category filter buttons
  const filterContainer = document.getElementById('destinationFilters');
  if (filterContainer) {
    filterContainer.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const cat = e.target.getAttribute('data-category');
        if (cat) {
          activeDestinationFilter = cat;
          Array.from(filterContainer.children).forEach(btn => {
            btn.className = btn.getAttribute('data-category') === cat
              ? 'px-4 py-2 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md'
              : 'px-4 py-2 rounded-full text-xs font-bold bg-white text-slate-700 hover:bg-slate-100 border border-slate-200';
          });
          renderDestinations(cat);
        }
      }
    });
  }

  // Budget slider inputs
  const sliderInputs = ['transport', 'hotel', 'food', 'activities', 'emergency'];
  sliderInputs.forEach(cat => {
    const input = document.getElementById(`slider-${cat}`);
    if (input) {
      input.addEventListener('input', (e) => {
        updateBudgetCategory(cat, e.target.value);
      });
    }
  });

  const totalInput = document.getElementById('inputTotalBudget');
  if (totalInput) {
    totalInput.addEventListener('input', (e) => {
      setTotalBudgetAmount(e.target.value);
    });
  }
}

function setupDestinationAutocomplete() {
  const input = document.getElementById('destInput');
  if (!input || !input.parentElement) return;

  const list = document.createElement('div');
  list.id = 'destinationSuggestions';
  list.className = 'hidden absolute left-0 right-0 top-full z-30 mt-1 max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-xl';
  list.setAttribute('role', 'listbox');
  input.parentElement.classList.add('relative');
  input.insertAdjacentElement('afterend', list);
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-controls', list.id);
  input.setAttribute('aria-expanded', 'false');

  let debounceTimer;
  let requestController;
  let places = [];
  let activeIndex = -1;

  const closeList = () => {
    list.classList.add('hidden');
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    activeIndex = -1;
  };

  const showMessage = (message) => {
    list.innerHTML = '';
    const item = document.createElement('div');
    item.className = 'px-3 py-2 text-xs text-slate-500';
    item.setAttribute('role', 'option');
    item.setAttribute('aria-disabled', 'true');
    item.textContent = message;
    list.appendChild(item);
    list.classList.remove('hidden');
    input.setAttribute('aria-expanded', 'true');
  };

  const renderPlaces = () => {
    list.innerHTML = '';
    if (!places.length) {
      showMessage('No matching places. You can still use any destination.');
      return;
    }

    places.forEach((place, index) => {
      const button = document.createElement('button');
      const label = [place.name, place.admin1, place.country]
        .filter((value, partIndex, parts) => value && parts.indexOf(value) === partIndex)
        .join(', ');
      button.type = 'button';
      button.id = `destination-option-${index}`;
      button.className = 'w-full rounded-lg px-3 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none';
      button.setAttribute('role', 'option');
      button.setAttribute('aria-selected', index === activeIndex ? 'true' : 'false');
      button.innerHTML = '<span class="block text-sm font-semibold text-slate-800"></span><span class="block text-xs text-slate-500"></span>';
      button.children[0].textContent = place.name;
      button.children[1].textContent = [place.admin1, place.country]
        .filter((value, partIndex, parts) => value && parts.indexOf(value) === partIndex)
        .join(', ');
      button.addEventListener('mousedown', (event) => event.preventDefault());
      button.addEventListener('click', () => {
        input.value = label;
        closeList();
      });
      list.appendChild(button);
    });

    list.classList.remove('hidden');
    input.setAttribute('aria-expanded', 'true');
  };

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    requestController?.abort();
    const query = input.value.trim();
    places = [];
    activeIndex = -1;

    if (query.length < 2) {
      closeList();
      return;
    }

    showMessage('Searching places worldwide...');
    debounceTimer = setTimeout(async () => {
      requestController = new AbortController();
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`;

      try {
        const response = await fetch(url, { signal: requestController.signal });
        if (!response.ok) throw new Error('Location search failed');
        const data = await response.json();
        const results = data.results || [];
        places = results.filter(place => place.feature_code?.startsWith('PPL'));
        if (!places.length) places = results;
        renderPlaces();
      } catch (error) {
        if (error.name !== 'AbortError') {
          showMessage('Suggestions unavailable. You can still use any destination.');
        }
      }
    }, 300);
  });

  input.addEventListener('keydown', (event) => {
    if (list.classList.contains('hidden') || !places.length) {
      if (event.key === 'Escape') closeList();
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      activeIndex = activeIndex < 0
        ? (direction === 1 ? 0 : places.length - 1)
        : (activeIndex + direction + places.length) % places.length;
      renderPlaces();
      input.setAttribute('aria-activedescendant', `destination-option-${activeIndex}`);
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      list.children[activeIndex]?.click();
    } else if (event.key === 'Escape') {
      closeList();
    }
  });

  input.addEventListener('blur', () => setTimeout(closeList, 120));
}

function handleGenerateTrip() {
  const dest = document.getElementById('destInput')?.value || 'Goa';
  const startLoc = document.getElementById('startLocInput')?.value || 'Pune';
  const startDate = document.getElementById('startDate')?.value;
  const endDate = document.getElementById('endDate')?.value;
  const adults = document.getElementById('adultsCount')?.value || 2;
  const children = document.getElementById('childrenCount')?.value || 0;
  const budgetTier = document.getElementById('budgetTierSelect')?.value || 'Medium';
  const travelStyle = document.getElementById('travelStyleSelect')?.value || 'Adventure';
  // Get selected transport radio (fix: there is no element with id "transportSelect")
  const transportRadio = document.querySelector('input[name="transportMode"]:checked');
  const transportMode = transportRadio ? transportRadio.value : 'Flight';

  // Open Loading Modal
  const modal = document.getElementById('aiLoadingModal');
  if (modal) modal.classList.remove('hidden');

  const steps = [
    "Analyzing user preferences & dates...",
    "Matching top rated destinations...",
    "Checking live weather forecast...",
    "Filtering optimal flights & hotel stays...",
    "Curating daily activities & dining spots...",
    "Generating day-by-day optimized itinerary..."
  ];

  let currentStep = 0;
  const stepTextEl = document.getElementById('aiLoadingStepText');
  const progressBarEl = document.getElementById('aiLoadingProgressBar');

  const interval = setInterval(() => {
    currentStep++;
    if (stepTextEl) stepTextEl.innerText = steps[currentStep] || "Finalizing trip plan...";
    if (progressBarEl) progressBarEl.style.width = `${Math.min(100, Math.round((currentStep / steps.length) * 100))}%`;

    if (currentStep >= steps.length) {
      clearInterval(interval);
      setTimeout(() => {
        if (modal) modal.classList.add('hidden');
        displayGeneratedTripDashboard({
          destination: dest,
          startLocation: startLoc,
          startDate: startDate,
          endDate: endDate,
          travelers: `${adults} Adults, ${children} Children`,
          adultCount: Number(adults),
          childCount: Number(children),
          budgetTier: budgetTier,
          travelStyle: travelStyle,
          transportMode: transportMode
        });
      }, 500);
    }
  }, 450);
}

/* =======================================================
   11. INTERACTIVE TRIP DASHBOARD (Step 15 of prompt)
   ======================================================= */
function displayGeneratedTripDashboard(userInputs) {
  const dashboardSection = document.getElementById('trip-dashboard-section');
  if (!dashboardSection) return;

  // Check if matching destination data exists
  const destMatch = DESTINATIONS.find(d => d.name.toLowerCase() === userInputs.destination.toLowerCase()) || DESTINATIONS[0];
  const itinerary = SAMPLE_ITINERARIES[destMatch.id] || SAMPLE_ITINERARIES.goa;
  const travel = getTravelEstimate(destMatch, userInputs.transportMode);
  const travelerCount = Math.max(1, Number(userInputs.adultCount || 0) + Number(userInputs.childCount || 0));
  const totalBudget = destMatch.budgetValue * travelerCount;
  const budgetBreakdown = [
    { label: 'Transport', percent: 35 },
    { label: 'Hotel stays', percent: 25 },
    { label: 'Food & dining', percent: 15 },
    { label: 'Activities', percent: 15 },
    { label: 'Emergency buffer', percent: 10 }
  ];
  const hotelNights = Number(destMatch.duration.match(/(\d+)\s*Nights/i)?.[1] || 0);
  const activityCount = itinerary.days.reduce((sum, day) => sum + day.activities.length, 0);

  currentActiveTrip = {
    inputs: userInputs,
    dest: destMatch,
    itinerary: itinerary
  };

  // Render Dashboard Contents
  const container = document.getElementById('tripDashboardContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-2xl space-y-8">
      <!-- Header Banner -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-teal-950 text-white rounded-2xl">
        <div>
          <span class="bg-teal-500/20 text-teal-300 font-bold text-xs px-3 py-1 rounded-full border border-teal-400/30 uppercase tracking-wider">
            🎉 AI Trip Plan Ready
          </span>
          <h2 class="text-2xl md:text-3xl font-extrabold mt-2">${userInputs.destination} Expedition</h2>
          <p class="text-xs md:text-sm text-slate-300 mt-1">
            ${userInputs.startLocation} ➔ ${userInputs.destination} • ${userInputs.travelers} • ${userInputs.travelStyle} Style
          </p>
        </div>

        <div class="flex flex-wrap gap-2.5 no-print">
          <button onclick="saveTripToStorage()" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors">
            <i data-lucide="bookmark" class="w-4 h-4 text-teal-400"></i> Save Trip
          </button>
          <button onclick="downloadItineraryPDF()" class="px-4 py-2 rounded-xl glow-btn-primary text-white text-xs font-bold flex items-center gap-1.5">
            <i data-lucide="download" class="w-4 h-4"></i> Download Itinerary
          </button>
          <button onclick="shareTripLink()" class="px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold flex items-center gap-1.5 transition-colors">
            <i data-lucide="share-2" class="w-4 h-4"></i> Share Trip
          </button>
        </div>
      </div>

      <!-- Quick Metrics Bar -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="p-4 rounded-2xl bg-blue-50/80 border border-blue-100">
          <span class="text-slate-500 text-[10px] font-bold uppercase tracking-wider block">Est. Distance</span>
          <span class="text-xl font-extrabold text-blue-900">${travel.distanceKm.toLocaleString('en-IN')} km</span>
          <span class="text-[11px] text-blue-600 block mt-0.5">Pune route reference · ${travel.mode}</span>
        </div>
        <div class="p-4 rounded-2xl bg-teal-50/80 border border-teal-100">
          <span class="text-slate-500 text-[10px] font-bold uppercase tracking-wider block">Travel Time</span>
          <span class="text-xl font-extrabold text-teal-900">${travel.duration}</span>
          <span class="text-[11px] text-teal-600 block mt-0.5">One way · ${travel.mode}</span>
        </div>
        <div class="p-4 rounded-2xl bg-purple-50/80 border border-purple-100">
          <span class="text-slate-500 text-[10px] font-bold uppercase tracking-wider block">Return Travel Estimate</span>
          <span class="text-xl font-extrabold text-purple-900">${formatFareEstimate(travel, travelerCount)}</span>
          <span class="text-[11px] text-purple-600 block mt-0.5">${travel.perVehicle ? 'Per vehicle' : `For ${travelerCount} traveler${travelerCount === 1 ? '' : 's'}`} · indicative</span>
        </div>
        <div class="p-4 rounded-2xl bg-amber-50/80 border border-amber-100">
          <span class="text-slate-500 text-[10px] font-bold uppercase tracking-wider block">Hotel Nights</span>
          <span class="text-xl font-extrabold text-amber-900">${hotelNights} Nights</span>
          <span class="text-[11px] text-amber-600 block mt-0.5">${activityCount} listed activities</span>
        </div>
      </div>

      <!-- Detailed Schedule & Weather -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <h3 class="text-lg font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="calendar" class="w-5 h-5 text-blue-600"></i> Day-by-Day Customized Schedule
          </h3>

          <div class="space-y-4">
            ${itinerary.days.map(day => `
              <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-extrabold text-slate-900">Day ${day.day}: ${day.title}</h4>
                  <span class="text-xs bg-white text-slate-700 px-2.5 py-1 rounded-lg border font-medium">4 Activities</span>
                </div>
                <div class="space-y-2">
                  ${day.activities.map(act => `
                    <div class="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-100 text-xs">
                      <div class="flex items-center gap-2.5">
                        <span class="font-bold text-blue-600 text-[10px] bg-blue-50 px-2 py-0.5 rounded">${act.time}</span>
                        <span class="font-bold text-slate-800">${act.title}</span>
                      </div>
                      <span class="text-slate-400 text-[10px] uppercase font-bold">${act.category}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right Side Widgets -->
        <div class="space-y-6">
          <!-- Weather Widget -->
          <div class="p-5 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 text-white">
            <h4 class="font-bold mb-3 flex items-center gap-2 text-sm">
              <i data-lucide="sun" class="w-4 h-4 text-amber-400"></i> Weather Forecast
            </h4>
            <div class="flex items-center justify-between mb-4">
              <span class="text-3xl font-extrabold">${itinerary.weather.temp}</span>
              <span class="text-xs text-blue-200">${itinerary.weather.condition}</span>
            </div>
            <div class="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <div class="p-2 bg-white/10 rounded-lg">Humidity: ${itinerary.weather.humidity}</div>
              <div class="p-2 bg-white/10 rounded-lg">Wind: ${itinerary.weather.wind}</div>
            </div>
          </div>

          <!-- Budget Summary Widget -->
          <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 class="font-bold text-slate-900 mb-3 text-sm flex items-center gap-2">
              <i data-lucide="wallet" class="w-4 h-4 text-teal-600"></i> Estimated Budget Split
            </h4>
            <div class="space-y-2 text-xs">
              ${budgetBreakdown.map(item => `
                <div class="flex justify-between"><span>${item.label} (${item.percent}%)</span><span class="font-bold text-slate-900">${INR_FORMATTER.format(Math.round(totalBudget * item.percent / 100))}</span></div>
              `).join('')}
              <div class="flex justify-between border-t pt-2 font-bold text-slate-900"><span>Estimated Trip Budget</span><span class="text-teal-600 text-sm">${INR_FORMATTER.format(totalBudget)}</span></div>
              <p class="text-[10px] text-slate-500">Destination estimate × ${travelerCount} traveler${travelerCount === 1 ? '' : 's'}; fares are indicative.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  dashboardSection.classList.remove('hidden');
  dashboardSection.scrollIntoView({ behavior: 'smooth' });
  if (window.lucide) lucide.createIcons();
}

function saveTripToStorage() {
  if (!currentActiveTrip) return;
  savedTripsList.push(currentActiveTrip);
  localStorage.setItem('tripwise_saved_trips', JSON.stringify(savedTripsList));
  alert('✨ Trip saved successfully to your TripWise dashboard!');
}

function downloadItineraryPDF() {
  window.print();
}

function shareTripLink() {
  navigator.clipboard.writeText(window.location.href);
  alert('🔗 Trip share link copied to clipboard!');
}
