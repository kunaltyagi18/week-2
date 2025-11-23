from flask import Flask, render_template, request, jsonify, send_from_directory
import numpy as np
import tensorflow as tf
import uuid
import os
import json

app = Flask(__name__)

UPLOAD_FOLDER = "uploadimages"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load model
try:
    model = tf.keras.models.load_model("models/plant_disease_detection_model_pwp.keras")
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"⚠️ Model not found: {e}")
    model = None

# Labels
labels = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Background_without_leaves', 'Blueberry___healthy', 'Cherry___Powdery_mildew', 'Cherry___healthy',
    'Corn___Cercospora_leaf_spot Gray_leaf_spot', 'Corn___Common_rust',
    'Corn___Northern_Leaf_Blight', 'Corn___healthy', 'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
    'Grape___healthy', 'Orange___Haunglongbing_(Citrus_greening)',
    'Peach___Bacterial_spot', 'Peach___healthy',
    'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy',
    'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy',
    'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew',
    'Strawberry___Leaf_scorch', 'Strawberry___healthy',
    'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight',
    'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
]

# Load disease information
try:
    with open("plant_disease.json", encoding='utf-8') as f:
        plant_data = json.load(f)
    print("✅ Disease data loaded successfully!")
except Exception as e:
    print(f"⚠️ JSON not found: {e}")
    plant_data = []


@app.route("/")
def home():
    return render_template("Plant.html")


@app.route("/uploadimages/<filename>")
def uploaded(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


def preprocess(path):
    img = tf.keras.utils.load_img(path, target_size=(160, 160))
    img = tf.keras.utils.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    return img


@app.route("/detect", methods=["POST"])
def detect():
    try:
        if model is None:
            return jsonify({
                "result": False, 
                "message": "Model file not found. Please add the .keras model file in 'models' folder."
            })

        file = request.files["file"]

        if not file:
            return jsonify({"result": False, "message": "No file uploaded"})

        unique_name = f"{uuid.uuid4().hex}_{file.filename}"
        path = os.path.join(UPLOAD_FOLDER, unique_name)
        file.save(path)

        img = preprocess(path)
        pred = model.predict(img)
        idx = np.argmax(pred)
        confidence = float(np.max(pred) * 100)

        disease_info = plant_data[idx] if idx < len(plant_data) else {
            "name": labels[idx],
            "cause": "Information not available",
            "cure": "Consult an agricultural expert"
        }

        return jsonify({
            "result": True,
            "prediction": {
                "disease_name": disease_info["name"],
                "disease": disease_info["name"],
                "cause": disease_info["cause"],
                "cure": disease_info["cure"],
                "confidence": f"{confidence:.2f}%"
            },
            "imagepath": f"/uploadimages/{unique_name}"
        })

    except Exception as e:
        return jsonify({"result": False, "message": f"Error: {str(e)}"})


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)