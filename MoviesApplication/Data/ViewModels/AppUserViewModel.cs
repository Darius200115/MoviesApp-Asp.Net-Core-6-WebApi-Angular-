using System.ComponentModel.DataAnnotations;

namespace MoviesApplication.Data.ViewModels
{
    public class AppUserViewModel
    {
        public Guid UserId { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public string? UserName { get; set; }    
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime? CreatedAt { get; set; }
        public bool? RememberMe { get; set; }
    }
}
