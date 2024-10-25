document.addEventListener("DOMContentLoaded", () => {

    const timeButtons = document.querySelectorAll('.time-button');
    const activityCards = document.querySelectorAll('.activity-card');

    //fetch data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            updateDashboard(data, 'weekly')

            timeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const timeframe = button.textContent.toLowerCase();
                    updateDashboard(data, timeframe)
                })
            })
        })
        .catch(error => console.error('Error loading data:', error));
    function updateDashboard(data, timeframe) {
        activityCards.forEach((card, index) => {
            const title = data[index].title;
            const timeData = data[index].timeframes[timeframe];
            card.querySelector('.activity-info h4').textContent = title;
            card.querySelector('.hours h1').textContent = `${timeData.current}hrs`;
            card.querySelector('.hours p').textContent = `Last ${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} - ${timeData.previous}hrs`;

        })
    }
})