import React, { useState } from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import PlayerStatOverview from "./PlayerStatOverview";
import "../styles/LeaderboardTable.module.css";
import styles from "../styles/LeaderboardTable.module.css";

const LeaderboardTable = ({ data }) => {
	const [selectedPlayer, setSelectedPlayer] = useState(null);

	const handleRowClick = (player) => {
		setSelectedPlayer(player);
	};

	const handleCloseOverview = () => {
		setSelectedPlayer(null);
	};

	return (
		<div>
			<Table className={styles.Body}>
				<thead>
					<tr>
						<th>Rango</th>
						<th>Nombre</th>
						<th>Asesinatos</th>
						<th>Muertes</th>
						<th>Asesinatos/muertes</th>
						<th>Asesinato más distante</th>
						<th>Tiempo de juego</th>
						<th>Suicidios</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((stats) => (
						<tr
							key={stats.id}
							onClick={() => handleRowClick(stats)}
						>
							<td>{stats.rank}</td>
							<td>{stats.name}</td>
							<td>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="red"
									className="bi bi-crosshair"
									viewBox="0 0 16 16"
								>
									<path d="M8.5.5a.5.5 0 0 0-1 0v.518A7 7 0 0 0 1.018 7.5H.5a.5.5 0 0 0 0 1h.518A7 7 0 0 0 7.5 14.982v.518a.5.5 0 0 0 1 0v-.518A7 7 0 0 0 14.982 8.5h.518a.5.5 0 0 0 0-1h-.518A7 7 0 0 0 8.5 1.018zm-6.48 7A6 6 0 0 1 7.5 2.02v.48a.5.5 0 0 0 1 0v-.48a6 6 0 0 1 5.48 5.48h-.48a.5.5 0 0 0 0 1h.48a6 6 0 0 1-5.48 5.48v-.48a.5.5 0 0 0-1 0v.48A6 6 0 0 1 2.02 8.5h.48a.5.5 0 0 0 0-1zM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
								</svg>
								{stats.kills}
							</td>
							<td> ☠ {stats.deaths}</td>
							<td>➗ {stats.killDeathRatio}</td>
							<td>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="red"
									className="bi bi-bullseye"
									viewBox="0 0 16 16"
								>
									<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
									<path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10m0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
									<path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8" />
									<path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
								</svg>
								{stats.longestKill}
							</td>
							<td>⌚{Math.trunc(stats.playtime / 60 / 60)}hs</td>
							<td>🔪{stats.suicides}</td>
						</tr>
					))}
				</tbody>
			</Table>
			{selectedPlayer && (
				<div className={styles.PlayerOverviewCard}>
					<button
						onClick={handleCloseOverview}
						className={styles.close}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-x-octagon"
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
	);
};

LeaderboardTable.propTypes = {
	data: PropTypes.array.isRequired,
};

export default LeaderboardTable;
