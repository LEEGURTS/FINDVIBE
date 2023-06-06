from flask import Flask, request, jsonify
#import model.model as Mo
#import model.utils as Ut

app = Flask(__name__)

#@app.before_request
#def prepare_model():
#  global data, labels, images
#  data, labels, images = Ut.load_saved_delf_data()

# database 연결
@app.route('/predict', methods=['POST'])
def predict_location():
  # [{log_id, img_src}, .....]
  request_log_list = request.get_json(force=True)
  # print(request_log_list)
  #request_log_list = [{"log_id":1, "img_src":""}]
  predict_component = ["latitude", "longitude", "angle", "address"]
  result = {}

  for request_log in request_log_list:
    img_loc_list = []
    # request_log : {log_id, img_src}를 통해 분석
    pr_loc_data_list = [[0, 37.541, 126.986, 30],[0, 28, 25, 13]]
    #pr_loc_data_list = Mo.run_model(test_src) 분석한 값

    if len(pr_loc_data_list) > 2:
      pr_loc_data_list = pr_loc_data_list[0:2]
    
    for pr_loc_data in pr_loc_data_list:
      converted_pr_data = {}
      converted_pr_data[predict_component[0]] = pr_loc_data[1]
      converted_pr_data[predict_component[1]] = pr_loc_data[2]
      converted_pr_data[predict_component[2]] = pr_loc_data[3]
      converted_pr_data[predict_component[3]] = ""
      img_loc_list.append(converted_pr_data)
      
    if len(img_loc_list)!=0 :
      result[request_log["log_id"]]=img_loc_list

  # 반환 값 : log_id : pre_dict[]인 dict
  # pre_dict : {위도:??, 경도:??, 각도:??, log_id:??}
  return jsonify({ 'result' : result })

if __name__ == "__main__":
  app.run(host='0.0.0.0', port='5002', debug=True)