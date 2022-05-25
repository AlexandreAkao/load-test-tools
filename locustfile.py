# locust --host http://localhost -t 3m -u 100 -r 100 --expect-workers 100 --only-summary --tags multi --csv=locust_multi_low --headless
# locust --host http://localhost -t 3m -u 200 -r 200 --expect-workers 200 --only-summary --tags multi --csv=locust_multi_medium --headless
# locust --host http://localhost -t 3m -u 500 -r 500 --expect-workers 500 --only-summary --tags multi --csv=locust_multi_high --headless

# locust --host http://localhost -t 3m -u 100 -r 100 --expect-workers 100 --only-summary --tags get --csv=locust_get_low --headless
# locust --host http://localhost -t 3m -u 200 -r 200 --expect-workers 200 --only-summary --tags get --csv=locust_get_medium --headless
# locust --host http://localhost -t 3m -u 500 -r 500 --expect-workers 500 --only-summary --tags get --csv=locust_get_high --headless

# locust --host http://localhost -t 3m -u 100 -r 100 --expect-workers 100 --only-summary --tags stream --csv=locust_stream_low --headless
# locust --host http://localhost -t 3m -u 200 -r 200 --expect-workers 200 --only-summary --tags stream --csv=locust_stream_medium --headless
# locust --host http://localhost -t 3m -u 500 -r 500 --expect-workers 500 --only-summary --tags stream --csv=locust_stream_high --headless

# locust --host http://localhost -t 3m -u 100 -r 100 --expect-workers 100 --only-summary --tags image --csv=locust_image_low --headless
# locust --host http://localhost -t 3m -u 200 -r 200 --expect-workers 200 --only-summary --tags image --csv=locust_image_medium --headless
# locust --host http://localhost -t 3m -u 500 -r 500 --expect-workers 500 --only-summary --tags image --csv=locust_image_high --headless

import time
from locust import HttpUser, tag, task

class HttpBin(HttpUser):
  @task
  @tag('multi')
  def multi(self):
    response_get = self.client.get("/get")

    if response_get.status_code == 200:
      response_stream = self.client.get("/stream/20")
    
      if response_stream.status_code == 200:
        self.client.get("/image", headers={"accept": "image/webp"})
    
    time.sleep(1)

  @task
  @tag('get')
  def get(self):
    self.client.get("/get")
    time.sleep(1)
      
  @task
  @tag('stream')
  def delay(self):
    self.client.get("/stream/20")
    time.sleep(1)

  @task
  @tag('image')
  def image(self):
    self.client.get("/image", headers={"accept": "image/webp"})
    time.sleep(1)