using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Project3;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Project3.Hubs;

[assembly: ApiController]

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.AddSignalR().AddAzureSignalR();

builder.Services.AddDbContext<AzureDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("AzureDbConnectionString")));

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options => {
    options.LoginPath = "/login";
});
builder.Services.AddAuthorization();
builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddCors();
builder.Services.AddControllers();


var app = builder.Build();
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.MapControllers();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseDefaultFiles();
app.UseAuthorization();
app.UseAuthentication();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Values}/{action=Index}");

app.MapHub<NexusChat>("/NexusChat");

app.Run();
