import joblib
import pandas as pd

# ==========================
# Load Model and Encoders
# ==========================

model = joblib.load("ml_models/skill_prediction_model.pkl")
style_encoder = joblib.load("ml_models/style_encoder.pkl")
operation_encoder = joblib.load("ml_models/operation_encoder.pkl")

# ==========================
# Skill Label Mapping
# ==========================

skill_map = {
    0: "A",
    1: "A+",
    2: "B",
    3: "C"
}


# ==========================
# Prediction Function
# ==========================

def predict_skill(data):

    try:
        # Encode categorical features
        style = style_encoder.transform([data["style"]])[0]
        operation = operation_encoder.transform([data["operation"]])[0]

        # Create DataFrame
        input_df = pd.DataFrame([{
            "Style": style,
            "Line Number": data["line_number"],
            "Operation": operation,
            "SMV": data["smv"],
            "Actual Output": data["actual_output"],
            "Target Output": data["target_output"],
            "Efficiency": data["efficiency"]
        }])

        # Prediction
        prediction = model.predict(input_df)[0]

        # Prediction Confidence
        confidence = model.predict_proba(input_df).max()

        return {
            "success": True,
            "prediction": skill_map[prediction],
            "prediction_index": int(prediction),
            "confidence": round(float(confidence) * 100, 2),
            "input_df": input_df
        }

    except Exception as error: return {
        "success": False,
        "message": str(error)
    }

    
# ==========================
# Get Metadata
# ==========================

def get_metadata():

    return {
        "styles": style_encoder.classes_.tolist(),
        "operations": operation_encoder.classes_.tolist()
    }

# probabilities = model.predict_proba(input_df)

# print(probabilities)

