const API_URL = 'http://localhost:3000/contacts';
const contactForm = document.getElementById('contactForm');
const contactsDiv = document.getElementById('contacts');
const formError = document.getElementById('formError');

function fetchContacts() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            contactsDiv.innerHTML = '';
            if (data.length === 0) {
                contactsDiv.innerHTML = '<p>No hay contactos.</p>';
                return;
            }
            data.forEach(contact => {
                const div = document.createElement('div');
                div.className = 'contact';
                div.innerHTML = `
          <span><strong>${contact.name}</strong> | ${contact.phone} | ${contact.email}</span>
          <button class="delete" onclick="deleteContact(${contact.id})">Eliminar</button>
        `;
                contactsDiv.appendChild(div);
            });
        });
}

contactForm.onsubmit = function (e) {
    e.preventDefault();
    formError.textContent = '';
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email })
    })
        .then(res => res.json().then(data => ({ status: res.status, body: data })))
        .then(result => {
            if (result.status !== 201) {
                formError.textContent = result.body.error || 'Error al agregar contacto';
            } else {
                contactForm.reset();
                fetchContacts();
            }
        });
};

window.deleteContact = function (id) {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(res => {
            if (res.status === 204) fetchContacts();
        });
};

fetchContacts();

// Buscar contacto por ID
const getByIdForm = document.getElementById('getByIdForm');
const searchResult = document.getElementById('searchResult');
getByIdForm.onsubmit = function (e) {
    e.preventDefault();
    const id = document.getElementById('searchId').value;
    fetch(`${API_URL}/${id}`)
        .then(res => res.json().then(data => ({ status: res.status, body: data })))
        .then(result => {
            if (result.status !== 200) {
                searchResult.textContent = result.body.error || 'No encontrado';
            } else {
                searchResult.textContent = `ID: ${result.body.id}, Nombre: ${result.body.name}, Teléfono: ${result.body.phone}, Email: ${result.body.email}`;
            }
        });
};

// Actualizar contacto (PUT)
const updateForm = document.getElementById('updateForm');
const updateError = document.getElementById('updateError');
const updateSuccess = document.getElementById('updateSuccess');
updateForm.onsubmit = function (e) {
    e.preventDefault();
    updateError.textContent = '';
    updateSuccess.textContent = '';
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const phone = document.getElementById('updatePhone').value;
    const email = document.getElementById('updateEmail').value;
    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email })
    })
        .then(res => res.json().then(data => ({ status: res.status, body: data })))
        .then(result => {
            if (result.status !== 200) {
                updateError.textContent = result.body.error || 'Error al actualizar';
            } else {
                updateSuccess.textContent = 'Contacto actualizado correctamente';
                updateForm.reset();
                fetchContacts();
            }
        });
};
