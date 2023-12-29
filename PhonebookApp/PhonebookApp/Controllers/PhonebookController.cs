using Microsoft.AspNetCore.Mvc;
using PhonebookApp.Models;
using PhonebookApp.Services;

[Route("[controller]")]
[ApiController]
public class PhonebookController : ControllerBase
{
    private readonly PhonebookService _phonebookService;

    public PhonebookController(PhonebookService phonebookService)
    {
        _phonebookService = phonebookService;
    }

    [HttpGet]
    public ActionResult<List<Phonebook>> Get() =>
        _phonebookService.Get();

    [HttpGet("{id:length(24)}", Name = "GetPhonebookEntry")]
    public ActionResult<Phonebook> Get(string id)
    {
        var entry = _phonebookService.Get(id);

        if (entry == null)
        {
            return NotFound();
        }

        return entry;
    }

    [HttpPost]
    public ActionResult<Phonebook> Create(PhonebookRequest entry)
    {
        var createdEntry = _phonebookService.Create(entry);

        return CreatedAtRoute("GetPhonebookEntry", new { id = createdEntry.Id.ToString() }, createdEntry);
    }

    [HttpPut("{id:length(24)}")]
    public IActionResult Update(string id, Phonebook entryIn)
    {
        var entry = _phonebookService.Get(id);

        if (entry == null)
        {
            return NotFound();
        }

        _phonebookService.Update(id, entryIn);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public IActionResult Delete(string id)
    {
        var entry = _phonebookService.Get(id);

        if (entry == null)
        {
            return NotFound();
        }

        _phonebookService.Remove(entry.Id);

        return NoContent();
    }
}
