import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Load dataset
data = pd.read_csv("house_prices.csv")

# Features
X = data[["area", "bedrooms", "bathrooms"]]

# Target
y = data["price"]

# Create model
model = LinearRegression()

# Train model
model.fit(X, y)

# Save trained model
joblib.dump(model, "model.pkl")

print("Model trained successfully!")
print("model.pkl created successfully!")