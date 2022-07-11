import core from '@actions/core';
import aws from 'aws-sdk';

export const run = async () => {
    try {
        const sqsUrl = core.getInput('sqs-url', { required: false });
        const variables = core.getInput('variables', { required: false });

        const splitVars = variables.toUpperCase().split(",");

        // @ts-ignore
        const message = splitVars.reduce((prv,crv) => {
            return {
              ...prv,
              [crv]: process.env[crv]
            }
          }, {})

        const params = {
            QueueUrl: sqsUrl,
            MessageBody: JSON.stringify(message),
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


/* istanbul ignore next */
if (require.main === module) {
    run();
}