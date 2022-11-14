# Importing necessary libraries
import uvicorn # The uvicorn library is used to create a server having a host and port of your preference for communicating with our API via HTTP requests and responses.
import pickle #The pickle library is used to load up our trained model.
from pydantic import BaseModel #The BaseModel is used for defining our API request parameters (sending the right data types to our trained machine learning model).
from fastapi import FastAPI # The FastAPI library helps us define the routes and the functions a route will run when accessed by a client.
from fastapi.middleware.cors import CORSMiddleware  #he CORSMiddleware helps us define the domains that will get resources from our API.

# Initializing the fast API server
app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Loading up the trained model
model = pickle.load(open('../model/housing_forest.pkl', 'rb'))

# Defining the model input types
class House(BaseModel):
    income: float
    house_age: float
    rooms: float
    bedrooms: float
    occupants: float
    
 # Setting up the home route
@app.get("/")
def read_root():
    return {"data": "Welcome to online house value prediction model"}

# Setting up the prediction route
@app.post("/prediction/")
async def get_predict(data: House):
    sample = [[
        data.income,
        data.house_age,
        data.rooms,
        data.bedrooms,
        data.occupants
    ]]

    house_value = model.predict(sample).tolist()[0]

    #preddres = 'Predicted value of the house in Califonia is $ ' + str(house_value)
    predres = 'Predicted value of the house in Califonia is :$ {:.3f}'.format(house_value)
    return {
        "data":  {
           'prediction':  predres }
    }



# Configuring the server host and port
if __name__ == '__main__':
    uvicorn.run(app, port=8080, host='0.0.0.0')