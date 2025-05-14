console.log("📋 Ticket page loaded.");

// Example: hook into each ticket (if you want to expand later)
document.addEventListener("DOMContentLoaded", () => {
  const ticketElements = document.querySelectorAll("p strong");

  if (ticketElements.length === 0) {
    console.warn("No tickets found on page.");
  } else {
    console.log(`Found ${ticketElements.length / 6} ticket(s) rendered.`);
  }
});
