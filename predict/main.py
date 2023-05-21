from flask import Flask, request, jsonify

app = Flask(__name__)

# database 연결
@app.route('/predict', methods=['POST'])
def predict_location():
  pic_src_array = request.get_json(force=True)

  # pic_src 로 사진파일 읽기 (upload_images에 있음)
  # 사진 파일을 model에 넣기
  # 결과를 json으로 반환하기
  # 반환 : [
  #       [num_features(무시), 위도:float, 경도:float, 각도:float],
  #       []...
  #      ] -> 이미지 1개 (결과 n개 -> 그 중에 제일 나은 결과값 3개 리턴 -> [결과1,결과2,결과3])
  #  
  # 예상 : [{},{},{}]
  print(pic_src_array)


  
  return jsonify({ 'result' : 'success' })

if __name__ == "__main__":
  app.run(host='0.0.0.0', port='5002', debug=True)