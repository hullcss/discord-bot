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
export class UserCommand extends Subcommand {
  public constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
    super(context, {
      ...options,
      name: 'friends',
      subcommands: [
        {
          name: "list",
          chatInputRun: "chatInputList"
        },
        {
          name: 'boardgames',
          chatInputRun: 'chatInputBoardgames'
        },
        {
          name: 'gaming',
          chatInputRun: 'chatInputGaming'
        },
        {
          name: 'robsoc',
          chatInputRun: 'chatInputRobSoc'
        },
        {
          name: 'freeside',
          chatInputRun: 'chatInputFreeside'
        },
        {
          name: 'support_network',
          chatInputRun: 'chatInputSupport'
        }
      ]
    });
  }

  registerApplicationCommands(registry: Subcommand.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName('friends')
        .setDescription('Friends of HullCSS')
        .addSubcommand((command) => command.setName('list').setDescription('List Organisations that we are friends with :3'))
        .addSubcommand((command) => command.setName('boardgames').setDescription('Info About Boardgames Society'))
        .addSubcommand((command) => command.setName('gaming').setDescription('Info About Gaming Society'))
        .addSubcommand((command) => command.setName('robsoc').setDescription('Info About Robsoc'))
        .addSubcommand((command) => command.setName('freeside').setDescription('Info about Support Networks'))
        .addSubcommand((command) =>command.setName('support_network').setDescription('Info about Support Networks'))
    );
  }

  public async chatInputList(interaction: Subcommand.ChatInputCommandInteraction) {

    let e = embedHelper(
      {
        name: "List of Partered Orgs:",
        desc: "Here are a list of organisaations who we share close links with. To get more info on them, just run `/friends <name>`"
      },
      interaction
    )

    Object.values(friends).forEach((friend) => {

      let desc: string = friend.desc + "\n";

      if (friend.urls) {
        Object.values(friend.urls).forEach((url) => {
          desc += `- [${url.name}](${url.url ?? ""})\n`
        })
      }

      e.addFields({ name: friend.name, value: desc });
    });

    await interaction.reply({ embeds: [e], ephemeral: true });

  }

  public async chatInputRobSoc(interaction: Subcommand.ChatInputCommandInteraction) {
    
    // build initial embed
    
    // send embed

    const msg = await interaction.reply({
      // embeds: [embed],
      ephemeral: true,
      fetchReply: true,
    });

    // do stuff...

    if (isMessageInstance(msg)) {
      // Replace Placeholder Info
    }

    // Cleanup
  }

  public async chatInputFreeside(interaction: Subcommand.ChatInputCommandInteraction) {


  }

  public async chatInputSupport(interaction: Subcommand.ChatInputCommandInteraction) {


  }

  public async chatInputBoardgames(interaction: Subcommand.ChatInputCommandInteraction) {
    const embed = new EmbedBuilder()
      .setTitle('Boardgames Society')
      .setDescription('Information about the Boardgames Society')
      .addFields(
        { name: 'Description', value: 'A society for board game enthusiasts.' },
        { name: 'Links', value: '[Boardgames Society Website](https://example.com)' }
      );

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }

  public async chatInputGaming(interaction: Subcommand.ChatInputCommandInteraction) {
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