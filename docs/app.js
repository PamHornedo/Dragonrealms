import { addLocalStorage } from "./storage.js";
import { Dragon } from "./models/Dragon.js";
const form = document.getElementById('char-form');
const list = document.getElementById('dragons');
const button = document.querySelector('.actions');
export function createCard(c) {
    const el = document.createElement('div');
    el.className = 'dragon';
    el.innerHTML = `
	<h3>${escapeHtml(c.name)}</h3>
	<p><strong>Type:</strong> ${escapeHtml(c.type)}</p>
	<p><strong>Age:</strong> ${c.age ?? '—'}</p>
    <p><strong>Element:</strong> ${escapeHtml(c.element)}</p>
    <p><strong>Special Ability:</strong> ${escapeHtml(c.ability)}</p>
  `;
    return el;
}
function escapeHtml(s) {
    return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}
if (form && list) {
    button.addEventListener('click', (ev) => {
        ev.preventDefault();
        const data = new FormData(form);
        const name = (data.get('name') || '').toString().trim();
        const type = (data.get('type') || '').toString().trim();
        const ageRaw = data.get('age');
        const age = ageRaw ? Number(ageRaw) : undefined;
        const element = (data.get('element') || '').toString().trim();
        const ability = (data.get('ability') || '').toString().trim();
        if (!name || !type || !age || !element || !ability) {
            alert('Please fill all form fields.');
            return;
        }
        const character = new Dragon(name, type, age, element, ability);
        const card = createCard(character);
        list.prepend(card);
        addLocalStorage(character);
        form.reset();
    });
}
