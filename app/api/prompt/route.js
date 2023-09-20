import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const GET = async (request) => {
  try {
    await connectToDB();

    // reference in using populate: https://stackoverflow.com/questions/33072212/mongoose-error-schema-hasnt-been-registered-for-model-when-populate
    
    const prompts = await Prompt.find({}).populate({
      path: 'creator',
      model: User,
    });

    // Define caching headers
    const cacheHeaders = {
      'Cache-Control': 'max-age=3600', // Cache for 1 hour (adjust as needed)
      ETag: generateETag(prompts), // Generate an ETag for the response
    };

    // Check If-None-Match header from the client
    const ifNoneMatch = request.headers.get('If-None-Match');
    if (ifNoneMatch === cacheHeaders['ETag']) {
      return new Response(null, {
        status: 304, // Not Modified
        headers: cacheHeaders,
      });
    }

    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: cacheHeaders,
    });
  } catch (error) {
    return new Response(error, {
      status: 500,
    });
  }
};

// Function to generate an ETag for the response
function generateETag(data) {
  // You can use a hash function to generate an ETag based on the data
  // For example, using the crypto module in Node.js
  const crypto = require('crypto');
  const hash = crypto
    .createHash('sha1')
    .update(JSON.stringify(data))
    .digest('hex');
  return `"${hash}"`;
}
