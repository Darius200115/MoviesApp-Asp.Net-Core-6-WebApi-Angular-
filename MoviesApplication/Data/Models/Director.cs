using System.ComponentModel.DataAnnotations;

namespace MoviesApplication.Data.Models
{
    public class Director
    {
        [Key]
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public DateTime? Birthday { get; set; }
        public string? CountryOfBirth { get; set; }
        public string? PhotoUrl { get; set; }
        public ICollection<Movie>? Movies { get; set; }
    }
}
