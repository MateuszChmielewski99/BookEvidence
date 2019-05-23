using BookCrc.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookCrc.Repository
{
    public interface IRepository<TEntity> where TEntity:class
    {
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task<TEntity> GetAsync(int id);
        Task UpdateAsync(TEntity entityToUpdate, TEntity entity);
        Task Add(TEntity entity);
        Task Delete(TEntity entityToDelate);
        
    }
}
