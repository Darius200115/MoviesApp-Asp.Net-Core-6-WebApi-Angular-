using Microsoft.EntityFrameworkCore;
using MoviesApplication.Data;
using MoviesApplication.Data.Models;
using MoviesApplication.Services.Interfaces;

namespace MoviesApplication.Services.Implements
{
    public class ActorService:IActorService
    {
        private readonly AppDbContext _ctx;
        public ActorService(AppDbContext ctx)
        {
            _ctx = ctx;
        }
        public void AddEntity(object model)
        {
            _ctx.Add(model);
        }

        public async Task<Actor> GetActorByIdAsync(Guid id)
        {
            return await _ctx.Actors.Where(a => a.Id == id).FirstOrDefaultAsync();
        }

        public async Task<object?> GetAllActorsAsync()
        {
            return await _ctx.Actors.Include(i=>i.Movies).OrderBy(a=>a.SecondName).ToListAsync();
        }

        public bool SaveAll()
        {
            return _ctx.SaveChanges() > 0;
        }
    }
}
