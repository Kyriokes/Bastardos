import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";

import SEO from "../components/SEO";
import Layout from "../components/Layout";

import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<>
			<SEO subTitle={"DayZ Leaderboard"} />
			<Layout>
				<Container>
					<main className={styles.main}></main>
				</Container>
			</Layout>
		</>
	);
}
