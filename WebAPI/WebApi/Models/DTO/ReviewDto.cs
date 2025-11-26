namespace WebApi.Models.DTO
{
    public class ReviewDto
    {
        public int EventId { get; set; }
        public double Rating { get; set; }
        public string? Title { get; set; }
        public string? Comment { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
