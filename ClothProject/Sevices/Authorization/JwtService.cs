﻿using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ClothProject.Services.Authorization.Models;
using ClothProject.Services.Authorization.Settings;

namespace ClothProject.Sevices.Authorization
{
    public class JwtService : IJwtService
    {
        public string GetToken(JwtUser user)
        {
            var identity = GetIdentity(user);
            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                issuer: JwtSettings.ISSUER,
                audience: JwtSettings.AUDIENCE,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromMinutes(JwtSettings.LIFETIME)),
                signingCredentials: new SigningCredentials(JwtSettings.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
            );

            var encodedToken = new JwtSecurityTokenHandler().WriteToken(jwt);
            return encodedToken;
        }
        private ClaimsIdentity GetIdentity(JwtUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role)
            };
            ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
            return claimsIdentity;
        }
    }
}
