import Link from "next/link";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { CFToolsId, ServerApiId, Statistic, SteamId64 } from "cftools-sdk";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import PlayerStatOverview from '../components/PlayerStatOverview'; 
import styles from "../styles/HallOfFame.module.css";
import backendCftClient from "../helpers/cftClient";

const LEADERBOARD_ALLOWED_SORT_VALUES = [
  "kills",
  "deaths",
  "kdratio",
  "longest_kill",
  "longest_shot",
  "playtime",
  "suicides",
];

const BLACKLISTED_CFTOOLS_IDS = [];
const ALLOW_PLAYER_STATISTICS_FOR_BLACKLIST = false;

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
        return <p>Tiempo de Juego: {Math.trunc((player.playtime)/60/60)}hs</p>;
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
          {/* Podium for top 3 players in kills */}
          <div className={styles.podium}>
            <div
              className={`${styles.player} ${styles.second}`}
              onClick={() => handleOpenPlayerOverview(top2)}
            >
              <div className={styles.name}>{top2.name}</div>
              {renderPlayerStats(top2, "topKills")}
            </div>
            <div
              className={`${styles.player} ${styles.first}`}
              onClick={() => handleOpenPlayerOverview(top1)}
            >
              <div className={styles.name}>{top1.name}</div>
              {renderPlayerStats(top1, "topKills")}
            </div>
            <div
              className={`${styles.player} ${styles.third}`}
              onClick={() => handleOpenPlayerOverview(top3)}
            >
              <div className={styles.name}>{top3.name}</div>
              {renderPlayerStats(top3, "topKills")}
            </div>
          </div>
          <div className={styles.sections}>
            <div className={styles.section}>
              <h2 className={styles.categoryTitle}>Top Playtime</h2>
              <div
                className={styles.playerCard}
                onClick={() => handleOpenPlayerOverview(maxPlayTime)}
              >
                <h3>{maxPlayTime.name}</h3>
                {renderPlayerStats(maxPlayTime, "topPlaytime")}
              </div>
            </div>
            <div className={styles.section}>
              <h2 className={styles.categoryTitle}>Longest Kill</h2>
              <div
                className={styles.playerCard}
                onClick={() => handleOpenPlayerOverview(longestK)}
              >
                <h3>{longestK.name}</h3>
                {renderPlayerStats(longestK, "topLongestKill")}
              </div>
            </div>
            <div className={styles.section}>
              <h2 className={styles.categoryTitle}>Top K/D Ratio</h2>
              <div
                className={styles.playerCard}
                onClick={() => handleOpenPlayerOverview(topKDR)}
              >
                <h3>{topKDR.name}</h3>
                {renderPlayerStats(topKDR, "topKDRatio")}
              </div>
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
    } catch {
      // Handle error
    }
  }

  let res = await backendCftClient.getLeaderboard({
    order: "ASC",
    statistic,
    limit: 100,
    serverApiId,
  });

  res = res.map((stats) => {
    if (stats.id.id) stats.id = stats.id.id;
    for (const key in stats) {
      if (stats[key] === undefined) stats[key] = null;
    }
    return stats;
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
      stats &&
      ALLOW_PLAYER_STATISTICS_FOR_BLACKLIST === false &&
      (BLACKLISTED_CFTOOLS_IDS.includes(query.player) ||
        BLACKLISTED_CFTOOLS_IDS.includes(stats.id))
    )
      stats = null;
  }

  let hf = await backendCftClient.getLeaderboard({
    order: "ASC",
    statistic,
    limit: 100,
    serverApiId,
  });

  const topKills = [...hf].sort((a, b) => b.kills - a.kills).slice(0, 3);
  const topLongestKill = [...hf]
    .sort((a, b) => b.longestKill - a.longestKill)
    .slice(0, 1);
  const filterByPlaytime = hf.filter((player) => player.playtime > 216000); // 60 days in seconds
  const topKDRatio = [...filterByPlaytime]
    .sort((a, b) => b.killDeathRatio - a.killDeathRatio)
    .slice(0, 1);
  const topPlaytime = [...filterByPlaytime]
    .sort((a, b) => b.playtime - a.playtime)
    .slice(0, 1);

  const topPlayers = {
    topKills,
    topLongestKill,
    topPlaytime,
    topKDRatio,
  };

  return {
    props: {
      topPlayers,
    },
  };
}
