﻿using System.ComponentModel.DataAnnotations;

namespace ClothProject.Models.Request
{
    public class UserRequest
    {
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Lastname { set; get; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Firstname { set; get; }
        [Required]
        [EmailAddress]
        public string Email { set; get; }
        [Required]
        public string Password { set; get; }
        [Required]
        public string Role { set; get; }
        [Required]
        public string Sex { set; get; }
    }
}
