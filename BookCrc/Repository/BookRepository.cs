using BookCrc.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookCrc.Repository
{
    public class BookRepository : IRepository<Book>
    {
        private readonly BookDbContext _context;

        public BookRepository(BookDbContext context)
        {
            this._context = context;
        }

        public async Task Add(Book entity)
        {
            if (entity != null)
            {
                await _context.Books.AddAsync(entity);
                await _context.SaveChangesAsync();
            }
              
        }

        public async Task Delete(Book entityToDelate)
        {
            if (entityToDelate != null)
            {
                _context.Books.Remove(entityToDelate);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Book> GetAsync(int id)
        {
            return await _context.Books.FirstOrDefaultAsync(s => s.id == id);
        }

        public async Task<IEnumerable<Book>> GetAllAsync()
        {
            return await _context.Books.ToListAsync();
        }

        public async Task UpdateAsync(Book entityToUpdate, Book entity)
        {
            entityToUpdate.title = entity.title;
            entityToUpdate.author_last_name = entity.author_last_name;
            entityToUpdate.amount = entity.amount;

            await _context.SaveChangesAsync();
        }
    }
}
