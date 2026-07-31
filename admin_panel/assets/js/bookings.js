document.addEventListener('DOMContentLoaded', () => {
    // Rooms to display on calendar
    const rooms = [
        { id: '101', name: 'Room 101' },
        { id: '102', name: 'Room 102' },
        { id: '201', name: 'Suite 201' }
    ];

    // Mock Bookings Data (Will fetch from Node.js / PostgreSQL API)
    let bookings = [
        { id: 1, guest: 'Alice Smith', roomId: '101', checkInDay: 3, checkOutDay: 8, status: 'confirmed' },
        { id: 2, guest: 'Bob Jones', roomId: '102', checkInDay: 10, checkOutDay: 15, status: 'pending' },
        { id: 3, guest: 'Charlie Brown', roomId: '201', checkInDay: 14, checkOutDay: 22, status: 'confirmed' }
    ];

    const timelineHeader = document.getElementById('timeline-header');
    const timelineBody = document.getElementById('timeline-body');
    const modal = document.getElementById('booking-modal');
    const openModalBtn = document.getElementById('open-booking-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const cancelModalBtn = document.getElementById('cancel-modal');
    const addBookingForm = document.getElementById('add-booking-form');

    // 1. Build Header Days (1 to 31)
    function buildHeader() {
        timelineHeader.innerHTML = `<div class="timeline-cell room-col-header">Rooms</div>`;
        for (let day = 1; day <= 31; day++) {
            const cell = document.createElement('div');
            cell.className = 'timeline-cell';
            cell.textContent = day;
            timelineHeader.appendChild(cell);
        }
    }

    // 2. Render Timeline Grid Rows & Reservation Bars
    function renderTimeline() {
        timelineBody.innerHTML = '';

        rooms.forEach((room) => {
            const row = document.createElement('div');
            row.className = 'timeline-row';

            // Room Title Label Column
            const roomLabel = document.createElement('div');
            roomLabel.className = 'room-label';
            roomLabel.textContent = room.name;
            row.appendChild(roomLabel);

            // Empty background cells for 31 days
            for (let day = 1; day <= 31; day++) {
                const gridCell = document.createElement('div');
                gridCell.className = 'day-grid-cell';
                row.appendChild(gridCell);
            }

            // Find bookings for this specific room and calculate position
            const roomBookings = bookings.filter(b => b.roomId === room.id);

            roomBookings.forEach((booking) => {
                const bar = document.createElement('div');
                bar.className = `booking-bar ${booking.status}`;
                bar.textContent = `${booking.guest} (${booking.checkOutDay - booking.checkInDay} night/s)`;

                /* 
                  Position Calculation:
                  Col 1 = Room Title Label
                  Col 2 = Day 1
                  So Day X maps to Column Index = X + 1
                */
                const startCol = booking.checkInDay + 1;
                const spanDays = booking.checkOutDay - booking.checkInDay;

                bar.style.gridColumn = `${startCol} / span ${spanDays}`;
                
                // Allow clicking booking to cancel
                bar.addEventListener('click', () => {
                    if (confirm(`Cancel reservation for ${booking.guest}?`)) {
                        bookings = bookings.filter(b => b.id !== booking.id);
                        renderTimeline();
                    }
                });

                row.appendChild(bar);
            });

            timelineBody.appendChild(row);
        });
    }

    // Modal Handlers
    const openModal = () => modal.classList.add('active');
    const closeModal = () => {
        modal.classList.remove('active');
        addBookingForm.reset();
    };

    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelModalBtn.addEventListener('click', closeModal);

    // Create New Manual Reservation
    addBookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newBooking = {
            id: Date.now(),
            guest: document.getElementById('guest-name').value,
            roomId: document.getElementById('select-room').value,
            checkInDay: parseInt(document.getElementById('check-in').value, 10),
            checkOutDay: parseInt(document.getElementById('check-out').value, 10),
            status: 'confirmed'
        };

        if (newBooking.checkOutDay <= newBooking.checkInDay) {
            alert('Check-out day must be after check-in day!');
            return;
        }

        bookings.push(newBooking);
        renderTimeline();
        closeModal();
    });

    // Initialize Calendar
    buildHeader();
    renderTimeline();
});