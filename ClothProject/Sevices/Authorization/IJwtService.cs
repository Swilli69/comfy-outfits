using ClothProject.Services.Authorization.Models;

namespace ClothProject.Sevices.Authorization
{
    public interface IJwtService
    {
        public string GetToken(JwtUser user);
    }
}
