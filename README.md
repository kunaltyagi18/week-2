
## 🧩 **Week 1 – Design Phase Summary**

### 🧠 Problem Statement

Agriculture is the backbone of many economies, but farmers often face major crop losses due to plant diseases. Manual disease detection is time-consuming, error-prone, and requires expert knowledge.
To overcome this challenge, the project aims to develop an **AI-based Plant Disease Detection System** that can automatically identify plant diseases from leaf images using **Deep Learning (CNN)** models.

---

### 💡 Solution Approach

An intelligent system is proposed that uses **Convolutional Neural Networks (CNNs)** to detect and classify plant diseases from leaf images.
The system analyzes visual patterns such as color, texture, and leaf shape to determine the disease type and suggest possible treatments.
This solution supports **early disease detection**, helping farmers take timely preventive measures.

---

### 🗂️ Dataset Information

**Dataset Name:** PlantVillage Dataset
**Source:** Kaggle (PlantVillage – Plant Disease Classification Dataset)
**Description:** Contains over 80,000 images of healthy and diseased plant leaves across various species like tomato, potato, and maize.
**Classes:** Includes multiple disease categories such as early blight, late blight, and leaf spot.
**Purpose:** To train and test deep learning models for identifying and classifying plant diseases accurately.

---

### 🧱 Design Activities

* Selected and analyzed the PlantVillage dataset for class distribution.
* Designed a CNN model with convolution, pooling, and dense layers.
* Decided framework: **TensorFlow/Keras** for model training.
* Planned preprocessing: image resizing, normalization, and data augmentation (rotation, flipping).
* Chose **Google Colab** for training due to GPU acceleration support.

✅ **Outcome:**
Week 1 successfully completed dataset analysis, CNN architecture design, and workflow planning for model implementation.

---

## 💻 **Week 2 – Implementation Phase Summary**

### ⚙️ Implementation Overview

During Week 2, the designed CNN model was implemented and trained using the **PlantVillage dataset** on **Google Colab** with GPU support.
The model was built using TensorFlow/Keras and trained to classify plant leaf diseases accurately.

---

### 🧩 Implementation Steps

1. Imported and preprocessed dataset (image resizing, normalization, augmentation).
2. Used `ImageDataGenerator` for efficient batch processing.
3. Built the CNN model using multiple `Conv2D`, `MaxPooling2D`, `Flatten`, and `Dense` layers.
4. Added **Dropout layers** to prevent overfitting.
5. Compiled the model with **Adam optimizer** and **categorical crossentropy** loss.
6. Trained the model for multiple epochs while monitoring accuracy and loss graphs.
7. Tested the model using unseen images to verify real-time predictions.

---

### 📊 Results

* **Training Accuracy:** 95.6%
* **Validation Accuracy:** 92.3%
* **Model Saved As:** `plant_disease_model.h5`
* **Sample Prediction Output:** Tomato Leaf Blight – 97% Confidence
* Displayed results using `matplotlib` (`plt.imshow()`).

---

### 🧾 Files Added to GitHub

* `Plant_Disease_Week2_Implementation.ipynb` – Implementation notebook
* `model_link.txt` – Google Drive link for trained model
* `accuracy_loss_graph.png` – Training visualization
* `sample_prediction.png` – Example disease detection result

---

🌿 Week 3 – Integration & Deployment Phase Summary
🚀 Overview

Week 3 focused on integrating the trained CNN model with a simple, user-friendly web application. The aim was to allow users to upload plant leaf images and get disease predictions instantly through a clean UI. The Flask backend was connected with the frontend to deliver real-time detection.

🔗 System Integration

The system was divided into two major parts:

1️⃣ Backend (Flask Server)

Loads the trained model: plant_disease_detection_model_pwp.keras

Preprocesses uploaded images (resize → normalize → convert array).

Passes the image to the CNN model for prediction.

Returns:

Predicted crop

Disease name

Confidence percentage

2️⃣ Frontend (HTML + CSS + JavaScript)

A simple and clean student-level UI was developed with:

Image upload section

Preview of uploaded image

Result box with prediction

Reset button to clear results and upload a new image

The goal was to keep the design simple, responsive, and visually clean — suitable for a final-year student project.

🧑‍💻 Week 3 Activities
🔧 1. Flask Backend Development

Created API endpoint: /predict

Implemented image reading using PIL

Added preprocessing code for:

Resizing (128×128)

Expanding array dimension

Converting to tensor

Loaded and used the CNN model for prediction

Mapped predicted index → disease name

Returned result in JSON format

🎨 2. Frontend Integration

Developed Plant.html inside /templates

Created custom UI using Plant.css

Wrote JavaScript (Plant.js) to:

Upload leaf images

Show preview

Send request to Flask server using fetch()

Display prediction result

Reset form

🧪 3. End-to-End Testing

Tested the complete flow:

Step	Status
Uploading image	✅ Working
Sending to Flask backend	✅ Working
Receiving prediction	✅ Accurate
Reset and new upload	✅ Working

The system correctly predicted diseases such as:

Tomato Early Blight

Pepper Bell Bacterial Spot

Potato Late Blight

Healthy Leaf

📊 Week 3 Results

Model Test Accuracy: ⭐ 92.49%

Backend Response Time: ~0.5 sec per prediction

Frontend UI: Clean, responsive, and easy-to-use

Deployment Mode: Local Flask server

Prototype Completed: Yes

The system is now capable of:
✔ Uploading plant leaf images
✔ Processing them using the trained CNN model
✔ Displaying disease name + confidence
✔ Handling multiple predictions with reset

📝 Files Added in Week 3
/templates/
   └── Plant.html
/static/css/
   └── Plant.css
/static/js/
   └── Plant.js
/models/
   └── plant_disease_detection_model_pwp.keras
app.py
README.md (updated)

🎯 Outcome – Week 3 Successfully Completed

Week 3 marked the completion of full system integration, bringing together the trained AI model and the user-friendly frontend interface. The project now works as a functional Plant Disease Detection System ready for demonstration, testing, and further deployment.
