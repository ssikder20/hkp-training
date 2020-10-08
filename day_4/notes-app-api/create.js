import * as uuid from "uuid";
import handler from "./libs/handler.lib";
import dynamoDb from "./libs/dynamoDb-lib";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = handler(async (event, context, callback) => {
  // Request body is passed in as a JSON string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    /* 'Item' contains attributes of the item to be created
        - 'userId': user ids are fetched from Cognito Identity
                    Pool and will use the identity id as the
                    user id of the authenticated user
        - 'noteid': aunique uuid
        - 'content': parsed from request body
        - 'attachment': parsed from request body
        - 'createdAt': current Unix timestamp
    */
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
