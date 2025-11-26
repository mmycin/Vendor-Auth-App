namespace WebApi.Models.DTO
{
    public class MessageDto
    {
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public string? Message { get; set; } // The Flutter app will send this
    }

}
