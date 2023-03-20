using MoviesApplication.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace MoviesApplication.Data.ViewModels
{
    public class MovieViewModel
    {
        [Key]
        public Guid MovieId { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public bool IsRecommended { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Genres { get; set; }
        public string RunTime { get; set; }
        public int AgeRating { get; set;  }
        public string MovieUrl { get; set; }
        public string TrailerUrl { get; set; }
        public string PosterUrl { get; set; }
        public ICollection<Director>? Directors { get; set; }
        public ICollection<Actor>? Actors { get; set; }
      
    }
}
