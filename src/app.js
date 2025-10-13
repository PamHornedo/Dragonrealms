var Dragon = /** @class */ (function () {
    function Dragon(name, type, age, element, ability) {
        this.name = name;
        this.type = type;
        this.age = age;
        this.element = element;
        this.ability = ability;
    }
    return Dragon;
}());
var form = document.getElementById('char-form');
var list = document.getElementById('dragons');
function createCard(c) {
    var _a;
    var el = document.createElement('div');
    el.className = 'dragon';
    el.innerHTML = "\n\t<h3>".concat(escapeHtml(c.name), "</h3>\n\t<p><strong>Type:</strong> ").concat(escapeHtml(c.type), "</p>\n\t<p><strong>Age:</strong> ").concat((_a = c.age) !== null && _a !== void 0 ? _a : '—', "</p>\n    <p><strong>Element:</strong> ").concat(escapeHtml(c.element), "</p>}\n    <p><strong>Special Ability:</strong> ").concat(escapeHtml(c.ability), "</p>}\n  ");
    return el;
}
function escapeHtml(s) {
    return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}
if (form && list) {
    form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var data = new FormData(form);
        var name = (data.get('name') || '').toString().trim();
        var type = (data.get('type') || '').toString().trim();
        var ageRaw = data.get('age');
        var age = ageRaw ? Number(ageRaw) : undefined;
        var element = (data.get('element') || '').toString().trim();
        var ability = (data.get('ability') || '').toString().trim();
        if (!name || !type || !age || !element || !ability) {
            alert('Please fill a form fields.');
            return;
        }
        // Instantiate a Character and render it
        var character = new Dragon(name, type, age, element, ability);
        var card = createCard(character);
        list.prepend(card);
        // Clear the form so the user can add another character quickly
        form.reset();
    });
}
