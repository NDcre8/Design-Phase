const ctx = document.getElementById('myChart').getContext('2d');
let myChart;

let currentDataPoints = ['Creative Director', 'Senior 3D', 'Senior 2D', '3D Designer', '2D Designer'];
let chartData = new Array(currentDataPoints.length).fill(0);

function updateChart() {
    const timeInDays = parseFloat(document.getElementById('timeSlider').value);
    const designPhase = document.getElementById('designPhase').value;

    document.getElementById('budgetValue').textContent = `${timeInDays} Days`;
    let distribution;

    if (designPhase === 'concept') {
        distribution = [0.60, 0.20, 0.20, 0, 0];
    } else if (designPhase === 'design') {
        distribution = [0.10, 0.30, 0.30, 0.10, 0.20];
    } else {
        distribution = [0, 0, 0, 0, 0];
    }

    chartData = distribution.map((percentage) => (percentage * timeInDays).toFixed(1)); // Changed to 1 decimal place
    createChart(chartData);
    updateBreakdown(chartData);
}

function createChart(data) {
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
                backgroundColor: ['#B4E2A5', '#009159', '#3EC687', '#92D400', '#E9F7DB'],
            }],
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    title: { display: true, text: 'Days' },
                },
                y: {
                    title: { display: true, text: 'Roles' },
                },
            },
            responsive: true,
            plugins: {
                legend: { display: false },
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

function updateBreakdown(data) {
    const breakdownContainer = document.getElementById('breakdownValues');
    breakdownContainer.innerHTML = ''; // Clear previous content

    const colors = ['#B4E2A5', '#009159', '#3EC687', '#92D400', '#E9F7DB']; // Colors used in the chart

    data.forEach((days, index) => {
        const breakdownItem = document.createElement('div');
        breakdownItem.className = 'breakdown-item';
        
        // Use the corresponding color for each role and format days to 1 decimal place
        breakdownItem.innerHTML = `
            <div>${currentDataPoints[index]}</div>
            <div class="breakdown-value" style="color: ${colors[index]}">${parseFloat(days).toFixed(1)} Days</div>
        `;
        breakdownContainer.appendChild(breakdownItem);
    });
}

function updateSliderBackground() {
    const rangeInput = document.getElementById('timeSlider');
    const max = rangeInput.max;
    const min = rangeInput.min;
    const value = rangeInput.value;
    const percentage = ((value - min) / (max - min)) * 100;

    rangeInput.style.background = `linear-gradient(to right, #287155 ${percentage}%, #505050 ${percentage}%)`;
}

function handleDropdownChange() {
    const designPhase = document.getElementById('designPhase').value;
    const sliderContainer = document.querySelector('.slider-container');

    if (designPhase) {
        sliderContainer.classList.remove('hidden'); // Show slider if an option is selected
    } else {
        sliderContainer.classList.add('hidden'); // Hide slider if no option is selected
    }
}

// Initialize the chart on page load
updateChart();
updateSliderBackground();
