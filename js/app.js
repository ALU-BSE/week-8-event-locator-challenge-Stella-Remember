// Sample event data
const eventsData = [
    {
        id: 1,
        name: "Rock Concert",
        date: "2025-03-25",
        time: "19:00",
        location: "City Arena",
        description: "Join us for an electrifying rock concert featuring the hottest bands in town. Experience amazing light shows and unforgettable performances that will leave you wanting more.",
        category: "Music",
        price: "$45"
    },
    {
        id: 2,
        name: "Football Match",
        date: "2025-03-28",
        time: "15:30",
        location: "Stadium 7",
        description: "A thrilling football match between top teams. Watch as rival teams battle it out on the field in this season's most anticipated game.",
        category: "Sports",
        price: "$25-$75"
    },
    {
        id: 3,
        name: "Art Gallery Opening",
        date: "2025-04-02",
        time: "18:00",
        location: "Art Museum",
        description: "A grand opening for a new art exhibition featuring works from both established and emerging artists. Wine and refreshments will be served.",
        category: "Arts",
        price: "Free"
    },
    {
        id: 4,
        name: "Jazz Festival",
        date: "2025-04-15",
        time: "16:00",
        location: "Central Park",
        description: "An afternoon of smooth jazz and good vibes. Bring a blanket and enjoy performances from local and international jazz musicians.",
        category: "Music",
        price: "$15"
    },
    {
        id: 5,
        name: "Basketball Tournament",
        date: "2025-04-10",
        time: "14:00",
        location: "Sports Center",
        description: "Watch the regional basketball tournament finals with the best teams competing for the championship title.",
        category: "Sports",
        price: "$20"
    },
    {
        id: 6,
        name: "Theater Play: Romeo and Juliet",
        date: "2025-04-05",
        time: "19:30",
        location: "City Theater",
        description: "A modern adaptation of Shakespeare's classic love story, featuring talented actors and innovative stage design.",
        category: "Arts",
        price: "$35"
    }
];

// Execute when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Check which page we're on
    const currentPage = window.location.pathname.split("/").pop();
    
    if (currentPage === "events.html" || currentPage === "") {
        // For events page
        setupEventsPage();
    } else if (currentPage === "event-details.html") {
        // For event details page
        loadEventDetails();
    } else if (currentPage === "index.html" || currentPage === "") {
        // For home page - any specific functionality here
        setupIndexPage();
    }
});

// Set up the events page
function setupEventsPage() {
    // Get URL parameters if any
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get("query");
    const categoryParam = urlParams.get("category");
    const dateParam = urlParams.get("date");
    
    // Fill in the filter fields if parameters exist
    if (queryParam) document.getElementById("searchBar").value = queryParam;
    if (categoryParam) document.getElementById("categoryFilter").value = categoryParam;
    if (dateParam) document.getElementById("dateFilter").value = dateParam;
    
    // Apply initial filtering
    filterEvents();
    
    // Set up event listeners
    document.getElementById("searchBtn").addEventListener("click", filterEvents);
    document.getElementById("categoryFilter").addEventListener("change", filterEvents);
    document.getElementById("dateFilter").addEventListener("change", filterEvents);
    document.getElementById("searchBar").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            filterEvents();
        }
    });
}

// Set up functionality for the index page
function setupIndexPage() {
    // Ensure the search form works
    const searchForm = document.getElementById("searchForm");
    if (searchForm) {
        searchForm.addEventListener("submit", function(e) {
            // The form will naturally redirect to events.html with query parameters
        });
    }
}

// Filter events based on search criteria
function filterEvents() {
    const searchQuery = document.getElementById("searchBar").value.toLowerCase();
    const searchCategory = document.getElementById("categoryFilter").value;
    const searchDate = document.getElementById("dateFilter").value;

    const filteredEvents = eventsData.filter(event => {
        const matchesSearchQuery = searchQuery === "" || 
            event.name.toLowerCase().includes(searchQuery) || 
            event.description.toLowerCase().includes(searchQuery);
        const matchesCategory = searchCategory === "" || event.category === searchCategory;
        const matchesDate = searchDate === "" || event.date === searchDate;

        return matchesSearchQuery && matchesCategory && matchesDate;
    });

    displayEvents(filteredEvents);
}

// Display events in the event list
function displayEvents(events) {
    const eventListContainer = document.getElementById("event-list");
    if (!eventListContainer) return;
    
    eventListContainer.innerHTML = ""; 

    if (events.length === 0) {
        eventListContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <p class="lead">No events found. Try adjusting your filters.</p>
            </div>`;
        return;
    }

    events.forEach(event => {
        const eventCard = `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100 shadow-sm hover-shadow">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <h5 class="card-title">${event.name}</h5>
                            <span class="badge bg-primary">${event.category}</span>
                        </div>
                        <div class="mb-3">
                            <small class="text-muted">
                                <i class="fas fa-calendar-alt me-1"></i> ${event.date}
                            </small>
                            <br>
                            <small class="text-muted">
                                <i class="fas fa-map-marker-alt me-1"></i> ${event.location}
                            </small>
                        </div>
                        <p class="card-text">${event.description.substring(0, 100)}${event.description.length > 100 ? '...' : ''}</p>
                    </div>
                    <div class="card-footer bg-white border-0">
                        <a href="event-details.html?id=${event.id}" class="btn btn-primary btn-sm w-100">View Details</a>
                    </div>
                </div>
            </div>
        `;
        eventListContainer.innerHTML += eventCard;
    });
}

// Load event details on the event details page
function loadEventDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get("id"));
    
    if (!eventId) {
        document.getElementById("event-title").textContent = "Event Not Found";
        document.getElementById("event-description").textContent = "Sorry, the event you're looking for could not be found.";
        return;
    }
    
    const event = eventsData.find(e => e.id === eventId);
    
    if (event) {
        document.title = `${event.name} - Event Locator`;
        document.getElementById("event-title").textContent = event.name;
        document.getElementById("event-location").textContent = event.location;
        document.getElementById("event-date").textContent = `${event.date} at ${event.time}`;
        document.getElementById("event-description").textContent = event.description;
        document.getElementById("event-category").textContent = event.category;
        document.getElementById("event-price").textContent = event.price;
    } else {
        document.getElementById("event-title").textContent = "Event Not Found";
        document.getElementById("event-description").textContent = "Sorry, the event you're looking for could not be found.";
    }
}