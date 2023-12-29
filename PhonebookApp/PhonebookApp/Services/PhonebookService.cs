using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using PhonebookApp.Models;

namespace PhonebookApp.Services
{
    public class PhonebookService
    {
        private readonly IMongoCollection<Phonebook> _phonebookEntries;

        public PhonebookService(IMongoClient client, IDBSetting settings)
        {
            var database = client.GetDatabase(settings.DatabaseName);
            _phonebookEntries = database.GetCollection<Phonebook>(settings.CollectionName);
        }

        public List<Phonebook> Get() => _phonebookEntries.Find(entry => true).ToList();

        public Phonebook Get(string id) => _phonebookEntries.Find(entry => entry.Id == id).FirstOrDefault();

        public Phonebook Create(PhonebookRequest entry)
        {
            var newEntry = new Phonebook()
            {
                Name = entry.Name,
                Number = entry.Number,
            };
            _phonebookEntries.InsertOne(newEntry);
            return newEntry;
        }

        public void Update(string id, [FromBody]Phonebook entryIn) => _phonebookEntries.ReplaceOne(entry => entry.Id == id, entryIn);

        public void Remove(Phonebook entryIn) => _phonebookEntries.DeleteOne(entry => entry.Id == entryIn.Id);

        public void Remove(string id) => _phonebookEntries.DeleteOne(entry => entry.Id == id);
    }
}
