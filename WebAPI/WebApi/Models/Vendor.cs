using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Models
{
    public class Vendor
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? BusinessName { get; set; }
        public string? ContactName { get; set; }
        public string? BusinessPhone { get; set; }
        public string? BusinessEmail { get; set; }
        public string? BusinessAddress { get; set; }
        public string? ServiceArea { get; set; } // from the City enum
        public string? ServiceType { get; set; }  // from the ServiceType enum: Catering, Rentals, Entertainment, Staffing.
        public string? CuisineStyle { get; set; }  // froom the CuisineStyle enum: BBQ, Buffet, Beverages, FastFood, StreetFood, Healthy, ...
        public string? CuisineRegion { get; set; } // from the CuisineRegion enum: Italian, Chinese, Indian, Mediterranean, Persian, Caribbean, ...
        public string? Dining { get; set; }  // from the Dining enum: LiveCooking, FoodTruck, Delivery, Pickup
        public string? DietaryType { get; set; }  // from the DietaryType enum: Vegan, Vegetarian, GlutenFree, NutFree, Halal, Kosher
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }

        public string? Website { get; set; }
        public string? Instagram { get; set; }
        public string? Facebook { get; set; }

        public string? Offer { get; set; }
        public DateTime? OfferFrom { get; set; }
        public DateTime? OfferTo { get; set; }

        public bool Featured { get; set; }
        public bool InstantQuoteAvailable { get; set; }
        public bool Favorite { get; set; }

        public double RatingAverage { get; set; }
        public int ReviewCount { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.Now;

    }
}
