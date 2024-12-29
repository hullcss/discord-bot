import { Events, Listener } from "@sapphire/framework";
import { Message, MessageFlags } from "discord.js";

export class CrosspostedListener extends Listener {
  public constructor(
    context: Listener.LoaderContext,
    options: Listener.Options,
  ) {
    super(context, {
      ...options,
      event: Events.MessageCreate,
    });
  }

  public async run(message: Message) {
    console.log(message);
  }
}
