import { ChatOpenAI } from "@langchain/openai";
import {
  BaseMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import * as dotenv from "dotenv";

dotenv.config();

import { restaurantTools } from "./utils";
import { toolExecutor } from "./tool-executor";

const llm = new ChatOpenAI({
  model: "gpt-4.1-mini",
  temperature: 0,
});

// Give all the tools to LLM and let it decide which tool to pick to finish user's work.
const llmWithTools = llm.bindTools(restaurantTools);

async function runAgent(userMessage: string) {
  const messages: BaseMessage[] = [
    // SystemMessage is a way to set instructions for the agents.
    new SystemMessage(`
You are a food ordering assistant.

Help the user:
1. Find restaurants
2. View restaurant menus
3. Add items to their cart
4. Place their order

Important:
- Always use tools for restaurant/menu/cart/order information.
- Preserve the sessionId returned by get_restaurants.
- When adding an item, use the menu item ID returned by get_menu.
- Do not invent restaurant IDs or menu item IDs.
- Do not claim an order was placed unless place_order succeeds.
    `),

    new HumanMessage(userMessage),
  ];

  // In production, do not use while loop, instead use agent orchestration framework like LangGraph
  while (true) {
    /*
     * STEP 1
     *
     * Ask LLM what to do.
     */

    const response = await llmWithTools.invoke(messages);

    messages.push(response);

    /*
     * STEP 2
     *
     * Did LLM request any tools?
     */

    if (!response.tool_calls?.length) {
      /*
       * No tool calls means this is the final response.
       */

      return response.text;
    }

    /*
     * STEP 3
     *
     * Execute all the requested tools using tool executor.
     */
    const toolCallResults = await toolExecutor(response.tool_calls);

    /*
     * STEP 4
     *
     * Add the ToolMessage returned by the tool.
     *
     * This is VERY important because the next LLM call needs
     * to see the relationship:
     *
     * AIMessage:
     *   call get_menu
     *
     * ToolMessage:
     *   result of get_menu
     */
    messages.push(...toolCallResults);

    /*
     * STEP 5
     *
     * Loop back to LLM.
     *
     * LLM now sees:
     *
     * user
     *   ↓
     * AI tool call
     *   ↓
     * Tool result
     *
     * and decides what to do next.
     */
  }
}

async function startAgent(userQuery: string) {
  const answer = await runAgent(userQuery);

  console.log("\nAssistant:");
  console.log(answer);
}

startAgent("place order Farmhouse pizza in ABC restaurant?");

// Sample queries you can try:

// Query 1: "Does ABC restaurants sells pizza?"
// Query 2: "What is the price of Farmhouse pizza in ABC restaurant?"

// After changing query or any code, run `npm run build` first to compile and then run `npm run start`

// If you find agent did not complete all steps, make the user query more clear and descriptive
