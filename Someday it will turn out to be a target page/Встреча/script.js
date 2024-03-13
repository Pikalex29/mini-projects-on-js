// Function to handle the button hover
function handleHover() {
    // Get the resume button and the photo elements
    const resumeButton = document.querySelector('.resume-button');
    const photo = document.querySelector('.photo');

    // Add event listener for mouseenter event
    resumeButton.addEventListener('mouseenter', () => {
        // Hide the resume button
        resumeButton.style.display = 'none';
        // Show the photo
        photo.style.display = 'block';
    });

    // Add event listener for mouseleave event
    photo.addEventListener('mouseleave', () => {
        // Hide the photo
        photo.style.display = 'none';
        // Show the resume button
        resumeButton.style.display = 'flex';
    });

    // Get the video element
    const video = document.getElementById('video');

}

// Call the handleHover function when the DOM is loaded
document.addEventListener("DOMContentLoaded", handleHover);