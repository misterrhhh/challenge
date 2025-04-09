import { Dota2 } from "dotagsi";

export interface League {
    description: string;
    name: string;
    series_type: "bo1" | "bo2" | "bo3" | "bo5" | "bo7";
    dire: {
        name: string;
        series_wins: number;
        team_id: number;
        team_tag: string;
    },
    radiant:
    {
        name: string;
        series_wins: number;
        team_id: number;
        team_tag: string;
    }
}

export interface ExtendedDota2 extends Dota2 {
	league: League;
}

export interface HeroPick {
    class: string;
    order: number;
    player_id: number;
    type: string;
}

export interface HeroBan {
    class: string;
    order: number;
    player_id: number;
    type: string;
}

export interface Times {
    default: number;
    bonus: number;
}