using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace BookCrc.Model
{
    public class Book
    {
        [Key]
        public int id { get; set; }

        [Required]
        public string author_last_name { set; get; }

        [Required]
        public string title { get; set; }

        [Required]
        public int amount { get; set; }
    }
}
