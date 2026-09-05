import { DynamicStructuredTool } from "@langchain/core/tools";
import { toolsByName } from "./utils";
import { AIMessage, ToolMessage } from "@langchain/core/messages";

export async function toolExecutor(toolCalls: AIMessage["tool_calls"] = []) {
  const toolResults: ToolMessage[] = [];
  for (const toolCall of toolCalls) {
    console.log(`Calling tool: ${toolCall.name}`, toolCall.args);

    const tool: DynamicStructuredTool =
      toolsByName[toolCall.name as keyof typeof toolsByName];

    if (!tool) {
      throw new Error(`Unknown tool: ${toolCall.name}`);
    }

    /*
     * LangChain tool invocation.
     *
     * toolCall contains:
     *
     * {
     *   name: "get_menu",
     *   args: {
     *     restaurantName: "ABC Restaurant"
     *   },
     *   id: "call_xxx"
     * }
     */

    const toolResult = await tool.invoke(toolCall);

    toolResults.push(toolResult);
  }
  return toolResults;
}
