using AutoMapper;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using MoviesApplication.Data.Models;
using MoviesApplication.Data.ViewModels;
using MoviesApplication.Services.Interfaces;

namespace MoviesApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly ILogger<MovieController> _logger;
        private readonly IMovieService _MovieService;
        private readonly IMapper _mapper;
        private readonly IActorService _actorService;

        public MovieController(ILogger<MovieController> logger, IMovieService MovieService, IMapper mapper , IActorService actorService)
        {
            _logger = logger;
            _MovieService = MovieService;
            _mapper = mapper;
            _actorService = actorService;
            
        }

        [HttpGet]
        [Route("GetMovies")]
        public async Task<IActionResult> GetAllMovies()
        {
            try
            {
                return Ok(await _MovieService.GetAllMoviesAsync());
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get movies: {ex}");
                return BadRequest("Failed to get movies!");
            }
        }

        [HttpGet("{id:Guid}")]
        public async Task<IActionResult> GetMovieById(Guid id)
        {
            try
            {
                return Ok(await _MovieService.GetMovieByIdAsync(id));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get movie: {ex}");
                return BadRequest("Failed to get movie!");
            }
        }

        [HttpPost]
        [Route("PostMovie")]
        public async Task<IActionResult> PostMovie([FromBody]MovieViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newMovie = _mapper.Map<MovieViewModel, Movie>(model);
                    _MovieService.AddEntity(newMovie);
                    if (_MovieService.SaveAll())
                    {
                        return Created($"/api/movies/{newMovie.Id}", _mapper.Map<Movie, MovieViewModel>(newMovie));
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to post movie: {ex}");
            }
            return BadRequest("Failed to post movie!");
        }

        [HttpGet]
        [Route("recommended")]
        public async Task<IActionResult> GetRecomended()
        {
            try
            {
                return Ok(await _MovieService.GetRecomended());
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get recomended movies: {ex}");
                return BadRequest("Failed to get recomended movies!");
            }
        }

        [HttpGet]
        [Route("thisYear")]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _MovieService.GetReleasedThisYear());
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get movies: {ex}");
                return BadRequest("Failed to get recomended movies!");
            }
        }

        [HttpPost]
        [Route("{movieId:Guid}/AddActor/{actorId:Guid}")]
        public async Task<IActionResult> AddActorToMovie(Guid actorId, Guid movieId)
        {
            try
            {
                //var movie = await _MovieService.GetMovieByIdAsync(movieId);
                //var actor = await _actorService.GetActorByIdAsync(actorId);
                return Ok(await _MovieService.AddActorToMovieAsync(movieId, actorId));
                //if (movie == null)
                //{
                //    return NotFound();
                //}
                //movie.Actors.Add(actor);

                //if (_MovieService.SaveAll())
                //{
                    //return Ok(movie);
                //}
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to add actor to movie: {ex}");
            }
            return BadRequest("Failed to add actor to movie!");
        }

        [HttpDelete]
        [Route("{movieId:Guid}/remove/{actorId:Guid}")]
        public async Task<IActionResult> RemoveActorFromMovie(Guid movieId, Guid actorId)
        {
            try
            {
               return Ok(await _MovieService.RemoveActorFromMovie(movieId, actorId));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to remove actor from movie : {ex}");

                throw;
            }
            return BadRequest("Failed to remove actor from movie!");
        }


        [HttpDelete("{id:Guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var movie = await _MovieService.GetMovieByIdAsync(id);
                    _MovieService.RemoveEntity(movie);

                    if (_MovieService.SaveAll())
                    {
                        return Ok(movie);
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to delete movie: {ex}");
            }
            return BadRequest("Failed to delete movie!");
        }

        [HttpPut("{id:Guid}/score/{IsLike:bool}")]
        public async Task<int> Put(Guid id, bool IsLike)
        {
            try
            {
                if (IsLike)
                    return await _MovieService.IncreaseLikes(id);
                else
                    return await _MovieService.IncreaseDislikes(id);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get actor: {ex}");
                return 0;
            }
        }

    }
}
