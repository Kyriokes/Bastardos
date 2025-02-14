import React, { useState } from "react";
import PropTypes from "prop-types";
import { CFToolsId, ServerApiId, Statistic, SteamId64 } from "cftools-sdk";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import PlayerStatOverview from "../components/PlayerStatOverview";
import styles from "../styles/HallOfFame.module.css";
import backendCftClient from "../helpers/cftClient";
import banlist from "../helpers/Banlist";
import { TopPlayers } from "../helpers/topPlayers"; // Asegúrate de importar TopPlayers correctamente

const kdr = "kdr.jpg";
const nolife = "nolife.webp";
const sniper = "sniper.webp";
const topT = "top3.webp";

const BLACKLISTED_CFTOOLS_IDS = banlist;

export default function HallOfFame({ topPlayers }) {
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const handleOpenPlayerOverview = (player) => {
        setSelectedPlayer(player);
    };

    const handleClosePlayerOverview = () => {
        setSelectedPlayer(null);
    };

    const renderPlayerStats = (player, category) => {
        switch (category) {
            case "topKills":
                return <p>Asesinatos: {player.kills}</p>;
            case "topLongestKill":
                return <p>Asesinato más distante: {player.longestKill}m</p>;
            case "topKDRatio":
                return <p>K/D: {player.killDeathRatio}</p>;
            case "topPlaytime":
                return (
                    <p>
                        Tiempo de Juego: {Math.trunc(player.playtime / 60 / 60)}{" "}
                        hs
                    </p>
                );
            default:
                return <p>Stats: {player.stats}</p>;
        }
    };

    const top1 = topPlayers.topKills[0];
    const top2 = topPlayers.topKills[1];
    const top3 = topPlayers.topKills[2];
    const maxPlayTime = topPlayers.topPlaytime[0];
    const longestK = topPlayers.topLongestKill[0];
    const topKDR = topPlayers.topKDRatio[0];

    return (
        <>
            <SEO subTitle={"Hall of Fame"} />
            <Layout>
                <div className={styles.container}>
                    <div className={styles.section}>
                        <h2>
                            Más asesinatos
                            <br />
                            por muerte
                        </h2>
                        <div onClick={() => handleOpenPlayerOverview(topKDR)}>
                            <img
                                className={styles.imgs}
                                src={kdr}
                                alt="Descripción de la imagen"
                                width="300"
                                height="200"
                            />
                            <h3 className={styles.player}>{topKDR.name}</h3>
                            {renderPlayerStats(topKDR, "topKDRatio")}
                        </div>
                    </div>
                    <div className={styles.section}>
                        <h2>
                            Asesinos
                            <br />
                            sedientos de pvp
                        </h2>
                        <img
                            className={styles.imgs}
                            src={topT}
                            alt="Descripción de la imagen"
                            width="300"
                            height="200"
                        />
                        <div onClick={() => handleOpenPlayerOverview(top1)}>
                            <div></div>
                            <div>
                                <h2 className={styles.player}>{top1.name}</h2>
                                {renderPlayerStats(top1, "topKills")}
                            </div>
                        </div>
                        <div onClick={() => handleOpenPlayerOverview(top2)}>
                            <div></div>
                            <div>
                                <h2 className={styles.player}>{top2.name}</h2>
                                {renderPlayerStats(top2, "topKills")}
                            </div>
                        </div>
                        <div onClick={() => handleOpenPlayerOverview(top3)}>
                            <div></div>
                            <div>
                                <h2 className={styles.player}>{top3.name}</h2>
                                {renderPlayerStats(top3, "topKills")}
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <h2>
                            Asesinato más
                            <br /> distante
                        </h2>
                        <div onClick={() => handleOpenPlayerOverview(longestK)}>
                            <img
                                className={styles.imgs}
                                src={sniper}
                                alt="Descripción de la imagen"
                                width="300"
                                height="200"
                            />
                            <h3 className={styles.player}>{longestK.name}</h3>
                            {renderPlayerStats(longestK, "topLongestKill")}
                        </div>
                    </div>
                    <div className={styles.section}>
                        <h2>
                            Tiempo de juego
                            <br />
                            El sin vida
                        </h2>
                        <div
                            onClick={() =>
                                handleOpenPlayerOverview(maxPlayTime)
                            }
                        >
                            <img
                                className={styles.imgs}
                                src={nolife}
                                alt="Descripción de la imagen"
                                width="300"
                                height="200"
                            />
                            <h3 className={styles.player}>
                                {maxPlayTime.name}
                            </h3>
                            {renderPlayerStats(maxPlayTime, "topPlaytime")}
                        </div>
                    </div>
                    {selectedPlayer && (
                        <div className={styles.playerOverview}>
                            <button
                                className={styles.close}
                                onClick={handleClosePlayerOverview}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-x-octagon"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1z" />
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg>
                            </button>
                            <PlayerStatOverview stats={selectedPlayer} />
                        </div>
                    )}
                </div>
            </Layout>
        </>
    );
}

HallOfFame.propTypes = {
    topPlayers: PropTypes.object.isRequired,
};

const steamRegex = /^[0-9]{17}$/g;
const cftoolsIdRegex = /^[0-9a-zA-Z]{24}$/g;

export async function getServerSideProps({ query }) {
    // Definir constantes para las estadísticas
    const statistic = {
        KILLS: Statistic.KILLS,
        KILL_DEATH_RATIO: Statistic.KILL_DEATH_RATIO,
        PLAYTIME: Statistic.PLAYTIME,
        LONGEST_KILL: Statistic.LONGEST_KILL,
    };

    const serverApiId = new ServerApiId(process.env.CFTOOLS_SERVER_API_ID);
    let playerStats = null;

    // Obtener detalles del jugador si está presente en el query
    if (query.player) {
        const isSteam64Query = query.player.match(steamRegex);
        const isCftoolsIdQuery = query.player.match(cftoolsIdRegex);
        try {
            if (isSteam64Query) {
                playerStats = await backendCftClient.getPlayerDetails({
                    playerId: new SteamId64(query.player),
                    serverApiId,
                });
            } else if (isCftoolsIdQuery) {
                playerStats = await backendCftClient.getPlayerDetails({
                    playerId: new CFToolsId(query.player),
                    serverApiId,
                });
            }
        } catch {
            // Si hay un error al obtener los datos, usamos los datos de TopPlayers.js
            playerStats = null;
        }
    }

    // Función para obtener el leaderboard según la estadística
    const getLeaderboard = async (stat) => {
        let res = await backendCftClient.getLeaderboard({
            order: "ASC",
            statistic: stat,
            limit: 100,
            serverApiId,
        });

        if (
            BLACKLISTED_CFTOOLS_IDS &&
            Array.isArray(BLACKLISTED_CFTOOLS_IDS) &&
            BLACKLISTED_CFTOOLS_IDS[0]
        ) {
            const filteredRes = res.filter(
                ({ id }) => !BLACKLISTED_CFTOOLS_IDS.includes(id)
            );

            if (res.length !== filteredRes.length) {
                res = filteredRes.map((stats, index) => ({
                    ...stats,
                    rank: index + 1,
                }));
            }
            if (
                playerStats &&
                ALLOW_PLAYER_STATISTICS_FOR_BLACKLIST === false &&
                (BLACKLISTED_CFTOOLS_IDS.includes(query.player) ||
                    BLACKLISTED_CFTOOLS_IDS.includes(playerStats.id))
            ) {
                playerStats = null;
            }
        }

        return res.map((stats) => {
            if (stats.id.id) stats.id = stats.id.id;
            for (const key in stats) {
                if (stats[key] === undefined) stats[key] = null;
            }
            return stats;
        });
    };

    // Inicializar `topPlayers` con valores predeterminados (Si hay un error, se utilizarán estos datos)
    let topPlayersData = {
        topKills: TopPlayers.topKills || [],
        topLongestKill: TopPlayers.topLongestKill || [],
        topPlaytime: TopPlayers.topPlaytime || [],
        topKDRatio: TopPlayers.topKDRatio || [],
    };

    // Obtener los datos del leaderboard según cada estadística
    try {
        const killsLeaderboard = await getLeaderboard(statistic.KILLS);
        const longestKillLeaderboard = await getLeaderboard(
            statistic.LONGEST_KILL
        );
        const playtimeLeaderboard = await getLeaderboard(statistic.PLAYTIME);
        const kdRatioLeaderboard = await getLeaderboard(
            statistic.KILL_DEATH_RATIO
        );

        // Clasificación de jugadores según diferentes estadísticas
        topPlayersData.topKills = [...killsLeaderboard]
            .sort((a, b) => b.kills - a.kills)
            .slice(0, 3);
        topPlayersData.topLongestKill = [...longestKillLeaderboard]
            .sort((a, b) => b.longestKill - a.longestKill)
            .slice(0, 1);
        topPlayersData.topPlaytime = playtimeLeaderboard
            .sort((a, b) => b.playtime - a.playtime)
            .slice(0, 1);
        topPlayersData.topKDRatio = [...kdRatioLeaderboard].sort(
            (a, b) => b.killDeathRatio - a.killDeathRatio
        );
    } catch {
        // Si ocurre un error al obtener los datos del servidor, se usan los valores predeterminados de `TopPlayers.js`
    }

    return {
        props: {
            topPlayers: topPlayersData, // Usamos los datos de `TopPlayers.js` como respaldo
        },
    };
}
