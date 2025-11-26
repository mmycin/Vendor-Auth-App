using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Models.DTO;
using WebApi.Data;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewsController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public ReviewsController(ApiDbContext context)
        {
            _context = context;
        }

        // GET: api/reviews/event/10
        [HttpGet("event/{eventId}")]
        public async Task<IActionResult> GetReviewByEvent(int eventId)
        {
            var review = await _context.Reviews
                .FirstOrDefaultAsync(r => r.EventId == eventId);

            if (review == null)
            {
                // Return default blank review
                return Ok(new ReviewDto
                {
                    EventId = eventId,
                    Rating = 0,
                    Title = "",
                    Comment = "",
                    CreatedAt = null
                });
            }

            return Ok(new ReviewDto
            {
                EventId = eventId,
                Rating = review.Rating,
                Title = review.Title,
                Comment = review.Comment,
                CreatedAt = review.CreatedAt
            });
        }

        // POST: api/reviews
        [HttpPost]
        public async Task<IActionResult> SaveReview([FromBody] ReviewCreateDto dto)
        {
            if (dto == null)
                return BadRequest("Invalid request");

            // Find related event
            var ev = await _context.Events.FindAsync(dto.EventId);
            if (ev == null)
                return NotFound("Event not found");

            // Check if review already exists
            var existingReview = await _context.Reviews
                .FirstOrDefaultAsync(r => r.EventId == dto.EventId);

            if (existingReview == null)
            {
                // Create new
                var newReview = new Review
                {
                    EventId = dto.EventId,
                    UserId = ev.UserId,
                    VendorId = ev.VendorId,
                    Rating = dto.Rating,
                    Title = dto.Title,
                    Comment = dto.Comment,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Reviews.Add(newReview);
            }
            else
            {
                // Update existing
                existingReview.Rating = dto.Rating;
                existingReview.Title = dto.Title;
                existingReview.Comment = dto.Comment;
                existingReview.CreatedAt = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Review saved successfully" });
        }
    }

}
