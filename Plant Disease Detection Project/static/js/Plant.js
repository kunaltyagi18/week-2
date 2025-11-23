document.addEventListener("DOMContentLoaded", () => {

    const fileInput = document.getElementById("fileInput");
    const detectBtn = document.getElementById("detectBtn");
    const resetBtn = document.getElementById("resetBtn");
    const previewImage = document.getElementById("previewImage");
    const preview = document.getElementById("preview");
    const uploadSection = document.getElementById("uploadSection");
    const loadingSection = document.getElementById("loadingSection");
    const resultsSection = document.getElementById("resultsSection");
    const errorSection = document.getElementById("errorSection");
    const uploadArea = document.getElementById("uploadArea");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navMenu = document.querySelector(".nav-menu");

    let selectedFile = null;

    // ==================== NAVBAR FUNCTIONALITY ====================

    // Smooth scroll for all navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get target section ID
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Remove active class from all links
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
            }
            
            // Smooth scroll to target section
            if (targetSection) {
                const navbarHeight = 70;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Logo click - scroll to home (top)
    document.querySelector('.nav-logo').addEventListener('click', () => {
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
        
        // Set Home link as active
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelector('.nav-link[href="#home"]').classList.add('active');
        
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
        }
    });

    // Active link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Special case for top of page
        if (scrollY < 100) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            document.querySelector('.nav-link[href="#home"]').classList.add('active');
        }
    });

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Footer links smooth scroll
    document.querySelectorAll('.footer a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = 70;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== IMAGE UPLOAD & DETECTION ====================

    // Click to upload
    uploadArea.addEventListener("click", () => {
        fileInput.click();
    });

    // Drag and drop functionality
    uploadArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadArea.style.background = "#c8f7dc";
    });

    uploadArea.addEventListener("dragleave", () => {
        uploadArea.style.background = "";
    });

    uploadArea.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadArea.style.background = "";
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            selectedFile = files[0];
            showPreview(selectedFile);
        }
    });

    // File input change
    fileInput.addEventListener("change", e => {
        if (e.target.files.length > 0) {
            selectedFile = e.target.files[0];
            showPreview(selectedFile);
        }
    });

    function showPreview(file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            showError("Please upload a valid image file (JPG, PNG, JPEG)");
            return;
        }

        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
            showError("File size exceeds 10MB. Please upload a smaller image.");
            return;
        }

        const reader = new FileReader();
        reader.onload = e => {
            previewImage.src = e.target.result;
            preview.style.display = "block";
            detectBtn.disabled = false;
            errorSection.style.display = "none";
        };
        reader.readAsDataURL(file);
    }

    detectBtn.addEventListener("click", async () => {
        if (!selectedFile) return;

        let formData = new FormData();
        formData.append("file", selectedFile);

        uploadSection.style.display = "none";
        loadingSection.style.display = "block";
        errorSection.style.display = "none";

        try {
            const response = await fetch("/detect", { 
                method: "POST", 
                body: formData 
            });

            const data = await response.json();

            loadingSection.style.display = "none";

            if (data.result) {
                // Show results
                resultsSection.style.display = "block";
                document.getElementById("diseaseName").textContent = data.prediction.disease_name;
                
                // Show confidence if available
                if (data.prediction.confidence) {
                    document.getElementById("confidenceScore").textContent = 
                        `Confidence: ${data.prediction.confidence}`;
                }
                
                document.getElementById("diseaseDetail").textContent = data.prediction.disease;
                document.getElementById("causeDetail").textContent = data.prediction.cause;
                document.getElementById("cureDetail").textContent = data.prediction.cure;
                document.getElementById("resultImage").src = data.imagepath;
                resetBtn.style.display = "inline-block";

                // Smooth scroll to results
                resultsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                showError(data.message || "Failed to detect disease. Please try again.");
                uploadSection.style.display = "block";
            }
        } catch (error) {
            loadingSection.style.display = "none";
            uploadSection.style.display = "block";
            showError("Network error. Please check your connection and try again.");
            console.error("Error:", error);
        }
    });

    function showError(msg) {
        errorSection.style.display = "block";
        document.getElementById("errorMessage").textContent = msg;
        
        // Auto-hide error after 5 seconds
        setTimeout(() => {
            errorSection.style.display = "none";
        }, 5000);
    }

    resetBtn.addEventListener("click", () => {
        location.reload();
    });

});