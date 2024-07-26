import React from "react";
import PropTypes from "prop-types";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../styles/Leaderboard.module.css";

const PlayerStatOverview = ({ stats }) => {
	const deaths =
		(typeof stats.deaths === "object"
			? stats.deaths.other
			: stats.deaths) ?? 0;
	const kdratio = stats.kdratio ?? stats.killDeathRatio;
	const suicides = stats.suicides ?? stats.deaths?.suicides ?? 0;
	return (
		<Container>
			<h3 style={{ textAlign: "center" }}>{stats.name}</h3>
			<Row>
				<Col>
					<i
						className="fa fa-crosshairs"
						aria-hidden="true"
						style={{ color: "red" }}
					/>{" "}
					{stats.kills || 0} Asesinatos
				</Col>
				<Col>☠ {deaths} Muertes</Col>
				<Col>➗ {kdratio} Relación asesinatos/muertes</Col>
			</Row>
			<Row>
				<Col>
					<i
						className="fa fa-bullseye"
						aria-hidden="true"
						style={{ color: "red" }}
					/>{" "}
					{stats.hits || 0} Golpes
				</Col>
				<Col>
					<i
						className="fa fa-bullseye"
						aria-hidden="true"
						style={{ color: "red" }}
					/>{" "}
					Asesinato más distante: {stats.longestKill || 0}m
				</Col>
				<Col>
					<i
						className="fa fa-bullseye"
						aria-hidden="true"
						style={{ color: "red" }}
					/>{" "}
					Tiro más lejano: {stats.longestShot || 0}m
				</Col>
			</Row>
			<Row
				style={{
					padding: "1em 0",
				}}
			>
				<Col>🔪 {suicides} Suicidios</Col>
			</Row>
			<Row
				style={{
					marginTop: "-.7em",
				}}
			>
				<Col>
					⌚ Tiempo de juego:{" "}
					{Number(stats.playtime / 60 / 60).toFixed(2) || 0} Horas
				</Col>
			</Row>
		</Container>
	);
};

PlayerStatOverview.propTypes = {
	stats: PropTypes.object,
};

export default PlayerStatOverview;
