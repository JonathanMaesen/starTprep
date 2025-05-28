import ClickAndHold from "./utility/clickAndHold.js"

const HIGHLIGHT_ID = 'active-chair';

document.querySelectorAll('#stoolContainer .stool-btn')
  .forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.getElementById(HIGHLIGHT_ID);
      if (current) {
        current.id = current.dataset.origId;
        delete current.dataset.origId;
      }

      btn.dataset.origId = btn.id;
      btn.id = HIGHLIGHT_ID;
    });
  });

document.querySelectorAll('.dish-form')
  .forEach(form => {
    form.addEventListener('submit', e => {
      const active = document.getElementById(HIGHLIGHT_ID);
      if (!active) {
        e.preventDefault();
        alert('Kies eerst een stoel!');
        return;
      }

      const chairNr = active.dataset.origId.replace('chair-', '');

      form.action = `${form.action}/${chairNr}`;
    });
  });

const modal = document.getElementById('dishModal');
const titleEl = document.getElementById('dishTitle');
const catsEl = document.getElementById('dishCats');
const protEl = document.getElementById('dishProt');
document.getElementById('closeDishModal')
  .addEventListener('click', () => modal.classList.add('hidden'));

document.querySelectorAll('.dish-btn').forEach(btn => {
  const parentForm = btn.closest('form');

  new ClickAndHold(btn, () => {
    const dish = JSON.parse(btn.dataset.dish);

    titleEl.textContent = dish.name;
    catsEl.textContent = (dish.category || dish.categoryMaster || dish.category).join(', ');
    protEl.textContent = (dish.proteinType || []).join(', ');

    modal.classList.remove('hidden');

    parentForm.addEventListener('submit', blockOnce, { once: true });
  });
});

function blockOnce(e) { e.preventDefault(); }
