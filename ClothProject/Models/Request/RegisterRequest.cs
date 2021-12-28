﻿using System.ComponentModel.DataAnnotations;

namespace ClothProject.Models.Request
{
    public class RegisterRequest
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
        [StringLength(18, MinimumLength = 8)]
        public string Password { set; get; }
        [Required]
        public string Sex { set; get; }
    }
}
