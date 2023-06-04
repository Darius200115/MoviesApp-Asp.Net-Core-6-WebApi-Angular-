using Microsoft.AspNetCore.Mvc;
using MoviesApplication.Data.Models;

namespace MoviesApplication.Services.Interfaces
{
    public interface IMovieService
    {
        Task<List<Movie>> GetAllMoviesAsync();
        Task<Movie> GetMovieByIdAsync(Guid id);
        Task<List<Movie>> GetRecomended();
        Task<List<Movie>> GetReleasedThisYear();
        Task<Movie> AddActorToMovieAsync(Guid movieId, Guid actorId);
        void AddEntity(object model);
        bool SaveAll();
        void RemoveEntity(object model);
        Task<Movie> RemoveActorFromMovie(Guid movieId, Guid actorId );
        Task<int> IncreaseLikes(Guid id);
        Task<int> IncreaseDislikes(Guid id);
    }
}
