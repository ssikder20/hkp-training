import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    /* 'KeyConditionExpression' defines query condition
     * - 'userId = :userId': only returns items with matching
     *   parition key
     * 'ExpressionAttributeValues' defines condition value
     * - ':userId': defines 'userId' to be Identity Pool identity
     *   id of the authenticated user
     */
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId,
    },
  };

  const result = await dynamoDb.query(params);

  // Return matching list of items in response body
  return result.Items;
});
