from flask import Flask,request,jsonify
from flask_cors import CORS
from asgiref.wsgi import WsgiToAsgi
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
asgi_app = WsgiToAsgi(app)
# WSGI (Web Server Gateway Interface): Synchronous, designed for older frameworks like Flask and Django (pre-Channels).
# ASGI (Asynchronous Server Gateway Interface): Asynchronous, designed for modern frameworks like FastAPI and Starlette, allowing for WebSockets and background tasks.
# since flask is wsgi-basef framework, we should run the asgi app
if __name__=="__main__":
    app.run(debug=True)
    
