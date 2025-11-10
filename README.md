
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

✅ **Outcome:**
Week 2 successfully completed CNN implementation and model training. The AI model achieved high accuracy in plant disease recognition and demonstrated reliable real-time predictions for agricultural use.

