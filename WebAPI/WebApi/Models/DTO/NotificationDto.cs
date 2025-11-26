using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Models.DTO
{
    public class NotificationDto
    {
        public int Id { get; set; }  // event.Id
        public int UserId { get; set; }
        public string? FullName { get; set; }
        public string? EventType { get; set; } 
        public DateTime? EventDate { get; set; }
        public int VendorId { get; set; }
        public string? BusinessName { get; set; }
        public double Rating { get; set; }
        public string? Title { get; set; }
        public string? Comment { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
