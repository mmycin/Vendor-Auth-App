using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorsController : ControllerBase
    {
        private readonly ApiDbContext _context;
        private IConfiguration _config;

        public VendorsController(ApiDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // GET: api/vendors/5   (by vendorId)
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Vendor>> GetVendor(int id)
        {
            var vendor = await _context.Vendors.FindAsync(id);

            if (vendor == null)
            {
                return NotFound();
            }

            return vendor;
        }

        // GET: api/vendors/byUser/7   (by userId)
        [HttpGet("byUser/{userId:int}")]
        public async Task<ActionResult<Vendor>> GetVendorByUserId(int userId)
        {
            var vendor = await _context.Vendors.FirstOrDefaultAsync(u => u.UserId == userId);

            if (vendor == null)
            {
                return NotFound();
            }

            return vendor;
        }

        // POST: api/vendors/byUser/7
        [HttpPost("byUser/{userId:int}")]
        public async Task<ActionResult<Vendor>> PostVendor(int userId, Vendor vendor)
        {
            // ensure the vendor is linked to the correct user
            vendor.UserId = userId;

            _context.Vendors.Add(vendor);
            await _context.SaveChangesAsync();

            // return Created with the vendor resource location
            return CreatedAtAction(nameof(GetVendor), new { id = vendor.Id }, vendor);
        }

        // PUT: api/vendors/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> PutVendor(int id, Vendor vendor)
        {
            if (id != vendor.Id)
            {
                return BadRequest();
            }

            _context.Entry(vendor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VendorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/vendors/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteVendor(int id)
        {
            var vendor = await _context.Vendors.FindAsync(id);
            if (vendor == null)
            {
                return NotFound();
            }

            _context.Vendors.Remove(vendor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VendorExists(int id)
        {
            return _context.Vendors.Any(e => e.Id == id);
        }


        // GET: api/vendors/searchall
        [HttpGet("searchall")]
        public async Task<IActionResult> SearchVendorsList(
            [FromQuery] string? city,
            [FromQuery] string? searchText,
            [FromQuery] bool isOffer = false,
            [FromQuery] bool isFavorite = false,
            [FromQuery] int? userId = null)
        {
            IQueryable<Vendor> query = _context.Vendors;

            if (!string.IsNullOrWhiteSpace(city))
            {
                city = city.Trim().ToLower();
                query = query.Where(v => v.ServiceArea != null && v.ServiceArea.ToLower() == city);
            }

            if (!string.IsNullOrWhiteSpace(searchText))
            {
                var words = searchText
                    .Trim()
                    .ToLower()
                    .Split(' ', StringSplitOptions.RemoveEmptyEntries);

                query = query.Where(v =>
                    words.Any(word =>
                        (v.BusinessName ?? "").ToLower().Contains(word) ||
                        (v.ContactName ?? "").ToLower().Contains(word) ||
                        (v.BusinessPhone ?? "").ToLower().Contains(word) ||
                        (v.BusinessEmail ?? "").ToLower().Contains(word) ||
                        (v.BusinessAddress ?? "").ToLower().Contains(word) ||
                        (v.ServiceType ?? "").ToLower().Contains(word) ||
                        (v.CuisineStyle ?? "").ToLower().Contains(word) ||
                        (v.CuisineRegion ?? "").ToLower().Contains(word) ||
                        (v.Dining ?? "").ToLower().Contains(word) ||
                        (v.DietaryType ?? "").ToLower().Contains(word) ||
                        (v.Description ?? "").ToLower().Contains(word)
                    )
                );
            }


            if (isOffer)
            {
                var today = DateTime.UtcNow;
                query = query.Where(v =>
                    v.Offer != null &&
                    v.OfferFrom <= today &&
                    v.OfferTo >= today
                );
            }

            // FAVORITE FILTER
            if (isFavorite && userId.HasValue)
            {
                var favVendorIds = await _context.FavoriteVendors
                    .Where(f => f.UserId == userId.Value)
                    .Select(f => f.VendorId)
                    .ToListAsync();

                query = query.Where(v => favVendorIds.Contains(v.Id));
            }

            var results = await query.ToListAsync();

            // Mark Favorite = true/false for each vendor of this userId
            if (userId.HasValue)
            {
                var favVendorIds = await _context.FavoriteVendors
                    .Where(f => f.UserId == userId.Value)
                    .Select(f => f.VendorId)
                    .ToListAsync();

                foreach (var vendor in results)
                {
                    vendor.Favorite = favVendorIds.Contains(vendor.Id);
                }
            }

            return Ok(results);
        }


        // POSt: add favorite
        [HttpPost("favorite")]
        public async Task<IActionResult> AddFavorite([FromBody] FavoriteVendor request)
        {
            if (request.UserId <= 0 || request.VendorId <= 0)
                return BadRequest("Invalid data.");

            // Prevent duplicates
            bool exists = await _context.FavoriteVendors
                .AnyAsync(f => f.UserId == request.UserId && f.VendorId == request.VendorId);

            if (exists)
                return Ok(new { message = "Already in favorites." });

            var fav = new FavoriteVendor
            {
                UserId = request.UserId,
                VendorId = request.VendorId
            };

            _context.FavoriteVendors.Add(fav);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Added to favorites." });
        }

        // DELETE: remove favorite
        [HttpDelete("favorite")]
        public async Task<IActionResult> RemoveFavorite(int userId, int vendorId)
        {
            var record = await _context.FavoriteVendors
                .FirstOrDefaultAsync(f => f.UserId == userId && f.VendorId == vendorId);

            if (record == null)
                return NotFound(new { message = "Favorite not found." });

            _context.FavoriteVendors.Remove(record);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Removed from favorites." });
        }


    }
}
