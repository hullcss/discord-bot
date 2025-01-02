import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { Command } from "@sapphire/framework";
import { EmbedBuilder } from "discord.js";
import { embedHelper } from "../commons/embed";
import { embed_blocks } from "../config";

export class PingCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, { ...options });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName("ping").setDescription("Ping bot to see if it is alive"),
    );
  }

  public override async chatInputRun(
    interaction: Command.ChatInputCommandInteraction,
  ) {
    const embed = embedHelper(
      {
        name: "Ping",
        desc: "Pinging..."
      }, 
      interaction
    );

    const msg = await interaction.reply({
      embeds: [embed],
      ephemeral: true,
      fetchReply: true,
    });

    if (isMessageInstance(msg)) {
      const diff = msg.createdTimestamp - interaction.createdTimestamp;
      const ping = Math.round(this.container.client.ws.ping);
      embed.setDescription(`Pong! Latency: ${diff}ms, API Latency: ${ping}ms`);
      return interaction.editReply({
        embeds: [embed],
      });
    }

    embed.setDescription("Failed to retrieve ping :(");
    return interaction.editReply({
      embeds: [embed],
    });
  }
}
