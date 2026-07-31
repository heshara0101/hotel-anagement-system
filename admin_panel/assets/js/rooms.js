document.addEventListener('DOMContentLoaded', () => {
    // Mock database state (This will connect to Node.js / PostgreSQL API later)
    let rooms = [
        {
            id: 1,
            number: 'Room 101',
            type: 'Deluxe',
            price: 150,
            status: 'Available',
            image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=150&q=80'
        },
        {
            id: 2,
            number: 'Room 202',
            type: 'Suite',
            price: 280,
            status: 'Occupied',
            image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=150&q=80'
        }
    ];

    const tableBody = document.getElementById('rooms-table-body');
    const modal = document.getElementById('room-modal');
    const openModalBtn = document.getElementById('open-room-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const cancelModalBtn = document.getElementById('cancel-modal');
    const addRoomForm = document.getElementById('add-room-form');

    // Function to render the list of rooms into the HTML table
    function renderRooms() {
        tableBody.innerHTML = ''; // Clear current table contents

        rooms.forEach((room) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="${room.image}" alt="${room.number}" class="room-thumb"></td>
                <td><strong>${room.number}</strong></td>
                <td>${room.type}</td>
                <td>$${room.price}</td>
                <td>
                    <span class="badge ${room.status === 'Available' ? 'badge-available' : 'badge-occupied'}">
                        ${room.status}
                    </span>
                </td>
                <td>
                    <button class="btn btn-danger" onclick="deleteRoom(${room.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    // Modal Control Handlers
    const openModal = () => modal.classList.add('active');
    const closeModal = () => {
        modal.classList.remove('active');
        addRoomForm.reset();
    };

    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelModalBtn.addEventListener('click', closeModal);

    // Add New Room Submission
    addRoomForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newRoom = {
            id: Date.now(),
            number: document.getElementById('room-number').value,
            type: document.getElementById('room-type').value,
            price: Number(document.getElementById('room-price').value),
            status: 'Available',
            image: document.getElementById('room-image').value
        };

        rooms.push(newRoom);
        renderRooms();
        closeModal();
    });

    // Make deleteRoom accessible globally for table row buttons
    window.deleteRoom = function (id) {
        if (confirm('Are you sure you want to delete this room listing?')) {
            rooms = rooms.filter(room => room.id !== id);
            renderRooms();
        }
    };

    // Initial table render on load
    renderRooms();
});