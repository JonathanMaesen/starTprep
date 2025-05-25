import { ClickAndHold } from '/scripts/utility/clickAndHold.js';

document.querySelectorAll('.grid-item[data-id]').forEach(tile => {
  const id = tile.dataset.id;

  new ClickAndHold(tile, async () => {
    try {
      const res = await fetch(`/foh/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(res.statusText);
      // remove tile from grid without reloading
      tile.remove();
    } catch (err) {
      console.error('[Click-&-Hold] delete failed', err);
      alert('Kon tafel niet verwijderen');
    }
  });
});
