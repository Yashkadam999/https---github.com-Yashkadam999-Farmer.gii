import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

function YieldPrediction() {
  const [inputs, setInputs] = useState({
    rainfall: "",
    temperature: "",
    fertilizer: "",
  });
  const [prediction, setPrediction] = useState(null);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load model on component mount
  useEffect(() => {
    const loadModel = async () => {
      try {
        // ✅ Public URL always points to "public" folder
        const modelUrl = "/yield_model_js/model.json";

        const loadedModel = await tf.loadLayersModel(modelUrl);
        setModel(loadedModel);
        setLoading(false);
        console.log("✅ Model loaded successfully");
      } catch (err) {
        console.error("❌ Error loading model:", err);
        setError("⚠️ Could not load AI model. Please check model files.");
        setLoading(false);
      }
    };
    loadModel();
  }, []);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    if (!model) {
      alert("Model not loaded yet!");
      return;
    }

    const inputTensor = tf.tensor2d([
      [
        parseFloat(inputs.rainfall) || 0,
        parseFloat(inputs.temperature) || 0,
        parseFloat(inputs.fertilizer) || 0,
      ],
    ]);

    const output = model.predict(inputTensor);
    const yieldValue = (await output.data())[0];
    setPrediction(yieldValue.toFixed(2));
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl w-96 mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">🌾 AI Yield Prediction</h2>

      {loading ? (
        <p className="text-gray-600">⏳ Loading AI Model...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <>
          <input
            type="number"
            name="rainfall"
            placeholder="Rainfall (mm)"
            className="border p-2 rounded w-full mb-2"
            onChange={handleChange}
          />
          <input
            type="number"
            name="temperature"
            placeholder="Temperature (°C)"
            className="border p-2 rounded w-full mb-2"
            onChange={handleChange}
          />
          <input
            type="number"
            name="fertilizer"
            placeholder="Fertilizer (kg/acre)"
            className="border p-2 rounded w-full mb-4"
            onChange={handleChange}
          />

          <button
            onClick={handlePredict}
            className="bg-green-600 text-white px-4 py-2 rounded-lg w-full"
          >
            Predict Yield
          </button>

          {prediction && (
            <p className="mt-4 text-lg font-semibold">
              🌱 Predicted Yield: {prediction} quintals/acre
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default YieldPrediction;
