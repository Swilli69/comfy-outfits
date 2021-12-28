namespace ClothProject.Models
{
    public class Interest
    {
        public int InterestId { get; set; }
        public string Title { get; set;}

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
