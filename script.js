// ---------- 1. DATA: hard-coded services ----------
const services = [
  { id: 1, name: "Tutoring", description: "Math and science help", category: "Academic", provider: "Alice", price: 500 },
  { id: 2, name: "Laundry", description: "Wash and fold service", category: "Daily Life", provider: "Bob", price: 300 },
  { id: 3, name: "Printing", description: "Affordable printing services", category: "Academic", provider: "Campus Print", price: 50 }
];

let bookings = [];

// ---------- 2. FIND THE PAGE ELEMENTS ----------
const serviceList = document.getElementById("service-list");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const bookingItems = document.getElementById("booking-items");
const bookingTotal = document.getElementById("booking-total");
const bookingCount = document.getElementById("booking-count");
const bookingForm = document.getElementById("booking-form");
const confirmation = document.getElementById("confirmation");

// ---------- 3. SHOW SERVICES ----------
function showServices() {
  const text = searchInput.value.toLowerCase();
  const chosenCategory = categorySelect.value;

  const filtered = services.filter(s =>
    (s.name.toLowerCase().includes(text) || s.description.toLowerCase().includes(text)) &&
    (chosenCategory === "all" || s.category === chosenCategory)
  );

  serviceList.innerHTML = filtered.length === 0
    ? "<p>No services found.</p>"
    : "";

  filtered.forEach(s => {
    const card = document.createElement("div");
    card.className = "service-card";
    card.innerHTML = `
      <h3>${s.name}</h3>
      <span class="category">${s.category}</span>
      <p>${s.description}</p>
      <p>Provider: ${s.provider}</p>
      <p class="price">KES ${s.price}</p>
      <button onclick="addBooking(${s.id})">Book</button>
    `;
    serviceList.appendChild(card);
  });
}

// ---------- 4. BOOKINGS ----------
function addBooking(id) {
  const service = services.find(s => s.id === id);
  if (bookings.some(b => b.id === id)) {
    alert(service.name + " is already in your bookings.");
    return;
  }
  bookings.push(service);
  showBookings();
}

function removeBooking(index) {
  bookings.splice(index, 1);
  showBookings();
}

function showBookings() {
  bookingItems.innerHTML = "";
  let total = 0;

  if (bookings.length === 0) {
    bookingItems.innerHTML = "<p>No bookings yet. Choose a service above.</p>";
  }

  bookings.forEach((b, index) => {
    total += b.price;
    const row = document.createElement("div");
    row.className = "booking-item";
    row.innerHTML = `
      <span>${b.name} - KES ${b.price}</span>
      <button class="remove-btn" onclick="removeBooking(${index})">Remove</button>
    `;
    bookingItems.appendChild(row);
  });

  bookingTotal.textContent = total;
  bookingCount.textContent = bookings.length;
}

// ---------- 5. CONFIRM BOOKING (simulated) ----------
bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (bookings.length === 0) {
    alert("Please book at least one service first.");
    return;
  }

  const payload = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    location: document.getElementById("location").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    payment: document.getElementById("payment").value,
    service_ids: bookings.map(b => b.id)
  };

  let list = "";
  let total = 0;
  bookings.forEach(b => {
    list += `<li>${b.name} (KES ${b.price})</li>`;
    total += b.price;
  });

  confirmation.innerHTML = `
    <h3>Booking confirmed!</h3>
    <p>Thank you, ${payload.name}. Your booking reference is <strong>DEMO123</strong>.</p>
    <ul>${list}</ul>
    <p>Date: ${payload.date} at ${payload.time}</p>
    <p>Total: KES ${total} (${payload.payment})</p>
  `;
  confirmation.style.display = "block";

  bookings = [];
  showBookings();
  bookingForm.reset();
});

// ---------- 6. START ----------
searchInput.addEventListener("input", showServices);
categorySelect.addEventListener("change", showServices);

showServices();
showBookings();
