from flask import Flask, request, jsonify, make_response
import openai
import os
import logging

from flask_cors import CORS

app = Flask(__name__)
CORS(app)


class OpenAIFacade:
    def __init__(self):
        self.client = openai.OpenAI(api_key=os.environ["OPENAI_API_KEY"])
        self.system_message = (
            "You will provide 3 tips for a stock in this way: 'tip1... \n tip2... \n tip3....'. please keep in mind tip.. is just a placeholder for the actual tip dont actually return that "
            "new line-separated like that. In one of the tips, you must indicate if they should buy this stock or not THIS IS REALLY IMPORTANT, "
            "given some data about it. "
        )

    def parse_response(self, response):
        try:
            tips = [tip.strip() for tip in response.split("\n") if tip.strip()]
            
            data = {"message": tips, "code": "SUCCESS"}
            return make_response(jsonify(data), 200)

        except Exception as e:
            logging.error(f"Error parsing response: {e}")
            return make_response(jsonify({"message": "Error parsing response", "code": "ERROR"}), 500)


    def get_gpt4_response(self, prompt):
        try:
            if not isinstance(prompt, str):
                raise ValueError("The prompt must be a string.")

            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": self.system_message},
                    {"role": "user", "content": prompt},
                ],
            )
            content = response.choices[0].message.content.strip()
            return self.parse_response(content)

        except Exception as e:
            logging.error(f"Failed to get GPT-4 response from OpenAI: {e}")
            data = {"message": f"Failed to return LLM Response: {e}", "code": "ERROR"}
            return make_response(jsonify(data), 500) 


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/getAI", methods=["POST"])
def get_ai_response():
    data = str(request.get_json())
    print(data)
    openai_facade = OpenAIFacade()

    return openai_facade.get_gpt4_response(data)


@app.route("/getData/<ticker>")
def get_data(ticker):
    stock_data = {
        "AAPL": [
            {"date": "2024-10-01", "open": 150, "high": 155, "low": 148, "close": 152, "volume": 3000},
            {"date": "2024-10-02", "open": 152, "high": 160, "low": 151, "close": 157, "volume": 2800},
            {"date": "2024-10-03", "open": 157, "high": 162, "low": 156, "close": 161, "volume": 3200},
            {"date": "2024-10-04", "open": 161, "high": 165, "low": 160, "close": 163, "volume": 3500},
            {"date": "2024-10-05", "open": 163, "high": 168, "low": 162, "close": 167, "volume": 3100},
        ],
        "MSFT": [
            {"date": "2024-10-01", "open": 250, "high": 255, "low": 248, "close": 252, "volume": 4000},
            {"date": "2024-10-02", "open": 252, "high": 260, "low": 251, "close": 257, "volume": 3800},
            {"date": "2024-10-03", "open": 257, "high": 262, "low": 256, "close": 261, "volume": 4200},
            {"date": "2024-10-04", "open": 261, "high": 265, "low": 260, "close": 263, "volume": 4500},
            {"date": "2024-10-05", "open": 263, "high": 268, "low": 262, "close": 267, "volume": 4300},
        ],
        "GOOG": [
            {"date": "2024-10-01", "open": 800, "high": 805, "low": 798, "close": 802, "volume": 2000},
            {"date": "2024-10-02", "open": 802, "high": 810, "low": 799, "close": 807, "volume": 1800},
            {"date": "2024-10-03", "open": 807, "high": 812, "low": 804, "close": 811, "volume": 2200},
            {"date": "2024-10-04", "open": 811, "high": 815, "low": 810, "close": 814, "volume": 2300},
            {"date": "2024-10-05", "open": 814, "high": 820, "low": 812, "close": 818, "volume": 2100},
        ],
        "AMZN": [
            {"date": "2024-10-01", "open": 820, "high": 825, "low": 818, "close": 822, "volume": 5000},
            {"date": "2024-10-02", "open": 822, "high": 830, "low": 819, "close": 828, "volume": 4800},
            {"date": "2024-10-03", "open": 828, "high": 832, "low": 827, "close": 830, "volume": 5200},
            {"date": "2024-10-04", "open": 830, "high": 835, "low": 829, "close": 833, "volume": 5500},
            {"date": "2024-10-05", "open": 833, "high": 840, "low": 831, "close": 836, "volume": 5300},
        ],
    }

    return make_response(jsonify(stock_data.get(ticker, [])), 200)



if __name__ == "__main__":
    app.run(debug=True)
