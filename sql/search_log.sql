CREATE TABLE search_request_log (
  log_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  img_src VARCHAR(255) NOT NULL,
  req_time TIMESTAMP NOT NULL,
  PRIMARY KEY (log_id),
  FOREIGN KEY (user_id) REFERENCES user_info(user_id) ON DELETE CASCADE
);

CREATE TABLE search_response_log (
  log_id INT NOT NULL AUTO_INCREMENT,
  req_log_id INT NOT NULL,
  user_id INT NOT NULL,
  result_data JSON NOT NULL,
  res_time TIMESTAMP NOT NULL,
  PRIMARY KEY (log_id),
  FOREIGN KEY (req_log_id) REFERENCES search_request_log(log_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user_info(user_id) ON DELETE CASCADE
);