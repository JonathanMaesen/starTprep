/* menu.js – highlight and selection kept separate ------------------ */

/* 1. highlight logic (visual only) --------------------------------- */
const HIGHLIGHT_ID = 'active-chair';

document.querySelectorAll('#stoolContainer .stool-btn')
        .forEach(btn => {
  btn.addEventListener('click', () => {
    /* remove previous highlight */
    const current = document.getElementById(HIGHLIGHT_ID);
    if (current) {
      current.id = current.dataset.origId;      // restore its real id
      delete current.dataset.origId;
    }

    /* apply highlight to the clicked button */
    btn.dataset.origId = btn.id;                // remember real id
    btn.id = HIGHLIGHT_ID;                      // colour changes via CSS
  });
});

/* 2. form logic (chair selection) ---------------------------------- */
document.querySelectorAll('.dish-form')
        .forEach(form => {
  form.addEventListener('submit', e => {
    /* find the currently highlighted chair, if any */
    const active = document.getElementById(HIGHLIGHT_ID);
    if (!active) {
      e.preventDefault();
      alert('Kies eerst een stoel!');
      return;
    }

    /* active.dataset.origId == "chair-7" → grab the ‘7’ */
    const chairNr = active.dataset.origId.replace('chair-', '');

    /* tack the chair onto the URL to satisfy route .../:dish/:chair */
    form.action = `${form.action}/${chairNr}`;
  });
});
