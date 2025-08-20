import React, { useState } from "react";
import "./PestDetection.css";

function PestDetection() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  // Example pest info database
  const pestInfo = {
    Pest: {
      description: "Common agricultural pest that damages crops by feeding on leaves and stems.",
      prevention: "Use natural predators, apply neem oil, and maintain proper crop rotation.",
    },
    Healthy: {
      description: "The crop looks healthy with no visible pest infestation.",
      prevention: "Continue regular monitoring and good irrigation practices.",
    },
    Unknown: {
      description: "No data available for this detection.",
      prevention: "Consider consulting an expert for further inspection.",
    },
  };

  const handleDetect = async () => {
    if (!image) return alert("Please upload an image!");

    const formData = new FormData();
    formData.append("image", document.querySelector("input[type=file]").files[0]);

    try {
      const res = await fetch("http://localhost:5000/api/pest/detect", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      // ✅ Safely map predictions (but your backend is returning "detections", so adjust if needed)
      const prediction = data.predictions?.[0] || data.detections?.[0];

      if (prediction) {
        const pestName = prediction.class || "Unknown";
        setResult({
          pest: pestName,
          confidence: (prediction.confidence * 100).toFixed(2) + "%" || "N/A",
          box: prediction.bbox || {
            x: prediction.x,
            y: prediction.y,
            width: prediction.width,
            height: prediction.height,
          },
          info: pestInfo[pestName] || pestInfo["Unknown"],
        });
      } else {
        setResult({ pest: "No pest detected", confidence: "0%", info: pestInfo["Unknown"] });
      }
    } catch (err) {
      console.error("Detection error:", err);
      setResult({ pest: "Error detecting pest", confidence: "0%", info: pestInfo["Unknown"] });
    }
  };

  return (
    <div className="pest-container">
      <h2 className="pest-title">🐛 Pest Detection</h2>

      {/* Upload Section */}
      <div className="upload-box">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
        />
        {image && <img src={image} alt="Uploaded crop" className="preview-image" />}
        <button onClick={handleDetect}>Detect Pest</button>
      </div>

      {/* Results */}
      {result && (
        <div className="result-box">
          <h3>Detection Result</h3>
          <p><strong>Pest:</strong> {result.pest}</p>
          <p><strong>Confidence:</strong> {result.confidence}</p>
          {result.box && (
            <p>
              <strong>Bounding Box:</strong> x:{result.box.x}, y:{result.box.y}, 
              width:{result.box.width}, height:{result.box.height}
            </p>
          )}

          {/* Extra Info */}
          <div className="pest-info">
            <h4>ℹ️ Information</h4>
            <p><strong>Description:</strong> {result.info?.description}</p>
            <p><strong>Prevention:</strong> {result.info?.prevention}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PestDetection;
