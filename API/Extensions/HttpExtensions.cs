using System.Text.Json;
using API.RequestHelpers;

namespace API.Extensions;

public static class HttpExtensions
{
    public static void AddPaginationHeader(this HttpResponse response, MetaData metaData)
    {
        var opt = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        
        response.Headers.Add("Pagination",JsonSerializer.Serialize(metaData,opt));
        response.Headers.Append("Access-Control-Expose-Headers","Pagination");
    }
}
