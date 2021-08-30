require('dotenv').config();
const childProcess = require('child_process');
const http = require('http');
const fs = require('fs');

const baseUrl = 'http://localhost:' + process.env.PORT;

let script = childProcess.fork('index.js');
script.on('error', (code) => {
    console.warn('Error found code ' + code);
});
script.on('exit', (code, signal) => {
    console.log('Script exited with code ' + code)
});

setTimeout(() => {
    let testCount = 5, // increase number when add test
        testResult = 0,
        failedTest = '';
    console.log(`[INFO] Begin test with ${testCount} test(s)`);

    testEnd(
        fs.readFileSync('../README.md', 'utf-8') &&
        fs.readFileSync('../package.json', 'utf-8'),
        'README and package.json test (exist and loaded)'
    );

    testEnd(process.env.PORT && fs.readFileSync('.env', 'utf-8'), '.env test (exist and loaded)');

    http.get(baseUrl, (res) => {
        testEnd(res.statusCode != 404, 'Ping "/"');
    });

    (function() {
        http.get(baseUrl + "/public/script.js", (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk });
            res.on('end', () => {
                testEnd(data == fs.readFileSync('./root/public/script.js', 'utf-8'),
                    '"/public/script.js" content mactch'
                )
            });

        })
    })();

    (function() {
        http.get(baseUrl + "/comp/head.html", (res) => {
            testEnd(res.statusCode == 302, 'Data leak test on "/comp"')
        })
    })();

    /**
     * Report test result, end tests if all test reported
     * @param {Boolean} result Test result, true for passed test
     * @param {String} msg Message for logging
     */
    function testEnd(result, msg) {
        if (result) {
            console.log('[PASS] ' + msg);
            testResult++;
        } else {
            console.error('[FAIL] ' + msg);
            failedTest = failedTest + msg + '\n';
        }
        testCount--;
        if (testCount <= 0) {
            script.kill(); // kill script
            console.log(`----------[REPORT]----------
${testResult} tests passed
Failed test:
${(failedTest) ? failedTest : 'None'}`);
            if (failedTest) process.exit(1);
            process.exit();
        }
    }
}, 2000); // wait 2 second before begin test