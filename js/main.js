// ============================================
// ASCII BACKGROUND — load only if container exists
// ============================================

const asciiContainer = document.getElementById('ascii-container-pr');

if (asciiContainer) {
  // Animation variables
  let cols = 0;
  let rows = 0;
  let mouseX = -1000;
  let mouseY = -1000;
  let frame = 0;

  const CHARS = [' ', '.', '·', ':', '!', '°', '*', '+', 'x', '#', '@', '%'];

  function updateDimensions() {
    const charWidth = 7.2;
    const charHeight = 16;
    cols = Math.floor(window.innerWidth / charWidth);
    rows = Math.floor(window.innerHeight / charHeight);
  }

  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function renderAscii() {
    frame += 0.02;
    let output = '';

    const gridMouseX = mouseX / 7.2;
    const gridMouseY = mouseY / 16;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const diffX = Math.abs(x - gridMouseX);
        const diffY = Math.abs(y - gridMouseY);
        const squareSize = 12;
        const maxDiff = Math.max(diffX, diffY);
        const interaction = Math.max(0, 1 - maxDiff / squareSize);

        const isGridPoint = (x % 6 === 0 && y % 3 === 0);

        let char = ' ';

        if (isGridPoint) {
          const twinkle = (Math.sin(x * 0.5 + y * 0.3 + frame) + 1) / 2;
          let charIndex = Math.floor(twinkle * 3) + 1;

          if (interaction > 0.1) {
            charIndex = Math.min(CHARS.length - 1, charIndex + Math.floor(interaction * 6));
          }

          char = CHARS[charIndex];
        }

        output += char;
      }
      output += '\n';
    }

    asciiContainer.textContent = output;
    requestAnimationFrame(renderAscii);
  }

  window.addEventListener('resize', updateDimensions);
  window.addEventListener('mousemove', handleMouseMove);

  updateDimensions();
  renderAscii();
}

const asciiContainer1 = document.getElementById('ascii-container');

if (asciiContainer1) {
  // Animation variables
  let cols = 0;
  let rows = 0;
  let mouseX = -1000;
  let mouseY = -1000;
  let frame = 0;

  const CHARS = [' ', '.', '·', ':', '!', '°', '*', '+', 'x', '#', '@'];

  function updateDimensions() {
    const charWidth = 7.2;
    const charHeight = 16;
    cols = Math.floor(window.innerWidth / charWidth);
    rows = Math.floor(window.innerHeight / charHeight);
  }

  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function renderAscii() {
    frame += 0.02;
    let output = '';

    const gridMouseX = mouseX / 7.2;
    const gridMouseY = mouseY / 16;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const diffX = Math.abs(x - gridMouseX);
        const diffY = Math.abs(y - gridMouseY);
        const squareSize = 12;
        const maxDiff = Math.max(diffX, diffY);
        const interaction = Math.max(0, 1 - maxDiff / squareSize);

        const isGridPoint = (x % 6 === 0 && y % 3 === 0);

        let char = ' ';

        if (isGridPoint) {
          const twinkle = (Math.sin(x * 0.5 + y * 0.3 + frame) + 1) / 2;
          let charIndex = Math.floor(twinkle * 3) + 1;

          if (interaction > 0.1) {
            charIndex = Math.min(CHARS.length - 1, charIndex + Math.floor(interaction * 6));
          }

          char = CHARS[charIndex];
        }

        output += char;
      }
      output += '\n';
    }

    asciiContainer1.textContent = output;
    requestAnimationFrame(renderAscii);
  }

  window.addEventListener('resize', updateDimensions);
  window.addEventListener('mousemove', handleMouseMove);

  updateDimensions();
  renderAscii();
}

// ============================================
// ACTIVE NAV STATE ON SCROLL
// ============================================

// Highlights sidebar nav items based on current page
const currentPage = window.location.pathname;

document.querySelectorAll('.nav-item').forEach(link => {
  const linkPath = link.getAttribute('href');
  if (currentPage.endsWith(linkPath) ||
    (currentPage.endsWith('/') && linkPath === 'index.html')) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});


// ============================================
// SMOOTH SCROLL TO SECTIONS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// ============================================
// PROJECT CARD — navigate on click
// ============================================

// const projectCard = document.querySelector('.project-card');
// if (projectCard) {
//   projectCard.addEventListener('click', () => {
//     window.location.href = 'project-sound.html';
//   });
// }

const vrCard = document.getElementById('vr-card');
if (vrCard) {
  vrCard.addEventListener('click', () => {
    window.location.href = 'project-vr.html';
  });
}

const soundCard = document.getElementById('sound-card');
if (soundCard) {
  soundCard.addEventListener('click', () => {
    window.location.href = 'project-sound.html';
  });
}

// ============================================
// CASE STUDY SIDEBAR — SCROLL HIGHLIGHTING
// ============================================

function initCaseStudyNav() {

  // Get all section nav items in the project sidebar
  const navItems = document.querySelectorAll('.project-nav-item');

  // If no project nav exists we're not on the case study page
  if (!navItems.length) return;

  // Get all sections that correspond to nav items
  const sections = document.querySelectorAll('.case-section');

  // Options for the intersection observer
  // rootMargin pushes the trigger point to 30% from the top
  // so the nav updates before the section fully enters view
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  // Create the observer
  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        // Get the id of the section currently in view
        const activeId = entry.target.getAttribute('id');

        // Remove active class from all nav items
        navItems.forEach(item => item.classList.remove('active'));

        // Add active class to the matching nav item
        const activeNavItem = document.querySelector(
          `.project-nav-item[href="#${activeId}"]`
        );

        if (activeNavItem) {
          activeNavItem.classList.add('active');
        }
      }
    });

  }, observerOptions);

  // Observe each section
  sections.forEach(section => observer.observe(section));
}

// Run on page load
window.addEventListener('load', initCaseStudyNav);


// ============================================
// PROGRESS BAR — mobile only
// ============================================

function initProgressBar() {

  const progressBar = document.getElementById('progressBar');

  // If no progress bar exists, stop
  if (!progressBar) return;

  window.addEventListener('scroll', () => {

    // Total scrollable height of the page
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Calculate percentage scrolled
    const scrollPercent = (scrollTop / docHeight) * 100;

    // Update the progress bar width
    progressBar.style.width = scrollPercent + '%';
  });
}

window.addEventListener('load', initProgressBar);

// ============================================
// GEQ CHART — Chart.js
// ============================================

function initGEQChart() {

  // Find the canvas element
  // If it doesn't exist we're not on the case study page
  const canvas = document.getElementById('geqChart');
  if (!canvas) return;

  // Get the 2D drawing context from the canvas
  const ctx = canvas.getContext('2d');

  // Read your CSS accent colour from the root variables
  // This keeps the chart colour in sync with your design system
  const accentColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-accent').trim();

  // Define the six metric labels on the Y axis
  // These are the GEQ components from your thesis
  const labels = [
    'Immersion',
    'Flow',
    'Positive Affect',
    'Negative Affect',
    'Challenge',
    'Competence'
  ];

  // Define the three datasets — one per sound condition
  // Each dataset is one group of bars per metric
  const datasets = [

    {
      // Condition A — Full Soundscape
      // Uses your accent green — this is your hero condition
      label: 'Full Soundscape (A)',
      data: [3.43, 3.46, 3.25, 1.89, 2.39, 3.75],
      backgroundColor: accentColor,
      borderColor: accentColor,
      borderWidth: 0,
      borderRadius: 2,
    },

    {
      // Condition B — Non-Diegetic Only
      // Uses low opacity white — secondary condition
      label: 'Non-Diegetic Only (B)',
      data: [3.07, 3.29, 3.07, 2.36, 2.61, 3.54],
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      borderColor: 'rgba(255, 255, 255, 0.25)',
      borderWidth: 0,
      borderRadius: 2,
    },

    {
      // Condition C — Diegetic Only
      // Uses medium opacity white — third condition
      label: 'Diegetic Only (C)',
      data: [3.39, 3.18, 2.86, 1.96, 2.18, 3.50],
      backgroundColor: 'rgba(255, 255, 255, 0.55)',
      borderColor: 'rgba(255, 255, 255, 0.55)',
      borderWidth: 0,
      borderRadius: 2,
    }
  ];

  // Create the chart
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      categoryPercentage: 0.8,
      barPercentage: 0.85,

      plugins: {

        // Hide built-in legend
        legend: {
          display: false
        },

        // Disable tooltip entirely
        tooltip: {
          enabled: false
        },

        // Data labels outside bars
        // Using Chart.js built-in annotation approach
        // We'll handle this with a custom afterDraw plugin below
      },

      scales: {
        x: {
          min: 0,
          max: 5,
          grid: {
            color: 'rgba(255, 255, 255, 0.06)',
            drawBorder: false
          },
          ticks: {
            font: {
              family: 'Space Mono',
              size: 12,
            },
            color: 'rgba(255, 255, 255, 0.3)',
            stepSize: 1
          },
          border: {
            display: false
          }
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              family: 'Space Mono',
              size: 12,
              weight: '400'
            },
            color: 'rgba(255, 255, 255, 0.6)',
            padding: 16
          },
          border: {
            display: false
          }
        }
      }
    },

    // Custom plugin to draw value labels outside bars
    // Chart.js plugins run after the chart renders
    // 'afterDatasetsDraw' fires after all bars are drawn
    plugins: [{
      id: 'valueLabels',
      afterDatasetsDraw(chart) {

        // Get the drawing context
        const { ctx } = chart;

        // Loop through each dataset (each condition)
        chart.data.datasets.forEach((dataset, datasetIndex) => {

          // Get the rendered bars for this dataset
          const meta = chart.getDatasetMeta(datasetIndex);

          // Loop through each bar
          meta.data.forEach((bar, index) => {

            // Get the actual value for this bar
            const value = dataset.data[index];

            // Determine label colour based on value
            // Higher values get brighter text, lower values get dimmer
            const labelColor = value >= 3
              ? 'rgba(255, 255, 255, 0.85)'
              : 'rgba(255, 255, 255, 0.45)';

            // Set text styling
            ctx.fillStyle = labelColor;
            ctx.font = '11px Space Mono';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';

            // Position the label just outside the right edge of the bar
            // bar.x is the right edge of the bar
            // bar.y is the vertical centre of the bar
            const xPosition = bar.x + 6;
            const yPosition = bar.y;

            // Draw the value
            ctx.fillText(value.toFixed(2), xPosition, yPosition);
          });
        });
      }
    }]
  });
}

// Run on page load
window.addEventListener('load', initGEQChart);

document.querySelectorAll('a').forEach(link => {
  if (
    link.hostname === window.location.hostname &&
    !link.getAttribute('href').startsWith('#') &&
    !link.getAttribute('href').startsWith('mailto')
  ) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const destination = this.href;

      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        mainContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(-8px)';
      }

      setTimeout(() => {
        window.location.href = destination;
      }, 300);
    });
  }
});

// ============================================
// MOBILE HAMBURGER MENU
// ============================================

function initHamburger() {

  const hamburger = document.getElementById('hamburger');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  // If any element is missing stop
  if (!hamburger || !sidebar || !overlay) return;

  // Open sidebar
  function openSidebar() {
    sidebar.classList.add('open');
    hamburger.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  // Close sidebar
  function closeSidebar() {
    sidebar.classList.remove('open');
    hamburger.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  // Toggle on hamburger click
  hamburger.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  // Close on overlay click
  overlay.addEventListener('click', closeSidebar);

  // Close on nav link click — important for case study nav
  document.querySelectorAll('.nav-item, .project-nav-item, .contact-item').forEach(link => {
    link.addEventListener('click', closeSidebar);
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });
}

window.addEventListener('load', initHamburger);
