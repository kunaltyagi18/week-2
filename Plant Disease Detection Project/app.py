from flask import Flask, render_template, request, redirect, send_from_directory
import numpy as np
import json
import uuid
import os
import tensorflow as tf

# Initialize Flask app
app = Flask(__name__)

# Create folder for uploaded images if not exists
UPLOAD_FOLDER = "uploadimages"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load the trained model
MODEL_PATH = "models/plant_disease_detection_model_pwp.keras"
model = tf.keras.models.load_model(MODEL_PATH)

# Label names (classes)
label = [
 'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
 'Background_without_leaves', 'Blueberry___healthy', 'Cherry___Powdery_mildew', 'Cherry___healthy',
 'Corn___Cercospora_leaf_spot Gray_leaf_spot', 'Corn___Common_rust', 'Corn___Northern_Leaf_Blight',
 'Corn___healthy', 'Grape___Black_rot', 'Grape___Esca_(Black_Measles)',
 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
 'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
 'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight',
 'Potato___Late_blight', 'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy',
 'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy',
 'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight',
 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot',
 'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot',
 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
]

# Load extra info (causes and cures)
with open("plant_disease.json", 'r') as file:
    plant_disease = json.load(file)

# Serve uploaded images
@app.route('/uploadimages/<path:filename>')
def uploaded_images(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# Home route
@app.route('/')
def home():
    return render_template('Plant.html')

# Function to preprocess image
def extract_features(image_path):
    image = tf.keras.utils.load_img(image_path, target_size=(160, 160))
    image = tf.keras.utils.img_to_array(image)
    image = np.expand_dims(image, axis=0)
    return image

# Function to predict disease
def model_predict(image_path):
    image = extract_features(image_path)
    predictions = model.predict(image)
    index = np.argmax(predictions)
    return plant_disease[index]

# Upload + Predict route
@app.route('/upload/', methods=['POST', 'GET'])
def uploadimage():
    if request.method == "POST":
        image = request.files['img']

        # Unique filename
        unique_filename = f"{uuid.uuid4().hex}_{image.filename}"
        image_path = os.path.join(UPLOAD_FOLDER, unique_filename)
        image.save(image_path)

        # Predict disease
        prediction = model_predict(image_path)

        return render_template(
            'Plant.html',
            result=True,
            imagepath=f'/uploadimages/{unique_filename}',
            prediction=prediction
        )
    else:
        return redirect('/')

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
