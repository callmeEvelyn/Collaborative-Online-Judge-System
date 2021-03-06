import json
import executor_utils as eu
import sys
from flask import Flask
from flask import request
from flask import jsonify

app = Flask(__name__)

@app.route("/")
def hello():
    return "hello"

@app.route("/build_and_run", methods = ['POST'])
def build_and_run():
    data = json.loads(request.data)

    if 'code' not in data or 'lang' not in data:
        return "You should provide both 'code' and 'lang'"
    code = data['code']
    lang = data['lang']

    print 'APT got called with code: %s in %s' % (code, lang)

    result = eu.build_and_run(code, lang)
    return jsonify(result)

if __name__ == "__main__":
    eu.load_image()
    if len(sys.argv) <= 1:
        port = 5000
    else:
        port = int(sys.argv[1])
    print "Executor running on %d" % port
    app.run(port=port, debug=True)
