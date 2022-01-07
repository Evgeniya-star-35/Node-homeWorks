const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "../db", "contacts.json");

const readContent = async () => {
  const contentJson = await fs.readFile(contactsPath, "utf8");
  const result = JSON.parse(contentJson);
  return result;
};
const listContacts = async () => {
  const result = await readContent();
  return result;
};

module.exports = listContacts;
