from flask import Flask, request, jsonify
from plaid2 import Client
import os

PLAID_CLIENT_ID = os.environ.get("PLAID_CLIENT_ID")
PLAID_SECRET = os.environ.get("PLAID_SECRET")
PLAID_ENV = os.environ.get("PLAID_ENV", "sandbox")

app = Flask(__name__)
client = Client(client_id=PLAID_CLIENT_ID, secret=PLAID_SECRET, environment=PLAID_ENV)

@app.route("/get_access_token", methods=["POST"])
def get_access_token():
    public_token = request.json["public_token"]
    exchange_response = client.Item.public_token.exchange(public_token)
    access_token = exchange_response["access_token"]
    return jsonify({"access_token": access_token})

@app.route("/get_transactions", methods=["POST"])
def get_transactions():
    access_token = request.json["access_token"]
    import datetime
    start_date = (datetime.datetime.now() - datetime.timedelta(days=30)).strftime("%Y-%m-%d")
    end_date = datetime.datetime.now().strftime("%Y-%m-%d")
    response = client.Transactions.get(access_token, start_date, end_date)
    return jsonify(response["transactions"])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))