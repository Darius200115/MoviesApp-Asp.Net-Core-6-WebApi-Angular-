using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MoviesApplication.Data.Models;
using MoviesApplication.Data.ViewModels;
using MoviesApplication.Services.Implements;
using MoviesApplication.Services.Interfaces;

namespace MoviesApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActorController : ControllerBase
    {
        private readonly IActorService _service;
        private readonly IMapper _mapper;
        private readonly ILogger<ActorController> _logger;
        public ActorController(IActorService service, ILogger<ActorController> logger, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
            _logger = logger;

        }

        [HttpGet]
        [Route("GetActors")]
        public async Task<IActionResult> GetAllActors()
        {
            try
            {
                return Ok(await _service.GetAllActorsAsync());
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get actors: {ex}");
                return BadRequest("Failed to get actors!");
            }
        }

        [HttpGet("{id:Guid}")]
        public async Task<IActionResult> GetActorById(Guid id)
        {
            try
            {
                return Ok(await _service.GetActorByIdAsync(id));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get actor: {ex}");
                return BadRequest("Failed to get actor!");
            }
        }

        [HttpPost]
        [Route("PostActor")]
        public async Task<IActionResult> Post([FromBody] ActorViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newActor = _mapper.Map<ActorViewModel, Actor>(model);
                    _service.AddEntity(newActor);
                    if (_service.SaveAll())
                    {
                        return Created($"/api/actor/{newActor.Id}", _mapper.Map<Actor, ActorViewModel>(newActor));
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to post actor: {ex}");
            }
            return BadRequest("Failed to post actor");
        }

        


    }
}
