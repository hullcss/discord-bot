import { EmbedBuilder } from "@discordjs/builders";
import { Command } from "@sapphire/framework";
import { ChatInputCommandInteraction, Message } from "discord.js";

// function rawEmbedHelper(
//   author: string,
//   url: string,
//   title: string,
//   description: string,
// ): EmbedBuilder {
//   return new EmbedBuilder()
//     .setColor(0x0099ff)
//     .setTitle(title)
//     .setDescription(description)
//     .setFooter({
//       text: `@${author}`,
//       iconURL: url,
//     })
//     .setTimestamp();
// }

// function messageEmbedHelper(
//   interaction: Message,
//   title: string,
//   description: string,
// ): EmbedBuilder {
//   return new EmbedBuilder()
//     .setColor(0x0099ff)
//     .setTitle(title)
//     .setDescription(description)
//     .setFooter({
//       text: `@${interaction}`,
//       iconURL: interaction.user.displayAvatarURL(),
//     })
//     .setTimestamp();
// }

// function interactionEmbedHelper(
//   interaction: Command.ChatInputCommandInteraction,
//   title: string,
//   description: string,
// ): EmbedBuilder {
//   return embedHelper(
//     interaction.user.tag,
//     interaction.user.displayAvatarURL(),
//     title,
//     description,
//   );
// }

function embedHelper(
  title: string,
  description: string,
  data?:
    | Message
    | Command.ChatInputCommandInteraction
    | { name: string; avatar: string },
): EmbedBuilder {
  // switch case to determine the type of data

  const embed = new EmbedBuilder()
    .setColor(0x000000)
    .setTitle(title)
    .setDescription(description)
    .setTimestamp();

  // return embed;

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

  embed.setF;

  return embed;
}

export { embedHelper };
