const chalk = require("chalk");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./operations");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      if (contactById) {
        console.log(chalk.red.greenBright.bold("Contact found!"));
        console.table(contactById);
      } else {
        console.log(chalk.yellow.greenBright.bold("Contact not found!"));
      }
      break;

    case "add":
      const contact = await addContact(name, email, phone);
      console.log(chalk.blue.greenBright.bold("Add new contact!"));
      console.table(contact);
      break;

    case "remove":
      const deleteContact = await removeContact(id);
      if (deleteContact) {
        console.table(deleteContact);
      } else {
        console.log(chalk.yellow("Incorrect id. Try again, please!"));
      }
      break;

    default:
      console.warn(chalk.red("Unknown action type!"));
  }
};

module.exports = invokeAction;
