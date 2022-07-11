const core = require('@actions/core');
const aws = require('aws-sdk');

async function run() {
    try {
        const sqsUrl = core.getInput('sqs-url', { required: false });
        const variables = core.getInput('variables', { required: false });

        const splitVariables = variables.toUpperCase().split(",");

        const message = process.env(splitVariables[0]);

        console.log(message);

        const params = {
            QueueUrl: sqsUrl,
            MessageBody: message,
        };
        
        const sqs = new aws.SQS();
        sqs.sendMessage(params, (err, resp) => {
            if (err) {
                throw err;
            } else {
                console.log(`resp ${JSON.stringify(resp, null, 2)}`);
            }
        })
    } catch (error) {
        core.setFailed(error.message);
    }
}

module.exports = run;

/* istanbul ignore next */
if (require.main === module) {
    run();
}