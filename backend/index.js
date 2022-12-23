const app = require("./app");
const serverless = require("serverless-http");
const { init } = require("./db");

// or as a promise
const handler = serverless(app);
module.exports.handler = async (event, context) => {
    await init();
    // you can do other things here
    const result = await handler(event, context);
    // and here
    return result;
};

