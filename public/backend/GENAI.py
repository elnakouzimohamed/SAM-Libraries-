from flask import Flask,request,jsonify
from flask_cors import CORS
import google.generativeai as genai
app = Flask(__name__)
CORS(app) 
# Cross Origin Requests are allowed, so angular can request from different port
genai.configure( api_key="AIzaSyDHRrdCOqoXFxFB9vPNV6tnzQrUotySX1k")
model = genai.GenerativeModel('gemini-1.5-flash')

@app.route('/generate',methods=['POST'])
def gen_ai():
    # handle comming request
    prompt = request.json.get('prompt')
    answer = model.generate_content(prompt)
    print(answer.text.split(sep="*"))
    # return jsonify({"generatedText":list(filter(lambda a: a!="",answer.text.split(sep="*")))})
    return jsonify({"generatedText":answer.text.replace("*","")});
# gen_ai()
if __name__=="__main__":
    app.run(debug=True)
    
