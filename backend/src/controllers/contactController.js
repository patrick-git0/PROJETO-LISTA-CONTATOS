import { getAllContacts, addContact, updateContact, deleteContact } 
  from "../data/contacts.js";

export function getContacts(req, res) {
  const { q } = req.query;
  let result = getAllContacts();

  if (q) {
    result = result.filter(c => 
      c.name.toLowerCase().includes(q.toLowerCase())
    );
  }

  res.json(result);
}

export function createContact(req, res) {
  const contact = addContact(req.body);
  res.status(201).json(contact);
}

export function editContact(req, res) {
  const { id } = req.params;
  const updated = updateContact(id, req.body);
  if (!updated) return res.status(404).send();
  res.json(updated);
}

export function removeContact(req, res) {
  const { id } = req.params;
  deleteContact(id);
  res.status(204).send();
}