using MoviesApplication.Data.Models;

namespace MoviesApplication.Services.Interfaces
{
    public interface IMovieService
    {
        Task<List<Movie>> GetAllMoviesAsync();
        Task<Movie> GetMovieByIdAsync(Guid id);
        Task<List<Movie>> GetRecomended();
        Task<List<Movie>> GetReleasedThisYear();
        void AddEntity(object model);
        bool SaveAll();
        void RemoveEntity(object model);
    }
}
