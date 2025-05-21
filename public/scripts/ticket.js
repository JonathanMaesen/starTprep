document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".ticket-card");
  const deleteBtn = document.getElementById("deleteButton");
  let selectedCard = null;

  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      selectedCard = card;
    });
  });

  deleteBtn.addEventListener("click", async () => {
    if (!selectedCard) {
      alert("Select a ticket first.");
      return;
    }

    const ticketId = selectedCard.dataset.ticketId;
    const confirmed = confirm(`Delete ticket '${ticketId}'?`);
    if (!confirmed) return;

    const res = await fetch("/ticket/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `ticketId=${encodeURIComponent(ticketId)}`
    });

    if (res.ok) {
      selectedCard.remove();
      selectedCard = null;
    } else {
      const msg = await res.text();
      alert("❌ Failed: " + msg);
    }
  });
});
