from flask import Flask, render_template, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.efficientnet import preprocess_input
import numpy as np
from PIL import Image
from skin_diseases import skin_diseases
import io
from huggingface_hub import hf_hub_download
from tensorflow.keras.models import load_model

app = Flask(__name__)

# Load Model
print("Downloading model from Hugging Face...")

MODEL_PATH = hf_hub_download(
    repo_id="Vamsi232/skin-disease-efficientnet-b4",
    filename="Skin_Diseases_Classifier_EfficientNetB4_best.keras"
)

print(f"Model downloaded to: {MODEL_PATH}")

model = load_model(MODEL_PATH)

print("Model loaded successfully.")

CLASS_NAMES = [
 'Acne', 'Actinic Keratosis', 'Basal Cell Carcinoma', 'Chickenpox', 
 'Dermato Fibroma', 'Dyshidrotic Eczema', 'Melanoma', 'Nail Fungus', 
 'Nevus', 'Normal Skin', 'Pigmented Benign Keratosis', 'Ringworm', 
 'Seborrheic Keratosis', 'Squamous Cell Carcinoma', 'Vascular Lesion'
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
        
    try:
        # Process image in-memory
        img = Image.open(file.stream).convert('RGB')
        img = img.resize((300, 300))
        
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)
        
        # Prediction
        prediction = model.predict(img_array)
        class_index = np.argmax(prediction[0])
        confidence = float(np.max(prediction[0]) * 100)
        predicted_disease = CLASS_NAMES[class_index]
        
        # Get details
        details = skin_diseases.get(predicted_disease, {})
        
        return jsonify({
            'disease': predicted_disease,
            'confidence': round(confidence, 2),
            'danger_level': details.get('danger_level', 'Unknown'),
            'severity': details.get('severity', 'Unknown'),
            'urgency': details.get('urgency', 'Unknown'),
            'ai_explanation': details.get('ai_explanation', 'No explanation available.'),
            'risk_explanation': details.get('risk_explanation', 'No risk info available.'),
            'stages': details.get('stages', 'Unknown'),
            'organic_medicine': details.get('organic_medicine', 'None'),
            'chemical_medicine': details.get('chemical_medicine', 'None'),
            'care_plan': details.get('care_plan', 'No care plan content.'),
            'follow_up': details.get('follow_up', 'No follow-up info.'),
            'education': details.get('education', 'No educational content.'),
            'prevention': details.get('prevention', 'No prevention info.'),
            'privacy_note': details.get('privacy_note', 'Data processed securely.')
        })
        
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)



