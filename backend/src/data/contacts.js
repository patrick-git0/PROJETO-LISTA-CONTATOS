let contacts = [
  { id: 1, name: "Maria Silva", phone: "99999-1111", email: "maria@email.com" },
  { id: 2, name: "João Souza", phone: "98888-2222", email: "joao@email.com" }
];

export function getAllContacts() {
  return contacts;
}

export function addContact(contact) {
  const newContact = { id: Date.now(), ...contact };
  contacts.push(newContact);
  return newContact;
}

export function updateContact(id, data) {
  const index = contacts.findIndex(c => c.id == id);
  if (index === -1) return null;
  contacts[index] = { ...contacts[index], ...data };
  return contacts[index];
}

export function deleteContact(id) {
  contacts = contacts.filter(c => c.id != id);
}