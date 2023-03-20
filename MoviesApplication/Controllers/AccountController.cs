using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MoviesApplication.Data.Models;
using MoviesApplication.Data.ViewModels;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MoviesApplication.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IMapper _mapper;
        private readonly IConfiguration _cfg;

        public AccountController(ILogger<AccountController> logger, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IMapper mapper, IConfiguration cfg)
        {
            _logger = logger;
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _cfg = cfg;
        }

        [HttpPost("createToken")]
        public async Task<IActionResult> CreateToken([FromBody] AppUserViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user != null)
                {
                    var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

                    if (result.Succeeded)
                    {
                        var claims = new[]
                        {
                            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)

                        };
                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_cfg["Tokens:Key"]));
                        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        var token = new JwtSecurityToken(
                            _cfg["Tokens:Issuer"],
                            _cfg["Tokens:Audience"],
                            claims,
                            signingCredentials: creds,
                            expires: DateTime.Now.AddMinutes(30));

                        return Created("", new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            expiration = token.ValidTo
                        });
                    }
                }
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("registration")]
        public async Task<IActionResult> Registration([FromBody] AppUserViewModel user)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newUser = new AppUser()
                    {
                        Email = user.Email,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Password = user.Password,
                        UserName = user.UserName,
                        CreatedAt = DateTime.Now,
                        LastUpdatedAt = DateTime.Now,
                    };
                    var result = await _userManager.CreateAsync(newUser, user.Password);
                    if (result != IdentityResult.Success)
                    {
                        throw new InvalidOperationException("Could not create new user!");
                    }
                    return Created($"/api/account/{newUser.Id}", _mapper.Map<AppUser, AppUserViewModel>(newUser));
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to register new account!");
            }
            return BadRequest("Failed to register new account!");
        }



    }
}   
