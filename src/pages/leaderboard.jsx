import { useRouter } from "next/router";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CFToolsId, ServerApiId, Statistic, SteamId64 } from "cftools-sdk";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import PlayerStatsCanvas from "../components/PlayerStatsCanvas";
import styles from "../styles/Leaderboard.module.css";
import { titleCase } from "../helpers/util";
import backendCftClient from "../helpers/cftClient";
import LeaderboardTable from "../components/LeaderboardTable";
import banlist from "../helpers/Banlist";

// Importando los archivos de /helpers
import { Deaths } from "../helpers/Deaths";
import { KillDeathRatio } from "../helpers/KillDeathRatio";
import { Kills } from "../helpers/Kills";
import { LongestKill } from "../helpers/longestKill";
import { LongestShot } from "../helpers/longestShot";
import { Playtime } from "../helpers/playtime";
import { Suicides } from "../helpers/suicides";
import { TopPlayers } from "../helpers/topPlayers";

const BRANDING_BORDER_COLOR = "#000";
const LEADERBOARD_DEFAULT_SORT_VALUE = "kills";
const LEADERBOARD_ALLOWED_SORT_VALUES = [
    "kills",
    "deaths",
    "kdratio",
    "longest_kill",
    "longest_shot",
    "playtime",
    "suicides",
];
const SORT_VALUES_TRANSLATIONS = {
    kills: "asesinatos",
    deaths: "muertes",
    kdratio: "relación asesinatos/muertes",
    longest_kill: "asesinato más distante",
    longest_shot: "disparo más lejano",
    playtime: "tiempo de juego",
    suicides: "suicidios",
};
const BRANDING_TEXT_LEADERBOARD_COLOR = "#FFF";
const BLACKLISTED_CFTOOLS_IDS = banlist;
const ALLOW_PLAYER_STATISTICS_FOR_BLACKLIST = false;

const BRANDING_BORDER = `1px 0px 4px ${BRANDING_BORDER_COLOR},
-1px 0px 4px ${BRANDING_BORDER_COLOR},
0px 1px 4px ${BRANDING_BORDER_COLOR},
0px -1px 4px ${BRANDING_BORDER_COLOR}`;

export default function Leaderboard({ leaderboard, stats }) {
    const router = useRouter();
    const [player, setPlayer] = useState("");
    const [sortBy, setSortBy] = useState(LEADERBOARD_DEFAULT_SORT_VALUE);

    const handleUpdateSortBy = (sortValue) => {
        if (!LEADERBOARD_ALLOWED_SORT_VALUES.includes(sortValue)) return;
        setSortBy(sortValue);
        router.query.sort = sortValue;
        const searchParams = new URLSearchParams();
        searchParams.append("sort", router.query.sort);
        router.push(`${router.basePath}?${searchParams.toString()}`);
    };

    const [showPlayerDetails, setShowPlayerDetails] = useState(false);
    const handleShowPlayerDetails = () => setShowPlayerDetails(true);
    const handleClosePlayerDetails = () => {
        setShowPlayerDetails(false);
        setPlayer("");
        const { sort } = router.query;
        const searchParams = new URLSearchParams();
        if (sort && LEADERBOARD_ALLOWED_SORT_VALUES.includes(sort))
            searchParams.append("sort", sort);
        router.push(`${router.basePath}?${searchParams.toString()}`);
    };

    useEffect(() => {
        if (stats) handleShowPlayerDetails();
        const { sort } = router.query;
        if (sort) {
            if (LEADERBOARD_ALLOWED_SORT_VALUES.includes(sort)) setSortBy(sort);
            else setSortBy(LEADERBOARD_DEFAULT_SORT_VALUE);
        }
    }, [stats, router.query]);

    if (player)
        leaderboard = leaderboard.filter(
            (stats) =>
                stats.name.toLowerCase().indexOf(player.toLowerCase()) >= 0
        );

    if (stats) stats.statistics.playtime = stats.playtime;

    return (
        <>
            <SEO subTitle={"DayZ Leaderboard"} />
            <Layout>
                <div className={styles.container}>
                    <main className={styles.main}>
                        <h1
                            className={styles.title}
                            style={{
                                textShadow: BRANDING_BORDER,
                                color: BRANDING_TEXT_LEADERBOARD_COLOR,
                            }}
                        ></h1>
                        <Form
                            className={styles.form}
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (!player && leaderboard.length !== 1) return;
                                const searchParams = new URLSearchParams();
                                if (router.query.sort)
                                    searchParams.append(
                                        "sort",
                                        router.query.sort
                                    );
                                searchParams.append(
                                    "player",
                                    leaderboard.length === 1
                                        ? leaderboard[0].id
                                        : player
                                );
                                router.push(
                                    `${
                                        router.basePath
                                    }?${searchParams.toString()}`
                                );
                            }}
                        >
                            <Form.Control
                                type="text"
                                value={player}
                                placeholder="Escribe un nombre"
                                onChange={(e) => setPlayer(e.target.value)}
                            />
                        </Form>
                        <Dropdown
                            className={styles.dropdown}
                            style={{ marginBottom: "2rem" }}
                        >
                            <Dropdown.Toggle
                                variant="outline-light"
                                id="select-sort-dropdown"
                                className={styles.dropdownToggle}
                            >
                                Ordenar por:{" "}
                                {titleCase(SORT_VALUES_TRANSLATIONS[sortBy])}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {LEADERBOARD_ALLOWED_SORT_VALUES.map(
                                    (sortValue) => {
                                        return (
                                            <Dropdown.Item
                                                key={sortValue}
                                                onClick={() =>
                                                    handleUpdateSortBy(
                                                        sortValue
                                                    )
                                                }
                                            >
                                                {titleCase(
                                                    SORT_VALUES_TRANSLATIONS[
                                                        sortValue
                                                    ]
                                                )}
                                            </Dropdown.Item>
                                        );
                                    }
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        {stats && (
                            <PlayerStatsCanvas
                                stats={stats}
                                showPlayerDetails={showPlayerDetails}
                                handleClosePlayerDetails={
                                    handleClosePlayerDetails
                                }
                            />
                        )}
                        <div className={styles.tableContainer}>
                            <LeaderboardTable
                                data={leaderboard}
                                className={styles.table}
                            />
                        </div>
                    </main>
                </div>
            </Layout>
        </>
    );
}

Leaderboard.propTypes = {
    leaderboard: PropTypes.array,
    stats: PropTypes.object,
};

const steamRegex = /^[0-9]{17}$/g;
const cftoolsIdRegex = /^[0-9a-zA-Z]{24}$/g;
export async function getServerSideProps({ query }) {
    let statistic = Statistic.KILLS;
    if (query.sort && LEADERBOARD_ALLOWED_SORT_VALUES.includes(query.sort)) {
        statistic = query.sort;
    }
    const serverApiId = new ServerApiId(process.env.CFTOOLS_SERVER_API_ID);

    let stats = null;
    if (query.player) {
        const isSteam64Query = query.player.match(steamRegex);
        const isCftoolsIdQuery = query.player.match(cftoolsIdRegex);
        try {
            if (isSteam64Query) {
                stats = await backendCftClient.getPlayerDetails({
                    playerId: new SteamId64(query.player),
                    serverApiId,
                });
            } else if (isCftoolsIdQuery) {
                stats = await backendCftClient.getPlayerDetails({
                    playerId: new CFToolsId(query.player),
                    serverApiId,
                });
            }
        } catch (error) {
            console.error("Error obteniendo datos del jugador:", error);
            stats = null; // Si no se puede obtener, no usar datos de respaldo.
        }
    }

    const sortBy = query.sort || "kills";
    let leaderboardData = [];

    // Dependiendo de la categoría que se esté buscando, obtenemos los datos adecuados de los archivos importados
    switch (sortBy) {
        case "kills":
            leaderboardData = Kills; // Usar datos de Kills.js
            break;
        case "deaths":
            leaderboardData = Deaths; // Usar datos de Deaths.js
            break;
        case "kdratio":
            leaderboardData = KillDeathRatio; // Usar datos de KillDeathRatio.js
            break;
        case "longest_kill":
            leaderboardData = LongestKill; // Usar datos de LongestKill.js
            break;
        case "longest_shot":
            leaderboardData = LongestShot; // Usar datos de LongestShot.js
            break;
        case "playtime":
            leaderboardData = Playtime; // Usar datos de Playtime.js
            break;
        case "suicides":
            leaderboardData = Suicides; // Usar datos de Suicides.js
            break;
        default:
            leaderboardData = Kills; // Default a kills si no se encuentra el tipo
            break;
    }

    return {
        props: {
            leaderboard: leaderboardData,
            stats: JSON.parse(JSON.stringify(stats)),
        },
    };
}
