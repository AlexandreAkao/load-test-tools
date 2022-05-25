echo "GET http://localhost/get" | vegeta attack -duration=3m -rate=0 -max-workers=100 -workers=100 | vegeta report -type=json > vegeta_get_low.json
echo "GET http://localhost/get" | vegeta attack -duration=3m -rate=0 -max-workers=200 -workers=200 | vegeta report -type=json > vegeta_get_medium.json
echo "GET http://localhost/get" | vegeta attack -duration=3m -rate=0 -max-workers=500 -workers=500 | vegeta report -type=json > vegeta_get_high.json

echo "GET http://localhost/stream/20" | vegeta attack -duration=3m -rate=0 -max-workers=100 -workers=100 | vegeta report -type=json > vegeta_stream_low.json
echo "GET http://localhost/stream/20" | vegeta attack -duration=3m -rate=0 -max-workers=200 -workers=200 | vegeta report -type=json > vegeta_stream_medium.json
echo "GET http://localhost/stream/20" | vegeta attack -duration=3m -rate=0 -max-workers=500 -workers=500 | vegeta report -type=json > vegeta_stream_high.json

echo "GET http://localhost/image" | vegeta attack -duration=3m -rate=0 -max-workers=100 -workers=100 | vegeta report -type=json > vegeta_image_low.json
echo "GET http://localhost/image" | vegeta attack -duration=3m -rate=0 -max-workers=200 -workers=200 | vegeta report -type=json > vegeta_image_medium.json
echo "GET http://localhost/image" | vegeta attack -duration=3m -rate=0 -max-workers=500 -workers=500 | vegeta report -type=json > vegeta_image_high.json