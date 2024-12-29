import { EmbedBuilder } from "@discordjs/builders";
import type { Command } from "@sapphire/framework";

export function embedHelper(
  interaction: Command.ChatInputCommandInteraction,
  title: string,
  description: string,
): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(title)
    .setDescription(description)
    .setFooter({
      text: `@${interaction.user.tag}`,
      iconURL: interaction.user.displayAvatarURL(),
    })
    .setTimestamp();
}
