using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Models.DTO;
using WebApi.Data;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public NotificationsController(ApiDbContext context)
        {
            _context = context;
        }

        // GET: api/notifications/5
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetNotifications(int userId)
        {
            var query =
                from e in _context.Events
                join v in _context.Vendors on e.VendorId equals v.Id
                join u in _context.Users on e.UserId equals u.Id
                join r in _context.Reviews on e.Id equals r.EventId into reviewGroup
                from r in reviewGroup.DefaultIfEmpty() // LEFT JOIN
                where e.UserId == userId && e.VendorId != 0 // only events of this user
                orderby e.EventDate descending
                select new NotificationDto
                {
                    Id = e.Id,
                    UserId = e.UserId,
                    FullName = u.FullName,
                    EventType = e.EventType,
                    EventDate = e.EventDate,
                    VendorId = v.Id,
                    BusinessName = v.BusinessName,
                    Rating = r != null ? r.Rating : 0,
                    Title = r != null ? r.Title : "",
                    Comment = r != null ? r.Comment : "",
                    CreatedAt = r != null ? r.CreatedAt : null
                };

            var result = await query.ToListAsync();

            return Ok(result);
        }
    }

}
