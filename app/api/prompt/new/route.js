import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// api route in nextjs
export const POST = async (req) => {
  // extract the data from POST request
  const { userId, prompt, tag } = await req.json();

  try {
    // call this function everytime bcs it is lambda function - will die once it done its job
    await connectToDB();

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag
    })

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 })
  } catch (error) {
    return new Response("Failed to create a new prompt!", { status: 500 })
  }
}