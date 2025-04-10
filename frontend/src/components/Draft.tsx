import { Draft, Map, Player } from "dotagsi";
import "./draft.scss"
import { League, HeroPick, HeroBan, Times } from "../interface/interface";
import { formatTime, getAmountOfMapsToWin } from "../helper/helper";

import RadiantIcon from "./../assets/radiant-logo.png"
import DireIcon from "./../assets/dire-logo.png"

import HeroImage from "../assets/HeroImage"
import HeroImageAnimated from "../assets/HeroImageAnimated";

import EWC from "./../assets/esports-wc.png"

interface Props {
    draft: Draft,
    league: League,
    players: Player[]
}

const DraftComponent = ({ draft, league, players }: Props) => {



    let teamRadiant = league.radiant
    let teamDire = league.dire

    let playersRadiant = players.filter((player) => player.team_name === "radiant")
    let playersDire = players.filter((player) => player.team_name === "dire")

    let amountOfMaps = getAmountOfMapsToWin(league.series_type)
    let bo = `Best of ${league.series_type.replace("bo", "")}`

    let picksRadiant = draft.radiant?.picks.filter((pick) => pick.type === "pick")
    let bansRadiant = draft.radiant?.picks.filter((pick) => pick.type === "ban")

    let picksDire = draft.dire?.picks.filter((pick) => pick.type === "pick")
    let bansDire = draft.dire?.picks.filter((pick) => pick.type === "ban")

    let isPick = draft.pick

    let isTurnRadiant = draft.activeteam === 2
    let isTurnDire = draft.activeteam === 3

    let timesRadiant = {
        default: draft.activeteam_time_remaining || 0,
        bonus: draft.radiant?.bonus_time || 0 
    }

    let timesDire = {
        default: draft.activeteam_time_remaining || 0,
        bonus: draft.dire?.bonus_time || 0 
    }


    //DEFAULT: Radiant on the left || Dire on the right
    if (!picksRadiant || !bansRadiant || !picksDire || !bansDire) return null;
    return (
        <div className="draft">
            <div className="draft-header">
                <div className={`header-team left radiant`}>
                    <div className="top">
                        {playersRadiant.map((player, index) => (
                            <span>{player.name}</span>
                        ))}
                    </div>
                    <div className="bottom">
                        <div className="anchors"></div>
                        <div className="team-bar"></div>
                        <div className="team-identity">
                            <div className="team-name">{teamRadiant.name}</div>
                            <div className="team-boxes">
                                {new Array(amountOfMaps).fill(0).map((_, i) => (
                                    <div key={i} className={`box ${teamRadiant.series_wins > i ? "win" : ""} `} />
                                ))}
                            </div>
                        </div>
                        <div className="team-time">
                            <div className="title">Bonus time</div>
                            <div className="value">{formatTime(timesRadiant.bonus)}</div>
                        </div>
                    </div>
                </div>
                <div className={`header-info`}>
                    <div className="top">{league.name}</div>
                    <div className="bottom">
                        <div className="anchors"></div>
                        <div className="info-logo left"><img src={RadiantIcon} /></div>
                        <div className="info-mid">
                            <div className="title">VS</div>
                            <div className="desc">{bo}</div>
                        </div>
                        <div className="info-logo right"><img src={DireIcon} /></div>
                    </div>
                </div>
                <div className={`header-team right dire`}>
                    <div className="top">
                        {playersDire.map((player, index) => (
                            <span>{player.name}</span>
                        ))}
                    </div>
                    <div className="bottom">
                        <div className="anchors"></div>
                        <div className="team-bar"></div>
                        <div className="team-identity">
                            <div className="team-name">{teamDire.name}</div>
                            <div className="team-boxes">
                                {new Array(amountOfMaps).fill(0).map((_, i) => (
                                    <div key={i} className={`box ${teamDire.series_wins > i ? "win" : ""} `} />
                                ))}
                            </div>
                        </div>
                        <div className="team-time">
                            <div className="title">Bonus time</div>
                            <div className="value">{formatTime(timesDire.bonus)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="draft-content">
                <div className="content-team">
                    <TeamPicks
                        side="left"
                        team="radiant"
                        picks={picksRadiant}
                        isPick={isPick}
                        isTurn={isTurnRadiant}
                        players={playersRadiant}
                        times={timesRadiant}
                    />
                    <div className="divider"></div>
                    <TeamBans
                        side="left"
                        team="radiant"
                        bans={bansRadiant}
                        isBan={!isPick}
                        isTurn={isTurnRadiant}
                        times={timesRadiant}
                    />
                </div>
                <div className="content-info">
                    <div className="anchors"></div>
                    <div className="dots"></div>
                    <img src={EWC} />
                </div>
                <div className="content-team">
                    <TeamPicks
                        side="right"
                        team="dire"
                        picks={picksDire}
                        isPick={isPick}
                        isTurn={isTurnDire}
                        players={playersDire}
                        times={timesDire}
                    />
                    <div className="divider"></div>
                    <TeamBans
                        side="right"
                        team="dire"
                        bans={bansDire}
                        isBan={!isPick}
                        isTurn={isTurnDire}
                        times={timesDire}
                    />
                </div>
            </div>
        </div>
    )
}

//----------------------------------------------------------------------
//-------------------------------- PICKS -------------------------------
//----------------------------------------------------------------------

interface TeamPicksProps {
    side: "left" | "right",
    team: "radiant" | "dire",
    picks: HeroPick[],
    isPick: boolean | undefined,
    isTurn: boolean,
    players: Player[],
    times: Times
}

const TeamPicks = ({ side, team, picks, isPick, isTurn, players, times }: TeamPicksProps) => {

    let activeIndex = isPick && isTurn ? picks.find(pick => pick.class === "")?.order : null

    return (
        <div className={`team-picks ${side} ${team}`}>
            <SinglePick index={0} pick={picks[0]} active={activeIndex === 0} players={players} times={times} />
            <SinglePick index={1} pick={picks[1]} active={activeIndex === 1} players={players} times={times} />
            <SinglePick index={2} pick={picks[2]} active={activeIndex === 2} players={players} times={times} />
            <SinglePick index={3} pick={picks[3]} active={activeIndex === 3} players={players} times={times} />
            <SinglePick index={4} pick={picks[4]} active={activeIndex === 4} players={players} times={times} />
        </div>
    )
}

interface PickProps {
    index: number,
    pick: HeroPick,
    active: boolean,
    players: Player[],
    times: Times
}

const SinglePick = ({ index, pick, active, players, times }: PickProps) => {



    let assignedPlayer = players.find(player => player.hero?.name === `npc_dota_hero_${pick.class}`) || null;

    let hasPicked = pick.class !== ""

    let timeDefault = formatTime(times.default)
    let timeBonus = formatTime(times.bonus)

    return (
        <div className={`pick ${index % 2 === 0 ? "light" : ""} ${active ? "active" : ""}`}>
            <div className="anchors"></div>
            <div className={`pick-times ${!hasPicked && active ? "" : "hide"}`}>
                <div className="default">{timeDefault}</div>
                <div className={`bonus ${times.default === 0 ? "" : "hide"}`}>{timeBonus}</div>
            </div>
            <div className={`pick-name ${assignedPlayer ? "" : "hide"}`}>{assignedPlayer?.name}</div>
            <div className={`pick-gradient ${hasPicked || active ? "" : "hide"}`}></div>
            <div className={`pick-empty ${hasPicked ? "hide" : ""}`}></div>
            <div className={`pick-image ${hasPicked ? "" : "hide"}`}><HeroImageAnimated heroName={pick.class} /></div>
        </div>
    )
}

//----------------------------------------------------------------------
//-------------------------------- BANS --------------------------------
//----------------------------------------------------------------------

interface TeamBansProps {
    side: "left" | "right",
    team: "radiant" | "dire",
    bans: HeroBan[],
    isBan: boolean | undefined,
    isTurn: boolean,
    times: Times
}

const TeamBans = ({ side, team, bans, isBan, isTurn, times }: TeamBansProps) => {

    let activeIndex = isBan && isTurn ? bans.find(ban => ban.class === "")?.order : null

    return (
        <div className={`team-bans ${side} ${team}`}>
            <SingleBan index={0} ban={bans[0]} active={activeIndex === 0} times={times} />
            <SingleBan index={1} ban={bans[1]} active={activeIndex === 1} times={times} />
            <SingleBan index={2} ban={bans[2]} active={activeIndex === 2} times={times} />
            <SingleBan index={3} ban={bans[3]} active={activeIndex === 3} times={times} />
            <SingleBan index={4} ban={bans[4]} active={activeIndex === 4} times={times} />
            <SingleBan index={5} ban={bans[5]} active={activeIndex === 5} times={times} />
            <SingleBan index={6} ban={bans[6]} active={activeIndex === 6} times={times} />
        </div>
    )
}

interface BanProps {
    index: number,
    ban: HeroBan,
    active: boolean,
    times: Times
}

const SingleBan = ({ index, ban, active, times }: BanProps) => {

    let hasBanned = ban.class !== ""

    let timeDefault = formatTime(times.default)
    let timeBonus = formatTime(times.bonus)

    return (
        <div className={`ban ${index % 2 === 0 ? "light" : ""} ${active ? "active" : ""}`}>
            <div className="anchors"></div>
            <div className={`ban-times ${!hasBanned && active ? "" : "hide"}`}>
                <div className="default">{timeDefault}</div>
                <div className={`bonus ${times.default === 0 ? "" : "hide"}`}>{timeBonus}</div>
            </div>
            <div className={`ban-gradient ${hasBanned || active ? "" : "hide"}`}></div>
            <div className={`ban-empty ${hasBanned ? "hide" : ""}`}></div>
            <div className={`ban-image ${hasBanned ? "" : "hide"}`}><HeroImage heroName={ban.class} /></div>
        </div>
    )
}

export default DraftComponent;