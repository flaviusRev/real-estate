/** @format */

const chatService = {
  sendMessage: async (
    userMessage,
    threadId = null,
    tool_outputs = null,
    addProperty = null
  ) => {
    try {
      console.log("userMessage", userMessage);
      console.log("threadId", threadId);
      console.log("tool_outputs", tool_outputs);

      const payload = {
        query: userMessage,
      };

      // Include threadId in the payload if it's provided
      if (threadId) {
        payload.threadId = threadId;
      }

      // Include tool_outputs in the payload if it's provided
      if (tool_outputs) {
        payload.tool_outputs = tool_outputs;
      }

      const response = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      // if data.responseContent is "requires_action", this means that the AI is asking you to perform an action and return a result
      // look for the toolCall param in data and send another message with tool_outputs IE: {run_call_id:toolCall.runid tool_call_id: toolCall.id,output: "true"}
      // And the response should be the message that the AI sends back
      if (data.responseContent === "requires_action") {
        console.log("requires_action");
        const toolCall0 = data.tools.calls[0];
        const toolCalls = data.tools.calls;
        const threadId = data.threadId;

        // When responding actions we need to send a tools object that will contain an array with the responses parameters, the IDs of each response, and the runID for all those responses
        let tools = {};
        let toolResponses = [];
        const runId = data.tools.runID;

        // Right now we are only gonna process the first toolCall, we will fill the tool_responses array with the responses to each toolCall with a generic response
        for (let i = 1; i < toolCalls.length; i++) {
          toolResponses.push({
            tool_call_id: toolCalls[i].id,
            output: "Not processed, can only process one action at the time",
          });
        }

        // Depending on toolcall.function.name we do different things, toolcall.function.arguments contains the parameters
        // if name is navigate, we need to navigate to the url in toolcall.function.arguments.destination and return true if navigation waws successfull as a response
        if (toolCall0.function.name === "navigate") {
          console.log("navigate");
          const args = JSON.parse(toolCall0.function.arguments);
          console.log("toolCall.function.arguments", args);
          toolResponses.push({
            tool_call_id: toolCall0.id,
            output: "Success, add that link to the next message",
          });
          console.log("HERE ARE THE TOOL RESPONSES");
          console.log(toolResponses);
          tools = { responses: toolResponses, runId: runId };
          const response = await chatService.sendMessage(
            "action_response",
            threadId,
            tools
          );

          // Replace or add URL to the message
          // Check if the destination is already a formed URL
          let url;

          if (args.destination == "cart") {
            window.location.href = "http://localhost:3000/cart";
          }

          if (args.destination.includes("http")) {
            url = args.destination;
          } else {
            url = "http://localhost:3000/product/" + args.destination;
          }
          const urlRegex = /https?:\/\/[^\s]+/g;
          if (
            response &&
            response.reply &&
            response.reply.length > 0 &&
            response.reply[0].text
          ) {
            let originalText = response.reply[0].text.value;

            // Check if the original text contains a URL
            if (urlRegex.test(originalText)) {
              // Replace the existing URL with the new URL
              response.reply[0].text.value = originalText.replace(
                urlRegex,
                url
              );
            } else {
              // Append the new URL to the end
              response.reply[0].text.value = originalText + " " + url;
            }
          }
          return response;
        } else if (toolCall0.function.name === "addToCart") {
          console.log("addToCart");
          const args = JSON.parse(toolCall0.function.arguments);
          console.log("toolCall.function.arguments", args);

          // Assuming args contains the product information
          try {
            console.log("Adding to the cart!");
            console.log(args.productID);
            let result = addProperty
              ? addProperty({ id: args.productID })
              : null; // Add the product to the cart using cartUtils
            console.log(result);
            toolResponses.push({
              tool_call_id: toolCall0.id,
              output: "Product added to cart successfully",
            });
          } catch (error) {
            console.error("Error adding product to cart:", error);
            toolResponses.push({
              tool_call_id: toolCall0.id,
              output: "Failed to add product to cart",
            });
          }

          tools = { responses: toolResponses, runId: runId };
          const response = await chatService.sendMessage(
            "action_response",
            threadId,
            tools
          );
          return response;
        } else {
          console.log("toolCall0.function.name", toolCall0.function.name);
          console.log(
            "toolCall0.function.arguments",
            toolCall0.function.arguments
          );
          console.log("Action not recognized");
          toolResponses.push({
            run_call_id: toolCall0.runID,
            tool_call_id: toolCall0.id,
            output: "unknown",
          });
          tools = { responses: toolResponses, runId: runId };
          const response = await chatService.sendMessage(
            "action_response",
            threadId,
            tools
          );
          return response;
        }
      } else {
        //If not, return the response
        return { reply: data.responseContent, threadId: data.threadId };
      }
    } catch (error) {
      console.error("Error sending message:", error);
      return {
        reply: "Sorry, I couldn't process your request.",
        threadId: null,
      };
    }
  },
};

export default chatService;
