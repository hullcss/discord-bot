import type { Friend } from "./structs/friends";


// HashMap for Exec User ID's
export const execs: { [key: string]: number|undefined } = {
    "President":            667396400576987147,  // rand
    "Vice-President":       252001272146821120,  // alex
    "Treasurer":            207122643223052288,  // erika
    "Social Secretary":     433633207917871104,  // jack
    "Webmaster":            609463800818827264,  // ash
    "Social Media Manager": 638360627823247390   // bailey
}

// HashMap for important channel IDs
export const channel_ids: { [key: string]: number } = {
    roles: 427873938333499404,
    rules: 973982410612027503,
    member_requests: 768465164898271244,
    intro: 1284640980162580611
};

// HashMap for important role IDs
export const role_ids: { [key: string]: number } = {
    code_of_conduct: 973646380771979304,
    paid_member: 1258041215182442539,
    course_rep: 493738161713709077
};

export const important_links: { [key: string]: string } = {

}


// Friends
export const friends: Friend[] = [
    {
        name: "freeside",
        description: "The Linux User Group at the University",
        invite: "https://discord.gg/WugkvVjNZD"
    }, {
        name: "robsoc",
        description: "Hull Universities Robotics Society",
        invite: ""
    }
]

export function welcome_message(user_id: string): string {
    let msg: string = "";
    msg += `Hey ${user_id}, Welcome to HullCSS! ` 
    msg += `Feel free to select your roles using the \`Channels and Roles\` Section. `
    msg += `Make sure to also accept the <#${channel_ids["rules"]}>`

    return msg;
}


// Pulling bot token out of env
export const token = process.env.BOT_TOKEN;