const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const contactsPath = path.join(__dirname, "db", "contacts.json");

const readContent = async () => {
  const contentJson = await fs.readFile(contactsPath, "utf8");
  const result = JSON.parse(contentJson);
  return result;
};

const listContacts = async () => {
  const result = await readContent();
  return result;
};
const getContactById = async (contactId) => {
  const contacts = await readContent();
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await readContent();
  const id = contacts.findIndex(
    (contact) => contactId === contact.id.toString()
  );
  if (id === -1) {
    return;
  }

  const update = contacts.splice(id, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return update;
};
const addContact = async (name, email, phone) => {
  const contacts = await readContent();
  const addContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };
  contacts.push(addContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return addContact;
};
module.exports = { listContacts, getContactById, removeContact, addContact };
