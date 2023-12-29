using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PhonebookApp.Models
{
    public class Phonebook
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("Number")]
        public string Number { get; set; }
    }

    public class PhonebookRequest
    {
        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("Number")]
        public string Number { get; set; }
    }
}
