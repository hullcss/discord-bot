import { EmbedBuilder } from "@discordjs/builders";
import { Command } from "@sapphire/framework";
import { ChatInputCommandInteraction, Message } from "discord.js";
import type { ndurl } from "../structs/ndurl";

function embedHelper(
  nd: ndurl
  data?:
    | Message
    | Command.ChatInputCommandInteraction
    | { name: string; avatar: string },
): EmbedBuilder {

  const embed = new EmbedBuilder()
    .setColor(0x000000)
    .setTitle(nd.name)
    .setDescription(nd.desc)
    .setTimestamp();

  if (data instanceof Message) {
    embed.setFooter({
      text: `@${data.author.tag}`,
      iconURL: data.author.displayAvatarURL(),
    });
  } else if (data instanceof ChatInputCommandInteraction) {
    embed.setFooter({
      text: `@${data.user.tag}`,
      iconURL: data.user.displayAvatarURL(),
    });
  } else if (data) {
    if (data.name && data.avatar) {
      embed.setFooter({
        text: `@${data.name}`,
        iconURL: data.avatar,
      });
    }
  }

  return embed;
}

export { embedHelper };
