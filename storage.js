/* ===================================
   LocalStorage Management
   =================================== */

const Storage = {
    // Keys
    ITEMS_KEY: 'review_platform_items',
    REVIEWS_KEY: 'review_platform_reviews',

    // Items Management
    saveItems(items) {
        localStorage.setItem(this.ITEMS_KEY, JSON.stringify(items));
    },

    loadItems() {
        const items = localStorage.getItem(this.ITEMS_KEY);
        return items ? JSON.parse(items) : this.getDefaultItems();
    },

    getItemById(id) {
        const items = this.loadItems();
        return items.find(item => item.id === parseInt(id));
    },

    addItem(item) {
        const items = this.loadItems();
        item.id = this.generateId(items);
        item.createdAt = new Date().toISOString();
        items.push(item);
        this.saveItems(items);
        return item;
    },

    updateItem(id, updatedData) {
        const items = this.loadItems();
        const index = items.findIndex(item => item.id === parseInt(id));
        if (index !== -1) {
            items[index] = { ...items[index], ...updatedData };
            this.saveItems(items);
            return items[index];
        }
        return null;
    },

// Items Management
    deleteItem(id) {
        const items = this.loadItems();
        // Filter out the item with the specific ID
        const filtered = items.filter(item => item.id !== parseInt(id));
        this.saveItems(filtered);
        
        // OPTIONAL: Cleanup reviews associated with this item
        const reviews = this.loadReviews();
        const cleanedReviews = reviews.filter(r => r.itemId !== parseInt(id));
        this.saveReviews(cleanedReviews);
    },

    // Reviews Management
    saveReviews(reviews) {
        localStorage.setItem(this.REVIEWS_KEY, JSON.stringify(reviews));
    },

    loadReviews() {
        const reviews = localStorage.getItem(this.REVIEWS_KEY);
        return reviews ? JSON.parse(reviews) : [];
    },

    getReviewsByItemId(itemId) {
        const reviews = this.loadReviews();
        return reviews.filter(review => review.itemId === parseInt(itemId));
    },

    addReview(review) {
        const reviews = this.loadReviews();
        review.id = this.generateId(reviews);
        review.createdAt = new Date().toISOString();
        review.helpful = 0;
        review.notHelpful = 0;
        reviews.push(review);
        this.saveReviews(reviews);

        // Update item's rating
        this.updateItemRating(review.itemId);

        return review;
    },

    updateReview(id, updatedData) {
        const reviews = this.loadReviews();
        const index = reviews.findIndex(review => review.id === parseInt(id));
        if (index !== -1) {
            reviews[index] = { ...reviews[index], ...updatedData };
            this.saveReviews(reviews);
            return reviews[index];
        }
        return null;
    },
    deleteReview(reviewId) {
        const reviews = this.loadReviews();
        const reviewToDelete = reviews.find(r => r.id === parseInt(reviewId));
        
        if (reviewToDelete) {
            // Remove the review
            const updatedReviews = reviews.filter(r => r.id !== parseInt(reviewId));
            this.saveReviews(updatedReviews);
            
            // Recalculate the rating for the item this review belonged to
            this.updateItemRating(reviewToDelete.itemId);
        }
    },

    markReviewHelpful(reviewId, isHelpful) {
        const reviews = this.loadReviews();
        const review = reviews.find(r => r.id === parseInt(reviewId));
        if (review) {
            if (isHelpful) {
                review.helpful++;
            } else {
                review.notHelpful++;
            }
            this.saveReviews(reviews);
        }
    },

    updateItemRating(itemId) {
        const reviews = this.getReviewsByItemId(itemId);
        if (reviews.length === 0) return;

        // Calculate overall average
        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
        const avgRating = (totalRating / reviews.length).toFixed(1);

        // Calculate category averages
        const categories = ['cleanliness', 'service', 'location', 'value', 'facilities'];
        const categoryRatings = {};

        categories.forEach(category => {
            const ratings = reviews
                .filter(r => r.categoryRatings && r.categoryRatings[category])
                .map(r => r.categoryRatings[category]);

            if (ratings.length > 0) {
                categoryRatings[category] = (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(1);
            }
        });

        // Update item
        this.updateItem(itemId, {
            ratingAvg: parseFloat(avgRating),
            reviewCount: reviews.length,
            categoryRatings
        });
    },

    // Utility
    generateId(array) {
        if (array.length === 0) return 1;
        return Math.max(...array.map(item => item.id)) + 1;
    },

    // Default Data
    getDefaultItems() {
        return [
            {
                id: 1,
                name: "Carlton Tel Aviv Hotel",
                category: "Hotels",
                location: "Tel Aviv, Israel",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
                gallery: [
                    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
                    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"
                ],
                ratingAvg: 4.7,
                reviewCount: 3,
                instagram: "https://www.instagram.com/carlton_tel_aviv/",
                facebook: "https://www.facebook.com/CarltonTelAviv/",
                categoryRatings: {
                    cleanliness: 4.8,
                    service: 4.9,
                    location: 4.9,
                    value: 4.4,
                    facilities: 4.7
                },
                info: {
                    checkIn: "15:00",
                    checkOut: "11:00",
                    wifi: "Free",
                    parking: "Available",
                    pets: "No"
                },
                amenities: ["🏊 Pool", "📶 Wi-Fi", "🏋️ Gym", "🍽️ Restaurant", "🧖 Spa", "🌊 Beach Access"],
                locationDetails: "Beachfront | Marina Views | 5 min from City Center",
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                name: "The Norman Tel Aviv",
                category: "Hotels",
                location: "Tel Aviv, Israel",
                image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
                gallery: [
                    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
                    "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=800"
                ],
                ratingAvg: 4.9,
                reviewCount: 2,
                instagram: "https://www.instagram.com/thenormantelaviv/",
                facebook: "https://www.facebook.com/TheNormanTelAviv/",
                categoryRatings: {
                    cleanliness: 5.0,
                    service: 4.9,
                    location: 4.8,
                    value: 4.7,
                    facilities: 4.9
                },
                info: {
                    checkIn: "15:00",
                    checkOut: "12:00",
                    wifi: "Free",
                    parking: "Valet Available",
                    pets: "On Request"
                },
                amenities: ["🏊 Rooftop Pool", "📶 Wi-Fi", "🍽️ Fine Dining", "🧖 Spa", "🎨 Art Gallery"],
                locationDetails: "Rothschild Boulevard | Historic Building | City Center",
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                name: "David Citadel Hotel",
                category: "Hotels",
                location: "Jerusalem, Israel",
                image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
                gallery: [
                    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
                    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800"
                ],
                ratingAvg: 4.8,
                reviewCount: 2,
                instagram: "https://www.instagram.com/thedavidcitadel/",
                facebook: "https://www.facebook.com/TheDavidCitadel/",
                categoryRatings: {
                    cleanliness: 4.9,
                    service: 4.8,
                    location: 5.0,
                    value: 4.5,
                    facilities: 4.8
                },
                info: {
                    checkIn: "15:00",
                    checkOut: "11:00",
                    wifi: "Free",
                    parking: "Available",
                    pets: "No"
                },
                amenities: ["🏊 Indoor Pool", "📶 Wi-Fi", "🏋️ Gym", "🍽️ Restaurant", "🧖 Spa", "🏛️ Old City Views"],
                locationDetails: "Old City Views | King David Street | Near Mamilla Mall",
                createdAt: new Date().toISOString()
            },
            {
                id: 4,
                name: "The Setai Tel Aviv",
                category: "Hotels",
                location: "Jaffa, Israel",
                image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
                gallery: [
                    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
                    "https://images.unsplash.com/photo-1587985064135-0366536eab42?w=800"
                ],
                ratingAvg: 4.6,
                reviewCount: 1,
                instagram: "https://www.instagram.com/thesetaitelaviv/",
                facebook: "https://www.facebook.com/TheSetaiTelAviv/",
                categoryRatings: {
                    cleanliness: 4.7,
                    service: 4.6,
                    location: 4.8,
                    value: 4.3,
                    facilities: 4.7
                },
                info: {
                    checkIn: "15:00",
                    checkOut: "11:00",
                    wifi: "Free",
                    parking: "Available",
                    pets: "No"
                },
                amenities: ["🏊 Infinity Pool", "📶 Wi-Fi", "🏋️ Gym", "🍽️ Restaurant", "🧖 Hammam Spa", "🏛️ Historic Building"],
                locationDetails: "Ottoman Fortress | Jaffa Port | Sea Wall Views",
                createdAt: new Date().toISOString()
            },
            {
                id: 5,
                name: "Beresheet Hotel",
                category: "Hotels",
                location: "Mitzpe Ramon, Israel",
                image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
                gallery: [
                    "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
                    "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800"
                ],
                ratingAvg: 4.9,
                reviewCount: 1,
                instagram: "https://www.instagram.com/beresheethotel/",
                facebook: "https://www.facebook.com/Isrotel.Beresheet/",
                categoryRatings: {
                    cleanliness: 5.0,
                    service: 4.9,
                    location: 5.0,
                    value: 4.7,
                    facilities: 4.9
                },
                info: {
                    checkIn: "15:00",
                    checkOut: "11:00",
                    wifi: "Free",
                    parking: "Free",
                    pets: "No"
                },
                amenities: ["🏊 Pool", "📶 Wi-Fi", "🏋️ Gym", "🍽️ Restaurant", "🧖 Spa", "🏜️ Desert Views", "🌅 Crater Views"],
                locationDetails: "Ramon Crater Edge | Negev Desert | Unique Desert Experience",
                createdAt: new Date().toISOString()
            }
        ];
    },

    // Initialize default reviews
    initializeDefaultReviews() {
        const reviews = this.loadReviews();
        if (reviews.length === 0) {
            const defaultReviews = [
                {
                    id: 1,
                    itemId: 1,
                    userName: "Sarah Johnson",
                    country: "USA",
                    rating: 5,
                    title: "Absolutely Perfect Stay!",
                    text: "The Carlton exceeded all expectations. The rooftop pool with marina views was stunning, and the beach access made it perfect. Staff was incredibly friendly and professional.",
                    pros: "Amazing location, beautiful rooftop pool, excellent service",
                    cons: "Can get busy during peak season",
                    categoryRatings: {
                        cleanliness: 5,
                        service: 5,
                        location: 5,
                        value: 4,
                        facilities: 5
                    },
                    date: "2025-08-15",
                    helpful: 24,
                    notHelpful: 2,
                    createdAt: "2025-08-15T10:00:00Z"
                },
                {
                    id: 2,
                    itemId: 1,
                    userName: "Michael Cohen",
                    country: "Israel",
                    rating: 4,
                    title: "Great Hotel with Amazing Views",
                    text: "Loved everything about this hotel. The breakfast was exceptional and the location can't be beat. Only minor issue was some noise from the street.",
                    pros: "Perfect location, excellent breakfast, friendly staff",
                    cons: "Some street noise at night",
                    categoryRatings: {
                        cleanliness: 4,
                        service: 5,
                        location: 5,
                        value: 4,
                        facilities: 4
                    },
                    date: "2025-08-10",
                    helpful: 12,
                    notHelpful: 1,
                    createdAt: "2025-08-10T14:30:00Z"
                },
                {
                    id: 3,
                    itemId: 1,
                    userName: "Emma Schmidt",
                    country: "Germany",
                    rating: 5,
                    title: "Luxury at its Best",
                    text: "This hotel is pure luxury. From check-in to check-out, everything was flawless. The rooftop bar at sunset is a must!",
                    pros: "Luxurious rooms, incredible views, great amenities",
                    cons: "Slightly expensive",
                    categoryRatings: {
                        cleanliness: 5,
                        service: 5,
                        location: 5,
                        value: 4,
                        facilities: 5
                    },
                    date: "2025-08-05",
                    helpful: 18,
                    notHelpful: 0,
                    createdAt: "2025-08-05T16:00:00Z"
                },
                {
                    id: 4,
                    itemId: 2,
                    userName: "David Brown",
                    country: "UK",
                    rating: 5,
                    title: "Boutique Perfection",
                    text: "The Norman is exactly what a boutique hotel should be. Intimate, luxurious, and incredibly stylish. The art collection alone is worth the visit!",
                    pros: "Stunning design, rooftop pool, excellent restaurant",
                    cons: "None really",
                    categoryRatings: {
                        cleanliness: 5,
                        service: 5,
                        location: 5,
                        value: 5,
                        facilities: 5
                    },
                    date: "2025-09-01",
                    helpful: 15,
                    notHelpful: 1,
                    createdAt: "2025-09-01T20:00:00Z"
                },
                {
                    id: 5,
                    itemId: 2,
                    userName: "Lisa Anderson",
                    country: "Canada",
                    rating: 5,
                    title: "Unforgettable Experience",
                    text: "From the moment we arrived, we were treated like royalty. The attention to detail is remarkable. Best hotel experience in Tel Aviv!",
                    pros: "Exceptional service, beautiful rooms, prime location",
                    cons: "Wish we could have stayed longer!",
                    categoryRatings: {
                        cleanliness: 5,
                        service: 5,
                        location: 5,
                        value: 4,
                        facilities: 5
                    },
                    date: "2025-08-28",
                    helpful: 20,
                    notHelpful: 0,
                    createdAt: "2025-08-28T21:30:00Z"
                },
                {
                    id: 6,
                    itemId: 3,
                    userName: "Rachel Goldstein",
                    country: "Israel",
                    rating: 5,
                    title: "Jerusalem's Finest",
                    text: "The David Citadel is a masterpiece. The views of the Old City are breathtaking, and being so close to everything made exploring Jerusalem effortless.",
                    pros: "Unbeatable location, stunning views, excellent spa",
                    cons: "Can be pricey during holidays",
                    categoryRatings: {
                        cleanliness: 5,
                        service: 5,
                        location: 5,
                        value: 4,
                        facilities: 5
                    },
                    date: "2025-09-05",
                    helpful: 22,
                    notHelpful: 0,
                    createdAt: "2025-09-05T18:00:00Z"
                },
                {
                    id: 7,
                    itemId: 3,
                    userName: "Thomas Mueller",
                    country: "Germany",
                    rating: 5,
                    title: "Perfect Location",
                    text: "You can't ask for a better location in Jerusalem. Walking distance to everything important, yet peaceful and luxurious.",
                    pros: "Location, comfort, great breakfast",
                    cons: "None",
                    categoryRatings: {
                        cleanliness: 5,
                        service: 5,
                        location: 5,
                        value: 5,
                        facilities: 5
                    },
                    date: "2025-09-10",
                    helpful: 16,
                    notHelpful: 0,
                    createdAt: "2025-09-10T10:00:00Z"
                },
                {
                    id: 8,
                    itemId: 4,
                    userName: "James Williams",
                    country: "USA",
                    rating: 5,
                    title: "Historic Beauty",
                    text: "The Setai is absolutely unique. Staying in an Ottoman fortress with modern luxury is an experience you won't forget. The infinity pool overlooking the sea is magical.",
                    pros: "Historic building, infinity pool, Jaffa location",
                    cons: "Slightly away from main Tel Aviv action",
                    categoryRatings: {
                        cleanliness: 5,
                        service: 5,
                        location: 5,
                        value: 4,
                        facilities: 5
                    },
                    date: "2025-09-12",
                    helpful: 19,
                    notHelpful: 1,
                    createdAt: "2025-09-12T15:00:00Z"
                },
                {
                    id: 9,
                    itemId: 5,
                    userName: "Sophie Martin",
                    country: "France",
                    rating: 5,
                    title: "Desert Paradise",
                    text: "Beresheet is unlike anything I've ever experienced. Waking up to views of the Ramon Crater was surreal. The hotel perfectly blends luxury with the raw beauty of the desert.",
                    pros: "Spectacular views, unique location, private pool suites available",
                    cons: "Remote location (but that's the point!)",
                    categoryRatings: {
                        cleanliness: 5,
                        service: 5,
                        location: 5,
                        value: 5,
                        facilities: 5
                    },
                    date: "2025-09-15",
                    helpful: 28,
                    notHelpful: 0,
                    createdAt: "2025-09-15T12:00:00Z"
                }
            ];
            this.saveReviews(defaultReviews);
        }
    },

    // Reset to defaults
    resetToDefaults() {
        this.saveItems(this.getDefaultItems());
        localStorage.removeItem(this.REVIEWS_KEY);
        this.initializeDefaultReviews();
    }
};

// Initialize default reviews on first load
Storage.initializeDefaultReviews();