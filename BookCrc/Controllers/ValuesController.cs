using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookCrc.Model;
using BookCrc.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BookCrc.Controllers
{
    [Route("api/values")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IRepository<Book> _repository;

        public ValuesController(IRepository<Book> repository)
        {
            this._repository = repository;
        }

        // GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> GetAll()
        {
            var book = await _repository.GetAllAsync();
            return Ok(book);
        }

        // GET api/values/5
        [HttpGet("{id}",Name = "Get")]
        public async Task<ActionResult<string>> Get(int id)
        {
            var book = await _repository.GetAsync(id);

            if (book == null)
                return NotFound("The book record could not be found.");

            return Ok(book);
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> PostAsync(Book value)
        {
            if (value == null)
            {
                return BadRequest("Book is null.");
            }

            await _repository.Add(value);

            return CreatedAtAction(nameof(Get), new { id = value.id}, value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Book book)
        {
            var bookToUpdate = await _repository.GetAsync(id);

            if (bookToUpdate == null)
                return NotFound("Book record could not be found");

            await _repository.UpdateAsync(bookToUpdate, book);

            return NoContent();

        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var bookToDelete = await _repository.GetAsync(id);
            if (bookToDelete == null)
                return NotFound("Book record could not be found");

            await _repository.Delete(bookToDelete);

            return NoContent();
        }
    }
}
