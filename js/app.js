const eventsData = [
    {
        id: 1,
        name: "Rock Concert",
        date: "2025-03-25",
        location: "City Arena",
        description: "Join us for an electrifying rock concert!",
        category: "Music"
    },
    {
        id: 2,
        name: "Football Match",
        date: "2025-03-28",
        location: "Stadium 7",
        description: "A thrilling football match between top teams.",
        category: "Sports"
    },
    {
        id: 3,
        name: "Art Gallery Opening",
        date: "2025-04-02",
        location: "Art Museum",
        description: "A grand opening for a new art exhibition.",
        category: "Arts"
    }
];

function filterEvents() {
    const searchQuery = document.getElementById("searchBar").value.toLowerCase();
    const searchCategory = document.getElementById("categoryFilter").value;
    const searchDate = document.getElementById("dateFilter").value;

    const filteredEvents = eventsData.filter(event => {
        // Check if event matches the search query, category, and date
        const matchesSearchQuery = event.name.toLowerCase().includes(searchQuery) || event.description.toLowerCase().includes(searchQuery);
        const matchesCategory = searchCategory ? event.category === searchCategory : true;
        const matchesDate = searchDate ? event.date === searchDate : true;
        
        return matchesSearchQuery && matchesCategory && matchesDate;
    });

    // Display the filtered events
    displayEvents(filteredEvents);
}

// Display events dynamically in the event list
function displayEvents(events) {
    const eventListContainer = document.getElementById("event-list");
    eventListContainer.innerHTML = ""; // Clear previous events

    if (events.length === 0) {
        eventListContainer.innerHTML = `<p>No events found. Try adjusting your filters.</p>`;
        return;
    }

    events.forEach(event => {
        const eventCard = `
            <div class="col-md-4">
                <div class="card shadow-lg mb-4">
                    <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">${event.description}</p>
                        <a href="event-details.html?id=${event.id}" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            </div>
        `;
        eventListContainer.innerHTML += eventCard;
    });
}

// Event listener for the search button
document.getElementById("searchBtn").addEventListener("click", function() {
    filterEvents(); // Trigger the filter function when the button is clicked
});

// Event listeners for category and date filters
document.getElementById("categoryFilter").addEventListener("change", filterEvents);
document.getElementById("dateFilter").addEventListener("change", filterEvents);

// Initial display of all events on page load
window.onload = () => {
    displayEvents(eventsData);
};
