import os
import io
import numpy as np
import cv2
from flask import Flask, request
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.vgg16 import preprocess_input, decode_predictions

#The CCC from "Load&Training.py"
def custom_categorical_crossentropy(y_true, y_pred):
    # Cast y_true to float32 to match data type of y_pred
    y_true = tf.cast(y_true, tf.float32)

    # Ensure that the input is in the correct range (avoid log(0))
    epsilon = tf.keras.backend.epsilon()
    y_pred = tf.clip_by_value(y_pred, epsilon, 1 - epsilon)

    # Calculate categorical cross-entropy loss
    loss = -tf.reduce_sum(y_true * tf.math.log(y_pred), axis=-1)

    return loss



CLASSES = np.array([
    'Pepper__bell___Bacterial_spot', 'Pepper__bell___healthy',
    'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy',
    'Tomato_Bacterial_spot', 'Tomato_Early_blight', 'Tomato_Late_blight',
    'Tomato_Leaf_Mold', 'Tomato_Septoria_leaf_spot',
    'Tomato_Spider_mites_Two_spotted_spider_mite', 'Tomato__Target_Spot',
    'Tomato__Tomato_YellowLeaf__Curl_Virus', 'Tomato__Tomato_mosaic_virus',
    'Tomato_healthy'
])


#Define app
app = Flask(__name__)

#Loadin in the pretrained app.
model = load_model("model/best_model.h5", custom_objects={"custom_categorical_crossentropy": custom_categorical_crossentropy})



# Function to preprocess the image
def preprocess_image(file):
    # Read the file content as bytes
    file_content = file.read()

    # Convert the bytes to a numpy array
    nparr = np.frombuffer(file_content, np.uint8)

    # Decode the numpy array into an OpenCV image
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Resize and normalize the image
    img = cv2.resize(img, (128, 128))
    img = img.astype("float") / 255.0
    img = np.expand_dims(img, axis=0)

    return img



@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return 'No file part'

    file = request.files['file']
    if file.filename == '':
        return 'No selected file'

    if file:
        # Load the image
        img = preprocess_image(file)
        # Run image though ML model
        predictions = model.predict(img)
        # Get the predicted class index
        predicted_class_index = np.argmax(predictions)
        # Use the class name from the CLASSES list
        predicted_class = CLASSES[predicted_class_index]
        # Get the predicted probability
        predicted_probability = predictions[0][predicted_class_index]
        return f'Predicted Class: {predicted_class}, Certainty: {predicted_probability:.2f}'


if __name__ == '__main__':
    app.run(debug=True)