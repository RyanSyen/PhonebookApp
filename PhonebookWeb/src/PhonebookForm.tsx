import React, { useState, useEffect } from "react";
import { PhonebookEntry } from "./App";

interface PhonebookFormProps {
  onAdd: (name: string, number: string) => void;
  onEdit: (id: string, name: string, number: string) => void;
  selectedEntry: PhonebookEntry | null;
}

const PhonebookForm: React.FC<PhonebookFormProps> = ({
  onAdd,
  onEdit,
  selectedEntry,
}) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    if (selectedEntry) {
      setName(selectedEntry.name);
      setNumber(selectedEntry.number);
    }
  }, [selectedEntry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedEntry) {
      onEdit(selectedEntry.id, name, number);
    } else {
      onAdd(name, number);
    }

    setName("");
    setNumber("");
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };

  return (
    <div>
      <h2>
        {selectedEntry ? "Edit Phonebook Entry" : "Add New Phonebook Entry"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="formFieldWrapper">
          <div className="formFields">
            <label>Name:</label>
            <input type="text" value={name} onChange={onChangeName} />
          </div>
          <div className="formFields">
            <label>Number:</label>
            <input type="text" value={number} onChange={onChangeNumber} />
          </div>
        </div>
        <button type="submit">{selectedEntry ? "Edit" : "Add"}</button>
      </form>
    </div>
  );
};

export default PhonebookForm;
