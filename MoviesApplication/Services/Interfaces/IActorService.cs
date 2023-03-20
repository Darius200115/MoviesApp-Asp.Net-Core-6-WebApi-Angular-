using MoviesApplication.Data.Models;

namespace MoviesApplication.Services.Interfaces
{
    public interface IActorService
    {
        void AddEntity(object model);
        Task<object?> GetAllActorsAsync();
        Task<Actor> GetActorByIdAsync(Guid id);
        bool SaveAll();
    }
}
