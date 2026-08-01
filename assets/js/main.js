document.addEventListener('DOMContentLoaded', () => {
    // 1. Mock Data for Amenities
    const amenities = [
        {
            icon: '🏊‍♂️',
            title: 'Infinity Pool',
            description: 'Relax with oceanfront views in our temperature-controlled infinity pool.'
        },
        {
            icon: '🍽️',
            title: 'Fine Dining',
            description: 'Savor gourmet dishes prepared by world-class culinary chefs.'
        },
        {
            icon: '🧘‍♀️',
            title: 'Spa & Wellness',
            description: 'Rejuvenate your body and mind with our signature massage treatments.'
        }
    ];

    // 2. Mock Data for Guest Rooms
    const rooms = [
        {
            id: 1,
            title: 'Deluxe Ocean View Room',
            category: 'Ocean View',
            price: 220,
            capacity: '2 Guests',
            image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
            features: ['King Bed', 'Free Wi-Fi', 'Private Balcony', 'Sea View']
        },
        {
            id: 2,
            title: 'Executive Suite',
            category: 'Suite',
            price: 350,
            capacity: '3 Guests',
            image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
            features: ['Living Room', 'Mini Bar', 'King Bed', 'Jacuzzi']
        },
        {
            id: 3,
            title: 'Poolside Garden Room',
            category: 'Garden View',
            price: 180,
            capacity: '2 Guests',
            image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
            features: ['Queen Bed', 'Direct Pool Access', 'Terrace']
        }
    ];

    // Render Amenities
    const servicesContainer = document.getElementById('services-container');
    if (servicesContainer) {
        servicesContainer.innerHTML = amenities.map(item => `
            <div class="card amenity-card">
                <div class="amenity-icon">${item.icon}</div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `).join('');
    }

    // Render Rooms
    const roomsContainer = document.getElementById('rooms-container');
    if (roomsContainer) {
        roomsContainer.innerHTML = rooms.map(room => `
            <div class="card room-card">
                <div class="room-image-wrapper">
                    <img src="${room.image}" alt="${room.title}" class="room-image">
                    <span class="room-badge">${room.category}</span>
                </div>
                <div class="room-details">
                    <div class="room-header">
                        <h3>${room.title}</h3>
                        <div class="room-price">$${room.price} <span>/ night</span></div>
                    </div>
                    <p class="room-capacity">👤 ${room.capacity}</p>
                    <ul class="room-features">
                        ${room.features.map(f => `<li>• ${f}</li>`).join('')}
                    </ul>
                    <a href="Booking.html" class="btn btn-primary btn-block">Book Room</a>
                </div>
            </div>
        `).join('');
    }

    // 3. Scroll Reveal Animation Trigger
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(section => {
        observer.observe(section);
    });
});

// Toggle mobile navigation menu
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}