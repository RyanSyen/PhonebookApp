import { useState, useEffect } from "react";
import PhonebookList from "./PhonebookList";
import PhonebookForm from "./PhonebookForm";
import {
  addPhonebookEntry,
  deletePhonebookEntry,
  editPhonebookEntry,
  getPhonebookList,
} from "./PhonebookService";
import "./App.css";

type PhonebookEntry = {
  id: string;
  name: string;
  number: string;
};

const App: React.FC = () => {
  const [phonebook, setPhonebook] = useState<PhonebookEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<PhonebookEntry | null>(
    null
  );

  const refreshPhonebookEntries = async () => {
    try {
      const entries = await getPhonebookList();
      setPhonebook(entries);
    } catch (error) {
      console.error("Error fetching phonebook entries:", error);
    }
  };

  useEffect(() => {
    refreshPhonebookEntries();
  }, []);

  const handleAddEntry = async (name: string, number: string) => {
    try {
      await addPhonebookEntry({ name, number });
      refreshPhonebookEntries();
    } catch (error) {
      console.error("Error adding phonebook entry:", error);
    }
  };

  const handleEditEntry = async (id: string, name: string, number: string) => {
    try {
      await editPhonebookEntry({ id, name, number });
      refreshPhonebookEntries();
      setSelectedEntry(null);
    } catch (error) {
      console.error("Error editing phonebook entry:", error);
    }
  };

  const handleDeleteEntry = async (id: string) => {
    try {
      await deletePhonebookEntry(id);
      refreshPhonebookEntries();
    } catch (error) {
      console.error("Error deleting phonebook entry:", error);
    }
  };

  const handleEdit = (id: string) => {
    const entryToEdit = phonebook.find((entry) => entry.id === id);
    if (entryToEdit) {
      setSelectedEntry(entryToEdit);
    }
  };

  return (
    <div>
      <PhonebookList
        phonebook={phonebook}
        onEdit={handleEdit}
        onDelete={handleDeleteEntry}
      />
      <PhonebookForm
        onAdd={handleAddEntry}
        onEdit={handleEditEntry}
        selectedEntry={selectedEntry}
      />
    </div>
  );
};

export { App };
export type { PhonebookEntry };
