const chalk = require("chalk");
const { Command } = require("commander");
const program = new Command();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

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

invokeAction(argv).then(() =>
  console.log(chalk.green.bgYellow.bold("Operation success"))
);
