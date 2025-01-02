import { LogLevel, SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits, Partials } from "discord.js";

// Unless explicitly defined, set NODE_ENV as development:
process.env.NODE_ENV ??= "development";

import {
  ApplicationCommandRegistries,
  RegisterBehavior,
} from "@sapphire/framework";
import "@sapphire/plugin-api/register";
import "@sapphire/plugin-editable-commands/register";
import "@sapphire/plugin-logger/register";
import "@sapphire/plugin-subcommands/register";
import * as colorette from "colorette";
import { join } from "path";
import { inspect } from "util";
import { paid_member_req, welcome_message } from "./config";

export const rootDir = join(__dirname, "..", "..");
export const srcDir = join(rootDir, "src");

export const RandomLoadingMessage = [
  "Computing...",
  "Thinking...",
  "Cooking some food",
  "Give me a moment",
  "Loading...",
];

let e = paid_member_req();

// Set default behavior to bulk overwrite
ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(
  RegisterBehavior.BulkOverwrite,
);

// Set default inspection depth
inspect.defaultOptions.depth = 1;

// Enable colorette
colorette.createColors({ useColor: true });

const client = new SapphireClient({
  defaultPrefix: "!",
  regexPrefix: /^(hey +)?bot[,! ]/i,
  caseInsensitiveCommands: true,
  logger: {
    level: LogLevel.Debug,
  },
  shards: "auto",
  intents: [
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
  loadMessageCommandListeners: true,
});

const main = async () => {
  try {
    client.logger.info("Logging in");
    await client.login(process.env.BOT_TOKEN);
    client.logger.info("logged in");
  } catch (error) {
    client.logger.fatal(error);
    await client.destroy();
    process.exit(1);
  }
};

client.on("messageCreate", async (message) => {
  if (message.channel.id === "YOUR CHANNEL ID") {
    console.log("message created");
  }
});

void main();
