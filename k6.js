// k6 run --env SCENARIOS=multi_low --summary-export k6_multi_low.json k6.js
// k6 run --env SCENARIOS=multi_medium --summary-export k6_multi_medium.json k6.js
// k6 run --env SCENARIOS=multi_high --summary-export k6_multi_high.json k6.js

// k6 run --env SCENARIOS=get_low --summary-export k6_get_low.json k6.js
// k6 run --env SCENARIOS=get_medium --summary-export k6_get_medium.json k6.js
// k6 run --env SCENARIOS=get_high --summary-export k6_get_high.json k6.js

// k6 run --env SCENARIOS=stream_low --summary-export k6_stream_low.json k6.js
// k6 run --env SCENARIOS=stream_medium --summary-export k6_stream_medium.json k6.js
// k6 run --env SCENARIOS=stream_high --summary-export k6_stream_high.json k6.js

// k6 run --env SCENARIOS=image_low --summary-export k6_image_low.json k6.js
// k6 run --env SCENARIOS=image_medium --summary-export k6_image_medium.json k6.js
// k6 run --env SCENARIOS=image_high --summary-export k6_image_high.json k6.js

import http from 'k6/http';
import { Trend, Rate, Counter } from "k6/metrics";
import { sleep } from "k6";

const baseUrl = 'http://localhost'
const TIME = '3m'

export let GetHttpDuration = new Trend('Duração');
export let GetHttpFailRate = new Rate('Falhas');
export let GetHttpSuccessRate = new Rate('Sucesso');
export let GetHttpReqs = new Counter('Total Requestes');

const possibleScenarios = {
    multi_low: {
        executor: 'constant-vus',
        exec: 'multi',
        vus: 100,
        duration: TIME,
    },
    multi_medium: {
        executor: 'constant-vus',
        exec: 'multi',
        vus: 200,
        duration: TIME,
    },
    multi_high: {
        executor: 'constant-vus',
        exec: 'multi',
        vus: 500,
        duration: TIME,
    },
    
    get_low: {
        executor: 'constant-vus',
        exec: 'single',
        vus: 100,
        duration: TIME,
        env: { URL: 'get' },
    },
    get_medium: {
        executor: 'constant-vus',
        exec: 'single',
        vus: 200,
        duration: TIME,
        env: { URL: 'get' },
    },
    get_high: {
        executor: 'constant-vus',
        exec: 'single',
        vus: 500,
        duration: TIME,
        env: { URL: 'get' },
    },

    stream_low: {
        executor: 'constant-vus',
        exec: 'single',
        vus: 100,
        duration: TIME,
        env: { URL: 'stream/20' }
    },
    stream_medium: {
        executor: 'constant-vus',
        exec: 'single',
        vus: 200,
        duration: TIME,
        env: { URL: 'stream/20' }
    },
    stream_high: {
        executor: 'constant-vus',
        exec: 'single',
        vus: 500,
        duration: TIME,
        env: { URL: 'stream/20' }
    },

    image_low: {
        executor: 'constant-vus',
        exec: 'single',
        vus: 100,
        duration: TIME,
        env: { URL: 'image' }
    },
    image_medium: {
        executor: 'constant-vus',
        exec: 'single',
        vus: 200,
        duration: TIME,
        env: { URL: 'image' }
    },
    image_high: {
        executor: 'constant-vus',
        exec: 'single',
        vus: 500,
        duration: TIME,
        env: { URL: 'image' }
    },
}

let enabledScenarios = {}

__ENV.SCENARIOS.split(',').forEach(scenario => enabledScenarios[scenario] = possibleScenarios[scenario])

export const options = {
    summaryTimeUnit: 'ms',
    scenarios: enabledScenarios
};

export function multi() {
    let success = true;
    let time = 0;

    let res = http.get(`${baseUrl}/get`);
    success = res.status < 400 && res.status > 199
    time += res.timings.duration; 

    if (success) {
        res = http.get(`${baseUrl}/stream/20`);
        success = res.status < 400 && res.status > 199
        time += res.timings.duration; 
        
        if (success) {
            res = http.get(`${baseUrl}/image`);
            success = res.status < 400 && res.status > 199
            time += res.timings.duration; 
        }
    }

    GetHttpReqs.add(1);
    GetHttpDuration.add(time);
    GetHttpFailRate.add(!success);
    GetHttpSuccessRate.add(success);

    sleep(1);
}

export function single() {
    let res = http.get(`${baseUrl}/${__ENV.URL}`);
    const success = res.status < 400 && res.status > 199
    const time = res.timings.duration; 

    GetHttpReqs.add(1);
    GetHttpDuration.add(time);
    GetHttpFailRate.add(!success);
    GetHttpSuccessRate.add(success);

    sleep(1);
}
