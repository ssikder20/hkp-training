export default function handler(lambda) {
  return async function (event, context) {
    let body, statusCode;

    try {
      // Run Lambda
      body = await lambda(event, context);
      statusCode = 200;
    } catch (err) {
      body = { error: err.message };
      statusCode = 500;
    }

    // Return HTTP response
    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  };
}
