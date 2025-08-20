import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";

function YieldPrediction() {
  const [inputs, setInputs] = useState({ rainfall: "", temperature: "", fertilizer: "" });
  const [prediction, setPrediction] = useState(null);
  const [model, setModel] = useState(null);

  // Load pre-trained model once
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel("/models/model.json");
      setModel(loadedModel);
      console.log("✅ Model loaded");
    };
    loadModel();
  }, []);

  const predictYield = async () => {
    if (!model) return;

    const inputTensor = tf.tensor2d([[
      parseFloat(inputs.rainfall),
      parseFloat(inputs.temperature),
      parseFloat(inputs.fertilizer)
    ]]);

    const result = model.predict(inputTensor);
    const value = (await result.data())[0];
    setPrediction(value.toFixed(2));
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl w-96 mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">🌾 AI Yield Prediction (Pre-trained)</h2>

      <input type="number" placeholder="Rainfall (mm)" className="border p-2 rounded w-full mb-2"
        onChange={(e) => setInputs({ ...inputs, rainfall: e.target.value })} />
      <input type="number" placeholder="Temperature (°C)" className="border p-2 rounded w-full mb-2"
        onChange={(e) => setInputs({ ...inputs, temperature: e.target.value })} />
      <input type="number" placeholder="Fertilizer (kg/acre)" className="border p-2 rounded w-full mb-4"
        onChange={(e) => setInputs({ ...inputs, fertilizer: e.target.value })} />

      <button onClick={predictYield} className="bg-green-600 text-white px-4 py-2 rounded-lg w-full">
        Predict Yield
      </button>

      {prediction && (
        <p className="mt-4 text-lg font-semibold">🌱 Predicted Yield: {prediction} quintals/acre</p>
      )}
    </div>
  );
}

export default YieldPrediction;
