import { ClickAndHold } from '/scripts/utility/clickAndHold.js';

document.querySelectorAll('.grid-item[data-id]').forEach(tile => {
  const id = tile.dataset.id;

  new ClickAndHold(tile, async function () {
    try {
      const response = await fetch(`/foh/${id}/delete`, {
        method: 'POST'
    });
      if (!response.ok) throw new Error(`Failed to delete: ${response.statusText}`);
      location.reload();
    } catch (err) {
      console.error('Error deleting tile:', err);
    }
  });
});
