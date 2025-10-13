class Dragon {
	constructor(public name: string, public type: string, public age: number, public element: string, public ability: string) {}
}

const form = document.getElementById('char-form') as HTMLFormElement | null;
const list = document.getElementById('dragons') as HTMLDivElement | null;

function createCard(c: Dragon){
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

function escapeHtml(s: string){
  return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
}

if (form && list){
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const data = new FormData(form);
    
    const name = (data.get('name') || '').toString().trim();
    const type = (data.get('type') || '').toString().trim();
    const ageRaw = data.get('age');
    const age = ageRaw ? Number(ageRaw) : undefined;
    const element = (data.get('element') || '').toString().trim();
    const ability = (data.get('ability') || '').toString().trim();

    if (!name || !type || !age || !element || !ability){
      alert('Please fill a form fields.');
      return;
    }

    // Instantiate a Character and render it
    const character = new Dragon(name, type, age, element, ability);
    const card = createCard(character);
    list.prepend(card);
    // Clear the form so the user can add another character quickly
    form.reset();
  });
}
