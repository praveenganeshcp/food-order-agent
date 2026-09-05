# food-order-agent

A TypeScript + LangChain demo that shows how an LLM can orchestrate tool calls for a simple food ordering workflow.

The agent can:
- list restaurants
- fetch a restaurant menu
- add menu items to a cart
- place an order

This project uses in-memory mock data from `src/static-data.ts`. It does not connect to a real database, payment system, or delivery API.

## Purpose

This repository is a learning/reference project for understanding multi-step agent behavior with tools.

The core flow in `src/agent.ts` is:
1. a user prompt is sent to the model
2. the model decides whether to call a tool
3. the tool executor runs the requested tool(s)
4. tool results are fed back to the model
5. the loop continues until the model returns a final answer

## Prerequisites

- Node.js
- npm
- an OpenAI API key

## Installation

```bash
git clone https://github.com/praveenganeshcp/food-order-agent
cd food-order-agent
npm install
```

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=your_api_key_here
```

Build the TypeScript source:

```bash
npm run build
```

## Run locally

Start the compiled app:

```bash
npm run start
```

There is currently no dev/watch script. If you change the code or sample query, rebuild first with:

```bash
npm run build
```

## Configuration notes

- Environment variables are loaded with `dotenv.config()`.
- The model is currently hardcoded to `gpt-4.1-mini` in `src/agent.ts`.
- The app starts with a hardcoded sample prompt in `src/agent.ts`:

```ts
startAgent("place order Farmhouse pizza in ABC restaurant?");
```

- To try a different query, edit that `startAgent(...)` call, then run `npm run build` and `npm run start` again.
- Cart/session state is stored in memory via the `CART` map in `src/static-data.ts`, so restarting the process resets state.

## Project structure

- `src/agent.ts` — main agent loop, prompt setup, and model/tool orchestration
- `src/tool-executor.ts` — executes tool calls requested by the model
- `src/tools/` — tool definitions for restaurant lookup, menu lookup, cart updates, and order placement
- `src/static-data.ts` — mock restaurants, menu items, and in-memory cart state
- `src/utils.ts` — tool registry and lookup helpers

## Notes

- Build output is written to `dist/`.
- The local run flow is compile first, then execute the compiled JavaScript.
- This repo is intended as a concise demo, so avoid assuming unsupported features such as persistence, CLI input, or live integrations.
