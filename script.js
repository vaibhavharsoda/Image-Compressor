// Function to compress and save the image
function compressAndSave() {
    const imageInput = document.getElementById('imageInput');
    const file = imageInput.files[0];
    if (!file) {
        alert('Please select an image file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const image = new Image();
        image.src = e.target.result;

        image.onload = function() {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            // Set the desired width and height for the compressed image
            const maxWidth = 800;
            const maxHeight = 600;

            let width = image.width;
            let height = image.height;

            // Check if resizing is necessary
            if (width > maxWidth || height > maxHeight) {
                if (width / maxWidth > height / maxHeight) {
                    height *= maxWidth / width;
                    width = maxWidth;
                } else {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;
            context.drawImage(image, 0, 0, width, height);

            // Compress and save the image as a new file
            const compressedImage = canvas.toDataURL('image/jpeg', 0.7); // 0.7 is the compression quality (0.0 - 1.0)

            // Create a link element to download the compressed image
            const downloadLink = document.createElement('a');
            downloadLink.href = compressedImage;
            downloadLink.download = 'compressed_image.jpg';
            downloadLink.click();
        };

    };
    reader.readAsDataURL(file);
}

// Show a preview of the selected image
document.getElementById('imageInput').addEventListener('change', function() {
    const imageInput = document.getElementById('imageInput');
    const file = imageInput.files[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('preview');
        preview.src = e.target.result;
    };
    reader.readAsDataURL(file);
});