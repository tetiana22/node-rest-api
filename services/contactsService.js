import crypto from "crypto";
import path from "path";
import fs from "fs/promises";

const contactsPath = path.resolve("db", "contacts.json");
async function listContacts() {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  if (!contactById) {
    return null;
  }
  return contactById;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }

  const newContacts = contacts.filter(({ id }) => id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(newContacts));

  return index;
}
async function addContact(contact) {
  const contacts = await listContacts();
  const newContact = {
    id: crypto.randomUUID(),
    ...contact,
  };
  const newContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return newContacts;
}

async function updateContacts(id, contact_data) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((element) => element.id === id);
    if (!contact) {
      return null;
    }

    const updated_contact = { ...contact, ...contact_data };
    const filtered_contacts = contacts.filter((contact) => contact.id !== id);

    await fs.writeFile(
      contactsPath,
      JSON.stringify([...filtered_contacts, updated_contact])
    );
    return updated_contact;
  } catch (error) {
    console.error(error.message);
  }
}

export {
  listContacts,
  updateContacts,
  addContact,
  removeContact,
  getContactById,
};
