import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    area: "",
    bedrooms: "",
    bathrooms: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          area: Number(formData.area),
          bedrooms: Number(formData.bedrooms),
          bathrooms: Number(formData.bathrooms),
        }),
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();
      setPrediction(data.predicted_price);
    } catch (error) {
      console.error(error);
      alert("Unable to get prediction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          House Price Predictor
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Enter house details to estimate the price
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Area (sq.ft)
            </label>

            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="1500"
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Bedrooms
            </label>

            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              placeholder="3"
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Bathrooms
            </label>

            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              placeholder="2"
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Predicting..." : "Predict Price"}
          </button>

        </form>

        {prediction !== null && (
          <div className="mt-7 bg-gray-100 rounded-xl p-5 text-center">
            <p className="text-gray-500">Estimated Price</p>

            <h2 className="text-2xl font-bold mt-1">
              ₹{Number(prediction).toLocaleString("en-IN")}
            </h2>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;