import React from "react";
import { PhonebookEntry } from "./App";

interface PhonebookListProps {
  phonebook: PhonebookEntry[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const PhonebookList: React.FC<PhonebookListProps> = ({
  phonebook,
  onEdit,
  onDelete,
}) => {
  return (
    <div>
      <h2>Phonebook App</h2>
      <div className="phonebook-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {phonebook.map((entry) => {
              return (
                <tr key={entry.id}>
                  <td>{entry.name}</td>
                  <td>{entry.number}</td>
                  <td>
                    <button onClick={() => onEdit(entry.id)}>Edit</button>
                    <button onClick={() => onDelete(entry.id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PhonebookList;
