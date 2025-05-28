import os

from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS

with open('sentiment_model.pkl', 'rb') as f:
    vectorizer, model = pickle.load(f)

app = Flask(__name__)
CORS(app)
@app.route('/')
def home():
    return '✅ Sentiment Analysis API is working!'

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        text = data['text']

        # تحويل النص إلى vecteur
        vec = vectorizer.transform([text])

        # التنبؤ
        prediction = model.predict(vec)[0]

        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)