using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project3.Models;
using System.Net;
using System.Security.Claims;
using System;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Project3.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : Controller
    {

        public static byte[] temp_Avatar;

        private readonly AzureDbContext _context;

        public AuthController(AzureDbContext dbContext)
        {
            _context = dbContext;
        }

        [Route(("login"))]
        [HttpPost]
        public async Task<JsonResult> Login([FromBody]Xuser user)
        {

            Console.WriteLine(user.userEmail + " " + user.userPassword);

            User? u = await _context.Users.FirstOrDefaultAsync(p => p.UserEmail == user.userEmail && p.UserPassword == user.userPassword);


            if (u is null)
            {
                Console.WriteLine("User wasn't found");
                return new JsonResult("Bad");
            }
            else
            {
                Console.WriteLine("Succes");

                var claims = new List<Claim> { new Claim(ClaimTypes.Email, u.UserEmail) };

                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Cookies");

                await Request.HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

                return new JsonResult("Good");
            }
                
        }

        [Route("logout")]
        [HttpPost]
        public async Task Logout()
        {
            await Request.HttpContext.SignOutAsync();
            Console.WriteLine("Logout");
        }

        [Route("GetCurrentUserId")]
        [HttpGet]
        public JsonResult GetUserCurrentId()
        {
            ClaimsPrincipal principal = HttpContext.User;

            if (principal.Identity.IsAuthenticated)
            {
                User? u = _context.Users.ToList().FirstOrDefault(x => x.UserEmail == principal.Claims.ToList()[0].Value);

                return Json(new {Id = u.UserId, userName = u.UserName, userEmail=u.UserEmail, userAvatar=u.UserAvatar});
            }
            else
            {
                return new JsonResult("Failed");
            }
        }





        [Route("GetUserById/{id}")]
        [HttpGet]
        public async Task<JsonResult> GetUserById(string id)
        {
            await Console.Out.WriteAsync("x");
            ClaimsPrincipal principal = HttpContext.User;

            if (principal.Identity.IsAuthenticated)
            {
                User? u = _context.Users.ToList().FirstOrDefault(x => x.UserId == Convert.ToInt32(id));

                return Json(new { Id = u.UserId, userName = u.UserName, userEmail = u.UserEmail, userAvatar = u.UserAvatar });
            }
            else
            {
                return new JsonResult("Failed");
            }
        }

        [Route("imagex")]
        [HttpPost]
        public async Task<JsonResult> Imagex([FromBody]XUnit8Convert xu)
        {
            Console.WriteLine(xu.Unit8Array);
            byte[] newBytes = Convert.FromBase64String(xu.Unit8Array);
            temp_Avatar = newBytes;
            return new JsonResult(newBytes);

        }


    }
}
