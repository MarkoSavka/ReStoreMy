using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args); //creating webApplication Host

// Add services to the container. //dependency injection container(було таке в файлах @inject e Blazor,тут схоже шось)
//коли ми створили сервіси,треба їх зареєструвати/додати до контейнера щоб наша прога їх використовувала
//в якому порядку підключені сервіси-неважливо

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); //ці два сервіси потрібні для генерації контенту в браузері

//DbContext
builder.Services.AddDbContext<StoreContext>(opt => //додає котекст БД StoreContext до контейнера служб DI,Це означає, що при кожному запиті буде створено новий екземпляр StoreContext
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
    //цей рядок вказує, що ви хочете використовувати SQLite як вашу базу даних. Він також отримує рядок підключення з файлу конфігурації за допомогою ключа "DefaultConnection"
});

var app = builder.Build(); //збираємо проект в app

// Configure the HTTP request pipeline.
//opportunity to add midlewares(тут послідовність важлива)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); //це все мідлвери,де app.Щось
    app.UseSwaggerUI();
}

//в терміналі пропав ерор звязаний з мідлвером[3] тому що ми видалили це:
//app.UseHttpsRedirection(); //if we use http it would be redirect to https

app.UseAuthorization();

app.MapControllers();


//singleton, scoped, і transient
//CreateScope використовується для створення нової, незалежної області дії (scope), яка може бути використана для отримання служб з області дії
//Служби з областю дії (Scoped services) створюються один раз на клієнтський запит (з'єднання). Це корисно, коли у вас є служба, яка не повинна бути спільною для декількох запитів,
// наприклад контекст бази даних (StoreContext у вашому випадку) або служба журналування (ILogger<Program> у вашому випадку)

var scope=app.Services.CreateScope(); //створює область дії Scope для отримання служб
var context=scope.ServiceProvider.GetRequiredService<StoreContext>(); //отримує контекст бази даних StoreContext з контейнера служб
var logger=scope.ServiceProvider.GetRequiredService<ILogger<Program>>(); //отримує службу журналування, яка може бути використана для запису повідомлень про помилки
try
{
    context.Database.Migrate(); //застосовує всі наявні міграції до бази даних. Якщо база даних не існує, вона буде створена
    DbInitializer.Initialize(context); //мій написаний метод. ініціалізує базу даних даними
}
catch (Exception ex)
{
    logger.LogError(ex,"A problem occured doring migration");
}


app.Run();
