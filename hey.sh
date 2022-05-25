hey -m GET -c 100 -z 3m -t 30 http://localhost/get > hey_get_low.txt
hey -m GET -c 200 -z 3m -t 30 http://localhost/get > hey_get_medium.txt
hey -m GET -c 500 -z 3m -t 30 http://localhost/get > hey_get_high.txt

hey -m GET -c 100 -z 3m -t 30 http://localhost/stream/20 > hey_stream_low.txt
hey -m GET -c 200 -z 3m -t 30 http://localhost/stream/20 > hey_stream_medium.txt 
hey -m GET -c 500 -z 3m -t 30 http://localhost/stream/20 > hey_stream_high.txt  

hey -m GET -c 100 -z 3m -t 30 http://localhost/image > hey_image_low.txt 
hey -m GET -c 200 -z 3m -t 30 http://localhost/image > hey_image_medium.txt 
hey -m GET -c 500 -z 3m -t 30 http://localhost/image > hey_image_high.txt