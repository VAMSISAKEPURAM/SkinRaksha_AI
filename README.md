<div align="center">
  <h1>🧬 SkinRaksha AI</h1>
  <h3>AI-Powered Clinical-Grade Skin Health Intelligence</h3>
  
  <p>
    An advanced deep-learning platform utilizing Computer Vision to provide instant, highly accurate assessments of dermatological conditions.
  </p>

  <p>
    <a href="#features"><strong>Explore the Features</strong></a> ·
    <a href="#installation"><strong>Installation Guide</strong></a> ·
    <a href="#usage"><strong>How to Use</strong></a>
  </p>

  <br />

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/Python-3.8%2B-blue.svg?style=for-the-badge&logo=python&logoColor=white" alt="Python Version" />
    <img src="https://img.shields.io/badge/Flask-Web%20Framework-000000.svg?style=for-the-badge&logo=flask&logoColor=white" alt="Flask" />
    <img src="https://img.shields.io/badge/TensorFlow-2.x-FF6F00.svg?style=for-the-badge&logo=tensorflow&logoColor=white" alt="TensorFlow" />
    <img src="https://img.shields.io/badge/Hugging%20Face-Model%20Hub-F9AB00.svg?style=for-the-badge&logo=huggingface&logoColor=white" alt="Hugging Face" />
  </p>
</div>

---

## 📖 Overview

**SkinRaksha AI** is a state-of-the-art web application that leverages a fine-tuned **EfficientNetB4** convolutional neural network to classify 15 different skin conditions. The application allows users to upload an image of a skin irregularity and instantly returns a comprehensive, 5-point medical assessment including confidence scores, severity levels, recommended care plans, and organic/chemical medication suggestions. 

*The model is hosted on Hugging Face and dynamically downloaded upon app initialization.*

---

## ✨ Key Features

- **🔍 Early Detection**: Identifies subtle patterns and irregularities that may indicate early-stage skin conditions.
- **⚡ Real-Time Processing**: Powered by a highly optimized Flask backend, providing instant inference results.
- **📊 Actionable Reports**: Going beyond simple diagnosis, the system provides detailed severity assessment, immediate care steps, and recommended treatment protocols.
- **🔒 Privacy First**: Biometric data is processed securely in-memory. Images are analyzed and discarded without permanent storage, ensuring complete user privacy.
- **📱 Responsive UI**: A premium, "glassmorphism" inspired user interface that is fully responsive across mobile, tablet, and desktop devices.
- **☁️ Cloud-Native ML**: Seamlessly integrates with the Hugging Face Hub to pull the latest model weights (`Skin_Diseases_Classifier_EfficientNetB4_best.keras`).

---

## 🛠️ Technology Stack

### Backend & Machine Learning
- **Python**: Core programming language.
- **Flask**: Lightweight WSGI web application framework.
- **TensorFlow & Keras**: Used for loading and running predictions on the EfficientNetB4 model.
- **Hugging Face Hub**: Remote storage and versioning for the `.keras` model.
- **Pillow & NumPy**: Image processing and matrix transformations.

### Frontend
- **HTML5 & CSS3**: Custom vanilla CSS employing modern variables and flexbox/grid layouts.
- **JavaScript**: Hand-crafted vanilla JS for asynchronous file uploads, drag-and-drop mechanics, and dynamic UI updates without page reloads.
- **FontAwesome & Google Fonts**: For iconography and beautiful typography (Inter).

---

## 🦠 Supported Conditions

The model has been trained to recognize the following 15 dermatological classes:

| Categories | | |
| :--- | :--- | :--- |
| • Acne | • Dyshidrotic Eczema | • Pigmented Benign Keratosis |
| • Actinic Keratosis | • Melanoma | • Ringworm |
| • Basal Cell Carcinoma | • Nail Fungus | • Seborrheic Keratosis |
| • Chickenpox | • Nevus | • Squamous Cell Carcinoma |
| • Dermato Fibroma | • Normal Skin | • Vascular Lesion |

---

## 🚀 Installation

Follow these steps to run **SkinRaksha AI** locally.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/SkinRaksha-AI.git
cd SkinRaksha-AI
```

### 2. Create a Virtual Environment (Recommended)
```bash
python -m venv .venv
# On Windows
.venv\Scripts\activate
# On macOS/Linux
source .venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```
*Note: Make sure your system meets the requirements for `tensorflow-cpu`.*

### 4. Run the Application
```bash
python app.py
```
Upon the first run, the application will download the `EfficientNetB4` model weights from Hugging Face (~140MB). Subsequent runs will use the cached model.

The application will be available at: `http://127.0.0.1:5000/`

---

## 💻 Usage

1. Open your browser and navigate to `http://localhost:5000/`.
2. Scroll to the **AI Skin Scanner** section.
3. **Upload** an image (drag & drop or click to select) or use your device's **camera**.
4. Click **Analyze Image**.
5. Wait for the AI to process the cellular patterns.
6. Review the generated **Comprehensive Report**, which includes:
   - Predicted Disease & Confidence Score
   - Danger Level & Urgency
   - AI & Risk Explanation
   - Care Plan & Medical Recommendations

---

## 📡 API Reference

#### Predict Skin Condition

```http
  POST /predict
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `file`    | `file` | **Required.** The image file (JPG, PNG). |

**Response (JSON):**
```json
{
  "disease": "Melanoma",
  "confidence": 98.45,
  "danger_level": "High Risk",
  "severity": "Severe",
  "urgency": "Immediate medical attention required.",
  "ai_explanation": "...",
  "care_plan": "...",
  "organic_medicine": "...",
  "chemical_medicine": "..."
}
```

---

## ⚠️ Medical Disclaimer

**SkinRaksha AI** is designed for educational and preliminary screening purposes only. It does not provide a definitive medical diagnosis and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

---

<div align="center">
  <p>Built with ❤️ for better skin health.</p>
</div>
