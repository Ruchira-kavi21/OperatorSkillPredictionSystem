import shap

# Load SHAP Explainer only once
from services.predictor import model


explainer = shap.TreeExplainer(model)


def generate_shap_explanation(input_df, prediction_index):

    # Generate SHAP values
    shap_values = explainer.shap_values(input_df)

    # Get SHAP values for predicted class
    class_shap_values = shap_values[0, :, prediction_index]

    feature_names = input_df.columns.tolist()

    explanation = []

    for feature, value in zip(feature_names, class_shap_values):

        explanation.append({
            "feature": feature,
            "impact": round(float(value), 4)
        })

    # Sort by absolute impact
    explanation.sort(
        key=lambda x: abs(x["impact"]),
        reverse=True
    )

    #return explanation[:5]
    # Convert feature names into business explanations

    business_names = {
        "Actual Output": "Actual Output",
        "Target Output": "Target Output",
        "Efficiency": "Operator Efficiency",
        "SMV": "Standard Minute Value (SMV)",
        "Operation": "Operation Type",
        "Style": "Garment Style",
        "Line Number": "Production Line"
    }

    final_explanation = []

    for item in explanation[:5]:

        feature = item["feature"]

        impact = item["impact"]

        if impact >= 0:direction = "increased"
        else:direction = "decreased"

        final_explanation.append({

            "feature": business_names.get(feature, feature),

            "impact": round(abs(impact), 4),

            "direction": direction
        })

    return final_explanation    