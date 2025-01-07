import numpy as np
import pickle
import os
import cv2
from os import listdir
from sklearn.preprocessing import LabelBinarizer
from keras.models import Sequential
from tensorflow.keras.layers import BatchNormalization, MaxPooling2D, Conv2D, LeakyReLU
from keras.layers.core import Activation, Flatten, Dropout, Dense
from tensorflow.keras.callbacks import EarlyStopping
from keras import backend as K
from keras.preprocessing.image import ImageDataGenerator
from keras.optimizers import Adam
from keras.preprocessing import image
from tensorflow.keras.utils import img_to_array
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
from keras.callbacks import ModelCheckpoint
from sklearn.metrics import confusion_matrix
import seaborn as sns
from PIL import Image


EPOCHS = 40
INIT_LR = 0.0001
BS = 32
default_image_size = tuple((128, 128))
image_size = 0
directory_root = 'C:\\Users\\krage\\PycharmProjects\\dag1ML\\venv\\plant_disease_classifier_project\\Neural Network\\input'
width=128
height=128
depth=3
os.environ["TF_GPU_ALLOCATOR"] = "cuda_malloc_async"

def convert_image_to_array(image_dir):
    try:
        image = cv2.imread(image_dir)
        if image is not None :
            image = cv2.resize(image, default_image_size)
            return img_to_array(image)
        else :
            return np.array([])
    except Exception as e:
        print(f"Error : {e}")
        return None

image_list, label_list = [], []
try:
    print("[INFO] Loading images ...")
    root_dir = listdir(directory_root)
    root_dir = [directory for directory in root_dir if directory != ".DS_Store"]

    for plant_folder in root_dir:
        plant_disease_folder_list = listdir(f"{directory_root}/{plant_folder}")
        plant_disease_folder_list = [folder for folder in plant_disease_folder_list if folder != ".DS_Store"]

        for plant_disease_folder in plant_disease_folder_list:
            print(f"[INFO] Processing {plant_disease_folder} ...")
            plant_disease_image_list = listdir(f"{directory_root}/{plant_folder}/{plant_disease_folder}/")
            plant_disease_image_list = [image for image in plant_disease_image_list if image != ".DS_Store"]

            for image in plant_disease_image_list[:200]:
                image_directory = f"{directory_root}/{plant_folder}/{plant_disease_folder}/{image}"
                if image_directory.endswith(".jpg") or image_directory.endswith(".JPG"):
                    image_list.append(convert_image_to_array(image_directory))
                    label_list.append(plant_disease_folder)
    print("[INFO] Image loading completed")
except Exception as e:
    print(f"Error: {e}")

image_size = len(image_list)


label_binarizer = LabelBinarizer()
image_labels = label_binarizer.fit_transform(label_list)
pickle.dump(label_binarizer,open('label_transform.pkl', 'wb'))
n_classes = len(label_binarizer.classes_)

print(image_labels)
print(np.unique(image_labels))
# Sort the class labels alphabetically
#sorted_class_labels = sorted(label_binarizer.classes_)

# Replace the label_binarizer.classes_ with the sorted list

n_classes = 15

np_image_list = np.array(image_list, dtype=np.float16) / 225.0

print(label_binarizer.classes_)

print("[INFO] Spliting data to train, test")
x_train, x_test, y_train, y_test = train_test_split(np_image_list, image_labels, test_size=0.2, random_state = 42)

#trying default settings.
aug = ImageDataGenerator()

inputShape = (height, width, depth)
chanDim = -1
if K.image_data_format() == "channels_first":
    inputShape = (depth, height, width)
    chanDim = 1

model = Sequential([
    Conv2D(32, (5, 5), padding="same", input_shape=inputShape, activation=LeakyReLU()),
    BatchNormalization(),
        MaxPooling2D(pool_size=(2, 2)),
    Dropout(0.25),

    Conv2D(64, (5, 5), padding="same", activation=LeakyReLU()),
    Conv2D(64, (5, 5), padding="same", activation=LeakyReLU()),
    MaxPooling2D(pool_size=(2, 2)),
    Dropout(0.25),

    Conv2D(128, (5, 5), padding="same", activation=LeakyReLU()),
    Conv2D(128, (5, 5), padding="same", activation=LeakyReLU()),
    MaxPooling2D(pool_size=(2, 2)),
    Dropout(0.25),

    Conv2D(256, (5, 5), padding="same", activation=LeakyReLU()),
    Conv2D(256, (5, 5), padding="same", activation=LeakyReLU()),
    MaxPooling2D(pool_size=(2, 2)),
    Dropout(0.25),

    Flatten(),
    Dense(1024, activation=LeakyReLU()),
    BatchNormalization(),
    Dropout(0.5),

    Dense(n_classes, activation="softmax")
])

visualkeras.layered_view(model).show()


model.summary()

import tensorflow as tf

def custom_categorical_crossentropy(y_true, y_pred):
    # Cast y_true to float32 to match data type of y_pred
    y_true = tf.cast(y_true, tf.float32)

    # Ensure that the input is in the correct range (avoid log(0))
    epsilon = tf.keras.backend.epsilon()
    y_pred = tf.clip_by_value(y_pred, epsilon, 1 - epsilon)

    # Calculate categorical cross-entropy loss
    loss = -tf.reduce_sum(y_true * tf.math.log(y_pred), axis=-1)

    return loss

opt = Adam(learning_rate=INIT_LR, decay=INIT_LR / EPOCHS)
# distribution
model.compile(loss=custom_categorical_crossentropy, optimizer=opt,metrics=["accuracy"])
# train the network
print("[INFO] training network...")

early_stopping = EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)
model_checkpoint = ModelCheckpoint("best_model.h5", save_best_only=True, monitor='val_loss', mode='min', verbose=1)
callbacks = [early_stopping, model_checkpoint]

history = model.fit(
    aug.flow(x_train, y_train, batch_size=BS),
    validation_data=(x_test, y_test),
    steps_per_epoch=len(x_train) // BS,
    epochs=EPOCHS, verbose=1,
    callbacks=callbacks
    )

acc = history.history['accuracy']
val_acc = history.history['val_accuracy']
loss = history.history['loss']
val_loss = history.history['val_loss']
epochs = range(1, len(acc) + 1)
#Train and validation accuracy
plt.plot(epochs, acc, 'b', label='Training accurarcy')
plt.plot(epochs, val_acc, 'r', label='Validation accurarcy')
plt.title('Training and Validation accurarcy')
plt.legend()

plt.figure()
#Train and validation loss
plt.plot(epochs, loss, 'b', label='Training loss')
plt.plot(epochs, val_loss, 'r', label='Validation loss')
plt.title('Training and Validation loss')
plt.legend()
plt.show()

print("[INFO] Calculating model accuracy")
scores = model.evaluate(x_test, y_test)
print(f"Test Accuracy: {scores[1]*100}")

y_pred = model.predict(x_test)
y_pred_classes = np.argmax(y_pred, axis=1)
y_true_classes = np.argmax(y_test, axis=1)

# Create a confusion matrix
confusion_mtx = confusion_matrix(y_true_classes, y_pred_classes)

# Plot the confusion matrix
plt.figure(figsize=(8, 6))
sns.heatmap(confusion_mtx, annot=True, fmt='d', cmap='Blues', xticklabels=label_binarizer.classes_, yticklabels=label_binarizer.classes_)
plt.xlabel('Predicted')
plt.ylabel('True')
plt.title('Confusion Matrix')
plt.show()


# save the model to disk if the accuracy is good enough...
if(scores[1]*100>50):
    print("[INFO] Saving model...")
    pickle.dump(model,open('cnn_model.pkl', 'wb'))
else:
    print("Score too low to save..")


CLASSES = np.array(['Pepper__bell___Bacterial_spot', 'Pepper__bell___healthy', 'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy', 'Tomato_Bacterial_spot', 'Tomato_Early_blight', 'Tomato_Late_blight', 'Tomato_Leaf_Mold', 'Tomato_Septoria_leaf_spot', 'Tomato_Spider_mites_Two_spotted_spider_mite', 'Tomato__Target_Spot', 'Tomato__Tomato_YellowLeaf__Curl_Virus', 'Tomato__Tomato_mosaic_virus', 'Tomato_healthy'])

preds = model.predict(x_test)
preds_single =CLASSES[np.argmax(preds, axis = -1)]
actual_single = CLASSES[np.argmax(y_test, axis = -1)]

n_to_show=25
indices = np.random.choice(range(len(x_test)), n_to_show)

print(indices)


# Create a figure for the predicted vs actual images
fig = plt.figure(figsize=(20, 5))  # Adjust the figure size as needed
fig.subplots_adjust(hspace=0.8, wspace=0.6, left=0.1, right=0.9, top=0.9, bottom=0.1)  # Adjust spacing

columns = 4
rows = n_to_show // columns + 1

for i, idx in enumerate(indices):
    img_array = (x_test[idx] * 255).astype('uint8')  # Convert back to uint8
    img = Image.fromarray(img_array)

    ax = fig.add_subplot(rows, columns, i + 1)
    ax.axis('off')
    ax.text(0.5, -0.35, 'pred = ' + str(preds_single[idx]), fontsize=10, ha='center', transform=ax.transAxes)
    ax.text(0.5, -0.7, 'act = ' + str(actual_single[idx]), fontsize=10, ha='center', transform=ax.transAxes)
    ax.imshow(img)

plt.show()
