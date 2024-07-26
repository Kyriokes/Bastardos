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
				return <p>Kills: {player.kills}</p>;
			case "topLongestKill":
				return <p>Longest Kill: {player.longestKill}</p>;
			case "topKDRatio":
				return <p>K/D Ratio: {player.killDeathRatio}</p>;
			case "topPlaytime":
				return <p>Playtime: {player.playtime}</p>;
			default:
				return <p>Stats: {player.stats}</p>;
		}
	};

	return (
		<>
			<SEO subTitle={"Hall of Fame"} />
			<Layout>
				<div className={styles.container}>
					{/* <h1 className={styles.title}>Salón de la Fama</h1> */}
					<div className={styles.sections}>
						{Object.entries(topPlayers).map(([category, players]) => (
							<div key={category} className={styles.section}>
								<h2 className={styles.categoryTitle}>
									{category.replace(/([A-Z])/g, ' $1').toUpperCase()}
								</h2>
								{players.map((player) => (
									<div
										key={player.id}
										className={styles.playerCard}
										onClick={() => handleOpenPlayerOverview(player)}
									>
										<h3>{player.name}</h3>
										{renderPlayerStats(player, category)}
									</div>
								))}
							</div>
						))}
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
	const topKDRatio = [...hf]
		.sort((a, b) => b.killDeathRatio - a.killDeathRatio)
		.slice(0, 1);
	const filterByPlaytime = hf.filter((player) => player.playtime > 216000); // 60 days in seconds
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