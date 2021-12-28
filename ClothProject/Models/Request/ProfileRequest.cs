﻿using System.ComponentModel.DataAnnotations;

namespace ClothProject.Models.Request
{
    public class ProfileRequest
    {
        public int UserId { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Lastname { set; get; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Firstname { set; get; }
        [Required]
        public string Sex { set; get; }
    }
}
