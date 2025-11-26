using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using WebApi.Data;
using WebApi.Models;
using WebApi.Models.DTO;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public MessagesController(ApiDbContext context)
        {
            _context = context;
        }

        // POST api/messages/send
        [HttpPost("send")]
        public async Task<IActionResult> SendMessage([FromBody] MessageDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Message))
                return BadRequest(new { error = "Message field cannot be empty." });

            var message = new Message
            {
                SenderId = dto.SenderId,
                ReceiverId = dto.ReceiverId,
                Content = dto.Message, // maps from DTO to DB field
                SentAt = DateTime.UtcNow,
                IsRead = false
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                message = "Message sent successfully.",
                data = message
            });
        }

        // Get distinct chat users for a given userId
        [HttpGet("chat-users/{userId}")]
        public async Task<IActionResult> GetChatUsers(int userId)
        {
            var users = await (
                from m in _context.Messages
                join u in _context.Users on m.SenderId equals u.Id
                join v in _context.Vendors on u.Id equals v.UserId into vendorLeft
                from v in vendorLeft.DefaultIfEmpty()
                where m.ReceiverId == userId
                select new { u.Id, u.FullName, v.BusinessName }
            )
            .Union(
                from m in _context.Messages
                join u in _context.Users on m.ReceiverId equals u.Id
                join v in _context.Vendors on u.Id equals v.UserId into vendorLeft
                from v in vendorLeft.DefaultIfEmpty()
                where m.SenderId == userId
                select new { u.Id, u.FullName, v.BusinessName }
            )
            .Distinct()
            .ToListAsync();

            return Ok(users);
        }

        // Get all messages between two users, sorted by date ascending
        [HttpGet("conversation/{userId}/{otherUserId}")]
        public async Task<IActionResult> GetConversation(int userId, int otherUserId)
        {
            var messages = await _context.Messages
                .Where(m =>
                    (m.SenderId == userId && m.ReceiverId == otherUserId) ||
                    (m.SenderId == otherUserId && m.ReceiverId == userId))
                .OrderBy(m => m.SentAt) // or .OrderBy(m => m.Id)
                .ToListAsync();

            return Ok(messages);
        }
    }
}
