const ctx = document.getElementById('myChart').getContext('2d');
let myChart;

// Initialize data variables
let currentDataPoints = ['Creative Director', 'Senior 3D', 'Senior 2D', '3D Designer', '2D Designer'];

// Initialize chart data
let chartData = new Array(currentDataPoints.length).fill(0); // Initialize budget values to 0

// Update the chart when the slider value changes or design phase changes
function updateChart() {
    const timeInDays = parseFloat(document.getElementById('timeSlider').value);
    const designPhase = document.getElementById('designPhase').value;

    // Update displayed days value
    document.getElementById('budgetValue').textContent = `${timeInDays} Days`;

    let totalDays = timeInDays;
    let distribution;

    // Set distribution based on selected design phase
    if (designPhase === 'concept') {
        distribution = [0.60, 0.20, 0.20, 0, 0]; // Concept distribution
    } else if (designPhase === 'design') {
        distribution = [0.10, 0.30, 0.30, 0.10, 0.20]; // Design distribution
    } else { // Default
        distribution = [0, 0, 0, 0, 0]; // Even distribution
    }

    // Calculate budget values
    chartData = distribution.map((percentage) => (percentage * totalDays).toFixed(2));
    
    // Update the chart with the new data
    createChart(chartData);
}

function updateSliderBackground() {
    const rangeInput = document.getElementById('timeSlider');
    const max = rangeInput.max;
    const min = rangeInput.min;
    const value = rangeInput.value;
    const percentage = ((value - min) / (max - min)) * 100; // Calculate percentage

    // Update background gradient
    rangeInput.style.background = `linear-gradient(to right, #287155 ${percentage}%, #505050 ${percentage}%)`;
}

// Create the chart using the provided data
function createChart(data) {
    // Destroy existing chart instance if present
    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: currentDataPoints,
            datasets: [{
                label: 'Days Allocated',
                data: data,
                backgroundColor: [
                    '#B4E2A5', // Color for Creative Director
                    '#009159', // Color for Senior 3D
                    '#004733', // Color for Senior 2D
                    '#92D400', // Color for 3D Designer
                    '#E9F7DB'  // Color for 2D Designer
                ],
            }],
        },
        options: {
            indexAxis: 'y', // This makes the chart horizontal
            scales: {
                x: {
                    beginAtZero: true,
                    max: 30, // Fixed maximum value on the x-axis
                    title: {
                        display: true,
                        text: 'Days' // X-axis title
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Roles' // Y-axis title
                    },
                },
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false, // Hide legend as it's not needed
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            const value = tooltipItem.parsed.x;
                            return `${value} Days`;
                        }
                    }
                }
            }
        }
    });
}

// Initialize the chart on page load
updateChart();
updateSliderBackground(); // Initialize the slider background
