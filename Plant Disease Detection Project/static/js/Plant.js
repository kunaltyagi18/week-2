const imageInput = document.getElementById("imageInput");
const previewImg = document.getElementById("previewImg");
const loader = document.getElementById("loader");
const form = document.getElementById("uploadForm");

// Show preview before upload
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      previewImg.src = reader.result;
      previewImg.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

// Show loader during prediction
form.addEventListener("submit", () => {
  loader.style.display = "block";
});
