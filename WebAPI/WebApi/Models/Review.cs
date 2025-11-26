namespace WebApi.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int EventId { get; set; }
        public int UserId { get; set; }
        public int VendorId { get; set; }

        public double Rating { get; set; }   // supports half stars
        public string? Title { get; set; }
        public string? Comment { get; set; }

        public DateTime CreatedAt { get; set; }
    }

}
