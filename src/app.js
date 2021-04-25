const cp = require('child_process')
const express = require('express')

const app = express()

//API endpoint will get a request from the controller on which an image will be projected for a prerequisite time.
//We will be using a child process to project an image abd remove a projection.


app.get('/projection', function (req, res) {

    try {
        //running first child process synchronously
        const data = cp.execSync('sudo export DISPLAY=:0' , function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
        //After opening the pattern the childprocess will sleep for 5 sec and then kill gpicview
        const data1 = cp.execSync('sudo gpicview  /home/pi/3d-scanner-projector/public/img/pattern.png & sleep 5; pkill gpicview', function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });

    } catch (err) {

        res.send('Image not uploaded')

    }
})

app.listen(3000, () => {
    console.log('Server is running in port 3000')
})