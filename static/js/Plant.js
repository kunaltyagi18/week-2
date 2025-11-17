document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('imageInput');
    const previewBox = document.getElementById('previewBox');
    const previewImage = document.getElementById('previewImg');
    const fileName = document.getElementById('fileName');
    const buttonGroup = document.getElementById('buttonGroup');
    const detectBtn = document.getElementById('detectBtn');
    const uploadForm = document.getElementById('uploadForm');
    const warningMessage = document.getElementById('warningMessage');

    if (!uploadArea || !fileInput) return;

    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', handleFileSelect);

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (validateFile(file)) {
                fileInput.files = files;
                handleFileSelect();
            }
        }
    });

    function handleFileSelect() {
        const file = fileInput.files[0];

        if (!file) return;

        if (!validateFile(file)) {
            showWarning('Please select a valid image file (PNG, JPG, JPEG)');
            fileInput.value = '';
            return;
        }

        hideWarning();

        fileName.textContent = file.name;

        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            uploadArea.style.display = 'none';
            previewBox.style.display = 'block';
            buttonGroup.style.display = 'flex';
        };
        reader.readAsDataURL(file);
    }

    function validateFile(file) {
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        const maxSize = 10 * 1024 * 1024;

        if (!validTypes.includes(file.type)) {
            return false;
        }

        if (file.size > maxSize) {
            showWarning('File size must be less than 10MB');
            return false;
        }

        return true;
    }

    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            if (!fileInput.files || fileInput.files.length === 0) {
                e.preventDefault();
                showWarning('Please select an image first');
                return false;
            }

            detectBtn.disabled = true;
            detectBtn.innerHTML = `
                <svg class="btn-icon spinning" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 12a9 9 0 11-6.219-8.56" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Analyzing...
            `;

            hideWarning();
        });
    }

    function showWarning(message) {
        warningMessage.textContent = message;
        warningMessage.style.display = 'block';
    }

    function hideWarning() {
        warningMessage.style.display = 'none';
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .spinning {
            animation: spin 1s linear infinite;
        }
    `;
    document.head.appendChild(style);
});
