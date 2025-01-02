import { Subcommand } from '@sapphire/plugin-subcommands';
import { embedHelper } from '../commons/embed';
import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { Command } from "@sapphire/framework";
import { EmbedBuilder } from "discord.js";
import { embed_blocks, friends } from "../config";

// Society: 
// - name
// - desc
// - links


// Extend `Subcommand` instead of `Command`
export class SubCommandTestCommand extends Subcommand {
  public constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
    super(context, {
      ...options,
      name: 'sctest',
      subcommands: [
        {
          name: "list",
          chatInputRun: "chatInputList"
        },
        {
          name: 'testcase_a',
          chatInputRun: 'chatInputTest'
        },
        {
          name: 'testcase_b',
          chatInputRun: 'chatInputTest'
        },
      ]
    });
  }

  registerApplicationCommands(registry: Subcommand.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName('sctest')
        .setDescription('Friends of HullCSS')
        .addSubcommand((command) => command.setName('list').setDescription('List Organisations that we are friends with :3'))
        .addSubcommand((command) => command.setName('testcase_a').setDescription('List Organisations that we are friends with :3'))
        .addSubcommand((command) => command.setName('testcase_b').setDescription('Info About Boardgames Society'))
    );
  }

  public async chatInputList(interaction: Subcommand.ChatInputCommandInteraction) {
    // console.log(interaction); 

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

  public async chatInputTest(interaction: Subcommand.ChatInputCommandInteraction) {

    console.log(interaction.options.getSubcommand())

    const embed = new EmbedBuilder()
      .setTitle('Gaming Society')
      .setDescription('Information about the Gaming Society')
      .addFields(
        { name: 'Description', value: 'A society for video game enthusiasts.' },
        { name: 'Links', value: '[Gaming Society Website](https://example.com)' }
      );

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
}