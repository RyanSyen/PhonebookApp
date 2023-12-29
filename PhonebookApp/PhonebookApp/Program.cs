using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PhonebookApp.Models;
using PhonebookApp.Services;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
                builder => builder
                    .WithOrigins("http://localhost:5173") // Add your frontend origin
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<DBSetting>(builder.Configuration.GetSection("DBSetting"));
builder.Services.AddSingleton<IDBSetting>(setting => setting.GetRequiredService<IOptions<DBSetting>>().Value);
builder.Services.AddSingleton<IMongoClient, MongoClient>(setting =>
{
    var settings = setting.GetRequiredService<IOptions<DBSetting>>().Value;
    return new MongoClient(settings.ConnectionString);
});
builder.Services.AddSingleton<PhonebookService, PhonebookService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//app.UseCors(x => x
//.WithOrigins("http://localhost:5173")
//.AllowAnyHeader()
//.AllowAnyHeader()
//.SetIsOriginAllowed(origin => true)
//.AllowCredentials());

app.UseCors("AllowSpecificOrigin");

app.UseAuthorization();

app.MapControllers();

app.Run();
