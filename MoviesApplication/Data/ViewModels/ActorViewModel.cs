using MoviesApplication.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace MoviesApplication.Data.ViewModels
{
    public class ActorViewModel
    {
        [Key]
        public Guid ActorId { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public DateTime? Birthday { get; set; }
        public string? Country { get; set; }
        public DateTime? DayOfDeath { get; set; }
        public ICollection<Movie>? Movies { get; set; }
    }
}
