using MoviesApplication.Data.Models;
using MoviesApplication.Data;
using MoviesApplication.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MoviesApplication.Services.Implements
{
    public class MovieService : IMovieService
    {
        readonly AppDbContext _ctx;
        public MovieService(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<List<Movie>> GetAllMoviesAsync()
        {
            return await _ctx.Movies
                .Include(i => i.Actors)
                .Include(i => i.Directors)
                .OrderBy(m => m.Id)
                .ToListAsync();
        }

        public async Task<Movie> GetMovieByIdAsync(Guid id)
        {
            return await _ctx.Movies.Include(i=>i.Actors).Where(m => m.Id == id).FirstOrDefaultAsync();
        }

        public void AddEntity(object model)
        {
            _ctx.Add(model);
          
        }
        public void RemoveEntity(object model)
        {
            _ctx.Remove(model);
        }

        public bool SaveAll()
        {
            return _ctx.SaveChanges() > 0;
        }

        public async Task<List<Movie>> GetRecomended()
        {
            return await _ctx.Movies.Include(i => i.Actors).Where(m => m.IsRecommended == true).ToListAsync();
        }

        public async Task<List<Movie>> GetReleasedThisYear()
        {
            return await _ctx.Movies.Where(m => m.ReleaseDate.Value.Year == DateTime.Now.Year).ToListAsync();
        }

        public async Task<Movie> AddActorToMovieAsync(Guid movieId, Guid actorId)
        {
            var movie = await GetMovieByIdAsync(movieId);
            var actor = await _ctx.Actors.Where(a => a.Id == actorId).FirstOrDefaultAsync();
            movie.Actors.Add(actor);
            return movie;            
        }


    }
}
