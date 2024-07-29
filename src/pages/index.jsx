import { useRef, useEffect } from "react";
import Container from "react-bootstrap/Container";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<>
			<SEO subTitle={"DayZ Leaderboard"} />
			<Layout>
				<Container>
					<video
						src="/video.mp4"
						autoPlay
						muted
						loop
						className={styles.video}
					/>
					<main className={styles.main}>
						<div className={styles.textBox}>
						<h1 className={styles.title}>¡Bienvenidos a Bastardos!</h1>
						<section>
							<p className={styles.list}>
								¡Saludos, sobrevivientes! 🌟 En{" "}
								<strong>Bastardos</strong>, hemos
								creado un refugio para los jugadores apasionados
								de DayZ que buscan una experiencia auténtica,
								desafiante y, sobre todo, divertida. Nuestro
								servidor está diseñado para ofrecerte la mejor
								combinación de supervivencia, comunidad y
								aventura en el corazón de Latam.
							</p>
						</section>
						<section>
							<h2 className={styles.title}>¿Qué puedes esperar?</h2>
							<ul>
								<li>
									<h3 className={styles.title}>🔥 Acción y Aventura</h3>
									<p className={styles.list}>
										Sumérgete en una experiencia de juego
										intensa con eventos emocionantes y
										desafíos que pondrán a prueba tus
										habilidades de supervivencia.
									</p>
								</li>
								<li>
									<h3 className={styles.title}>🤝 Comunidad Unida</h3>
									<p className={styles.list}>
										Únete a un grupo de jugadores
										apasionados que comparten tus mismas
										ganas de conquistar el apocalipsis.
										Aquí, cada encuentro es una oportunidad
										para formar alianzas, intercambiar
										historias y construir recuerdos
										inolvidables.
									</p>
								</li>
								<li>
									<h3 className={styles.title}>🔧 Configuración Personalizada</h3>
									<p className={styles.list}>
										Disfruta de un entorno adaptado a tu
										estilo de juego con ajustes y mods que
										enriquecen la experiencia sin perder la
										esencia del juego.
									</p>
								</li>
								<li>
									<h3 className={styles.title}>🛠️ Soporte Activo</h3>
									<p className={styles.list}>
										Nuestro equipo está siempre disponible
										para ayudarte con cualquier problema y
										asegurar que tu experiencia sea fluida y
										divertida.
									</p>
								</li>
							</ul>
						</section>
						<section>
							<h2 className={styles.title}>¡Prepárate para la Aventura!</h2>
							<p className={styles.list}>
								¡Así que ajusta tu mochila, afila tu hacha y
								prepárate para una travesía épica! En{" "}
								<strong>Bastardos</strong>, cada día
								es una nueva oportunidad para sobrevivir y
								prosperar en el mundo post-apocalíptico. ¡Nos
								vemos en el campo de batalla!
							</p>
						</section>
						<p className={styles.list}>
							<strong >
								¡Bienvenido a la familia, sobreviviente!
							</strong>
						</p>
						</div>
					</main>
				</Container>
			</Layout>
		</>
	);
}
