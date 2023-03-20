using AutoMapper;
using MoviesApplication.Data.Models;
using MoviesApplication.Data.ViewModels;

namespace MoviesApplication.Data
{
    public class AppMapperProfile : Profile
    {
        public AppMapperProfile()
        {
            CreateMap<Movie, MovieViewModel>()
                .ForMember(m => m.MovieId, p => p.MapFrom(m => m.Id))
                .ReverseMap();

            CreateMap<Actor, ActorViewModel>()
                .ForMember(m => m.ActorId, p => p.MapFrom(m => m.Id))
                .ReverseMap();

            CreateMap <AppUser, AppUserViewModel > ()
                    .ForMember(u => u.UserId, p => p.MapFrom(u => u.Id))
                    .ReverseMap();
        }


    }
}
