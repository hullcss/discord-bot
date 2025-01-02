import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { Command } from "@sapphire/framework";
import { EmbedBuilder } from "discord.js";
import { embedHelper } from "../commons/embed";
import { friends } from "../config";

export class TestCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, { ...options });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName("test").setDescription("Tests to see if the config is loaded properly"),
    );
  }

  public override async chatInputRun(
    interaction: Command.ChatInputCommandInteraction,
  ) {
    console.log(interaction); 

    let e = embedHelper(
      {
        name: "List of Partered Orgs:",
        desc: "Here are a list of organisaations who we share close links with. To get more info on them, just run `/friends <name>`"
      },
      interaction
    )

    const msg = await interaction.reply({
      embeds: [e],
      ephemeral: true,
      fetchReply: true,
    });

    Object.values(friends).forEach((friend) => {

      let desc: string = friend.desc + "\n";

      if (friend.urls) {
        Object.values(friend.urls).forEach((url) => {
          desc += `- [${url.name}](${url.url ?? ""})\n`
        })
      }

      e.addFields({ name: friend.name, value: desc });
    });

    return interaction.editReply({
        embeds: [e],
    });
    // // await interaction.reply({ embeds: [e], ephemeral: true });

  }
}
