using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BasketController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}
