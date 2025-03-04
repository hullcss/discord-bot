import { Subcommand } from '@sapphire/plugin-subcommands';
import { embedHelper } from '../commons/embed';
import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { Command } from "@sapphire/framework";
import { EmbedBuilder } from "@discordjs/builders";
import { code_of_conduct_embed, embed_blocks, friends, friends_list_embed, links_embed, paid_member_embed } from "../config";

// Society: 
// - name
// - desc
// - links


// Extend `Subcommand` instead of `Command`
export class EmbedsCommand extends Subcommand {
  public constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
    super(context, {
      ...options,
      name: 'embeds',
      subcommands: [
        {
          name: "paid_member",
          chatInputRun: "chatInputRun"
        },
        {
          name: 'code_of_conduct',
          chatInputRun: 'chatInputRun'
        },
        {
          name: 'links',
          chatInputRun: "chatInputRun"
        },
        {
          name: 'friends',
          chatInputRun: "chatInputRun"
        }
      ]
    });
  }

  registerApplicationCommands(registry: Subcommand.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName('embeds')
        .setDescription('Embed Admin Command')
        .addSubcommand((command) => command.setName('paid_member').setDescription('Paid Member embed'))
        .addSubcommand((command) => command.setName('code_of_conduct').setDescription('Code of Conduct Embed'))
        .addSubcommand((command) => command.setName('links').setDescription('Links Embed'))
        .addSubcommand((command) => command.setName('friends').setDescription('Friends Embed'))
    );
  }

  public async chatInputRun(interaction: Subcommand.ChatInputCommandInteraction) {

    // interaction.options.getSubcommand()
    const subcommand = interaction.options.getSubcommand();
    
    let embed: EmbedBuilder;

    switch (subcommand) {
      case 'paid_member':
        // TODO
        // - write embed
        // - add buttons
        // - build form
        // - handle form

        embed = paid_member_embed();
        break;
      case 'code_of_conduct':
        // TODO
        // - write embed
        // - add buttons
        // - handle buttons

        embed = code_of_conduct_embed();
        break;
      case 'links':
        embed = links_embed();
      
        break;
      
      case 'friends':
        embed = friends_list_embed();

        break;
      default:
        await interaction.reply({ content: 'Unknown subcommand', ephemeral: true });
        return;
    }

    await interaction.reply({
      embeds: [embed]
    })

  }
}