import streamlit as st
import pandas as pd
import joblib

# Load model and encoders
model = joblib.load("skill_prediction_model.pkl")
style_encoder = joblib.load("style_encoder.pkl")
operation_encoder = joblib.load("operation_encoder.pkl")

# Page title
st.title("Operator Skill Prediction System")

st.write("Enter operator production details")

# Inputs
style = st.selectbox(
    "Style",
    style_encoder.classes_
)

line_number = st.number_input(
    "Line Number",
    min_value=1,
    max_value=20,
    value=6
)

operation = st.selectbox(
    "Operation",
    operation_encoder.classes_
)

smv = st.number_input(
    "SMV",
    min_value=0.0,
    value=0.50,
    step=0.01
)

actual_output = st.number_input(
    "Actual Output",
    min_value=0,
    value=500
)

target_output = st.number_input(
    "Target Output",
    min_value=0,
    value=600
)

efficiency = st.number_input(
    "Efficiency",
    min_value=0.0,
    value=50.0,
    step=0.01
)

if st.button("Predict Skill Level"):

    style_encoded = style_encoder.transform([style])[0]
    operation_encoded = operation_encoder.transform([operation])[0]

    input_data = pd.DataFrame({
        "Style": [style_encoded],
        "Line Number": [line_number],
        "Operation": [operation_encoded],
        "SMV": [smv],
        "Actual Output": [actual_output],
        "Target Output": [target_output],
        "Efficiency": [efficiency]
    })

    prediction = model.predict(input_data)[0]

    skill_map = {
        0: "A",
        1: "A+",
        2: "B",
        3: "C"
    }

    st.success(
        f"Predicted Skill Level: {skill_map[prediction]}"
    )