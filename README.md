# 🌿 Plant Disease Detection System

A deep learning–based web application that detects plant diseases from leaf images with high accuracy.  
This project uses a pre-trained CNN model integrated with a simple web interface for easy image upload and disease prediction.

---

## 🚀 Model Setup Instructions

To use this project, you must download the pre-trained model from Google Drive and place it in the `models` directory.

### 🔹 Steps to Set Up the Model

1. **Download the Model**
   - Click [here](https://drive.google.com/file/d/1Ond7UzrNOfdAXWedjlZr2sDXYU6MRBuj/view?usp=sharing) to download the model file.

2. **Create the Models Folder**
   - Go to your project’s root directory.
   - Create a folder named `models` (if it doesn’t already exist):
     ```bash
     mkdir models
     ```

3. **Move the Model into the Folder**
   - Place the downloaded model file inside the `models` directory:
     ```bash
     mv /path/to/downloaded/model models/
     ```
     Replace `/path/to/downloaded/model` with your actual download path.

4. **Verify the Setup**
   - Make sure the model file is in the correct folder:
     ```bash
     ls models
     ```
     You should see the model file listed.

---

## ⚙️ Usage Instructions

1. **Specify the Model Path**
   - Open `app.py` in your code editor.
   - Locate this line:
     ```python
     tf.keras.models.load_model("")
     ```
   - Update it with the correct model path:
     ```python
     tf.keras.models.load_model("models/your_model_file.keras")
     ```
     Replace `your_model_file.keras` with your actual model filename.

2. **Run the Application**
   - Open a terminal in your project directory.
   - Start the server:
     ```bash
     python app.py
     ```

3. **Access the Web App**
   - Once the server is running, open the local URL shown in the terminal (e.g., `http://127.0.0.1:5000/`) in your browser.
   - Upload a plant leaf image to detect the disease.

---

## 🧠 Features

- 🌱 Detects multiple plant diseases using a deep learning model  
- 📸 Upload image directly from your device  
- 📊 Displays disease name, confidence score, and care suggestions  
- 🔁 Reset button to analyze a new image  
- 💻 Future-ready for Streamlit or Flask integration  

---

## 📂 Project Structure

