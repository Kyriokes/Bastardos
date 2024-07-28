import Container from "react-bootstrap/Container";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import styles from "../styles/Rules.module.css"; // Ensure you have a corresponding CSS module
import { useState } from "react";

export default function Rules() {
	const [rules, setRules] = useState({
		one: false,
		two: false,
		three: false,
		four: false,
		five: false,
		six: false,
		seven: false,
		eight: false,
		nine: false,
		ten: false,
		eleven: false,
	});

	const rulesToggleBox = (x) => {
		setRules({ ...rules, [x]: !rules[x] });
	};

	const renderToggleIcon = (isOpen) => {
		return isOpen ? (
			<svg
				className={styles.sectionButton}
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
				/>
			</svg>
		) : (
			<svg
				className={styles.sectionButton}
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
				/>
			</svg>
		);
	};

	return (
		<>
			<SEO subTitle={"DayZ Rules"} />
			<Layout>
				<Container>
					<main className={styles.main}>
						<h1 className={styles.title}>Reglas del Servidor</h1>

						<section className={styles.section}>
							<div
								onClick={() => rulesToggleBox("one")}
								className={styles.sectionTitle}
							>
								<h2>Reglas Generales</h2>
								{renderToggleIcon(rules.one)}
							</div>
							{rules.one && (
								<ul className={styles.ruleList}>
									<li>
										No insultos racistas, sexistas,
										xenófobos en el canal de discord.
									</li>
									<li>No promocionar otros servidores.</li>
									<li>No Combat log.</li>
									<li>
										No Abuso de bugs/glitch/problemas del
										juego, del mod o del servidor.
									</li>
									<li>
										Prohibido cualquier uso de trampas,
										cheats u otro mecanismo ilegal para
										sacar ventaja del juego (ESP es
										totalmente prohibido).
									</li>
									<li>
										Al momento de unirte al servidor eres
										100% responsable de leer las reglas,
										cumplir, compartir y no abusar de ellas.
									</li>
									<li>
										BASTARDOS se reserva el derecho de
										admisión.
									</li>
									<li>
										Todos los grupos de más de 3 jugadores
										deben utilizar CLAN/TAG.
									</li>
									<li>
										Un miembro del clan deberá crear un
										TICKET y se hará cargo como
										responsable/representante del clan.
									</li>
									<li>
										En este ticket deberá identificar los
										miembros de su Clan.
									</li>
									<li>
										Recordar que las party(Equipo) están
										limitadas a 6 (seis) jugadores y
										territorios 12 (doce) jugadores.
									</li>
									<li>
										Si existe un reporte de esto se
										procederá a sancionar al jugador
										involucrado según indique el medidor de
										sanciones.
									</li>
								</ul>
							)}
						</section>

						<section className={styles.section}>
							<div
								onClick={() => rulesToggleBox("two")}
								className={styles.sectionTitle}
							>
								<h2>Reglas Ingame</h2>
								{renderToggleIcon(rules.two)}
							</div>
							{rules.two && (
								<ul className={styles.ruleList}>
									<li>
										Cualquier abuso de las mecánicas del
										juego será sancionado y quedará a
										criterio de la administración.
									</li>
									<li>
										Ejemplos:
										<ul>
											<li>Ciclar Loot</li>
											<li>
												Intentar ver a través de una
												pared (Vortex)
											</li>
											<li>
												Cualquier error de renderizado
												no puede ser usado para sacar
												ventajas.
											</li>
										</ul>
									</li>
									<li>
										Eres 100% responsable de tus vehículos y
										cómo los usas. En caso de problemas con
										el mismo no se repondrá nada si no
										tienes PRUEBAS o EVIDENCIAS
										satisfactorias (fotos o video).
									</li>
									<li>
										Eres 100% responsable de todo tu loot
										personal y los accesorios de tu base. Si
										algo de esto se pierde por cualquier
										motivo, los administradores no se harán
										responsables de cualquier tipo de bug o
										error cometido in game y no te será
										devuelto nada si no tienes PRUEBAS o
										EVIDENCIAS satisfactorias (fotos o
										video).
									</li>
									<li>
										NO se permiten alianzas entre
										grupos/equipos.
									</li>
									<li>
										No puedes tener acceso a una base
										diferente a la que ya has creado/unido
										en territorio. (En caso de que veamos un
										acceso a otra base o sea reportado, será
										sancionado con ban de 48 Hrs. Si esta
										conducta es reiterativa se aplicará BAN
										a ambos equipos.)
									</li>
									<li>
										Las cuentas ALT o secundarias están
										prohibidas en el servidor. Si son
										cuentas diferentes con diferentes
										usuarios pero conectados desde la misma
										PC deberán hacer ticket con la
										respectiva evidencia.
									</li>
									<li>
										El Boconeo/Pica en el chat está
										permitido siempre y cuando sea en pos de
										generar competencia. Cualquier
										comentario que se vaya por el lado de la
										xenofobia, racismo, temas personales,
										será advertido primeramente. En caso de
										no deplorar actitudes, se procederá a
										sancionar a/los jugador/es según el
										medidor de sanciones vigente.
									</li>
								</ul>
							)}
						</section>

						<section className={styles.section}>
							<div
								onClick={() => rulesToggleBox("three")}
								className={styles.sectionTitle}
							>
								<h2>
									Reglas de Construcción (Base Building Plus)
								</h2>
								{renderToggleIcon(rules.three)}
							</div>
							{rules.three && (
								<ul className={styles.ruleList}>
									<li>
										Solo 1 base por clan. No FOBs, no
										Garajes apartados.
									</li>
									<li>
										Si el territorio permite la
										construcción, la base es válida.
									</li>
									<li>
										Máximo 8 puertas/portones/trampillas.
									</li>
									<li>
										No superar la cantidad máxima de
										codelocks por puerta o será eliminado el
										codelock sin previo aviso por el admin.
									</li>
									<li>
										No se permiten
										puertas/portones/trampillas/ventanas
										superpuestas.
									</li>
									<li>
										No se permiten bases flotantes de ningún
										tipo. Tu base tiene que ser accesible a
										pie.
									</li>
									<li>
										No se permite cerrar con pared para
										evitar el raideo.
									</li>
									<li>
										Bases acuáticas son legales, siempre y
										cuando el PJ llegue haciendo pie a la
										entrada.
									</li>
									<li>
										Si tu base es 100% BBP, el máximo es 27
										cubículos de superficie pero el interior
										es sin límite, ej.: 3x3x3, etc.
									</li>
									<li>
										Prohibido la construcción de pasillos de
										la muerte/rompepatas (picks sobre los
										pies).
									</li>
									<li>
										Un máximo de 3 módulos de Largo, x 3 de
										Ancho y x 3 de Alto y/o distribuirlos
										como estime conveniente sin superar los
										3 de Alto.
									</li>
									<li>
										Si armas tu base sobre una
										estructura/edificio vanilla debe ser
										solamente dentro de la misma, nada por
										fuera.
									</li>
									<li>
										Podrás construir solamente un garaje en
										el exterior (2x1). SIN EXCEPCIONES.
									</li>
									<li>
										En caso de construir sobre una
										estructura vanilla, tienes derecho a
										construir un helipuerto en caso de
										necesitarlo. El mismo solo servirá como
										helipuerto. Prohibido el uso para
										almacenamiento de loot de cualquier tipo
										y/o defensa desde el mismo lugar.
									</li>
									<li>
										El Administrador eliminará el nivel
										fuera de los límites, sin derecho a un
										reclamo posterior.
									</li>
									<li>
										El acceso y el tránsito en la base debe
										ser totalmente libre sin hacer
										animaciones ni colocar objetos (no
										saltar ningún obstáculo, no subir
										escaleras de mano, no pasar rodando, ni
										colocar alambres de púa, etc.).
									</li>
									<li>
										Construir una pared suelta a modo de
										cobertura está permitido, sin embargo no
										se puede cerrar un cubo completo fuera
										de una base.
									</li>
									<li>
										Cualquier base que se encuentre
										construida irregular será borrada sin
										previo aviso.
									</li>
									<li>
										Base tiene que tener libre acceso; se
										permiten pasillos, trampillas, ventanas
										con codelocks, etc.
									</li>
								</ul>
							)}
						</section>

						<section className={styles.section}>
							<div
								onClick={() => rulesToggleBox("four")}
								className={styles.sectionTitle}
							>
								<h2>Ataque</h2>
								{renderToggleIcon(rules.four)}
							</div>
							{rules.four && (
								<ul className={styles.ruleList}>
									<li>
										El raideo puede ser por toda estructura
										que contenga un CODELOCK, esto aplica
										para puertas. (VERIFICAR REGLA 3 de
										Construcción)
									</li>
									<li>
										Graba el raideo (Si no tienes suficiente
										PC para poder hacerlo, se admiten
										pruebas grabadas con celular).
									</li>
									<li>No puedes desloguear en base ajena.</li>
									<li>
										No puedes bloquear puertas en bases
										enemigas.
									</li>
									<li>
										No puedes destruir loot y muebles sin
										sentido (se podrá destruir armamento
										para evitar que el enemigo lo use).
										Cualquier actitud tóxica sobre
										destrucción de bases será sancionada.
									</li>
									<li>
										No puedes ocupar una base raideada. Los
										ocupantes no podrán bajo ningún término
										colocar un mástil en la base
										enemiga/raideada. AVISO: EN CASO DE
										COLOCAR UN MÁSTIL, SE ANULARÁ RAIDEO Y
										SE PROCEDERÁ A BANEAR A INFRACTORES
										(GRUPO COMPLETO).
									</li>
									<li>
										No puedes raidear desde el techo
										llegando con helicóptero. Sin embargo,
										se permite su uso una vez se haya
										accedido al techo desde adentro de la
										base.
									</li>
									<li>
										No puedes usar ninguna animación que
										deje ver a través de las paredes.
									</li>
									<li>
										Se puede boostear para saltar dentro de
										la base, máximo 1 objeto/mueble/auto,
										pila humana sin límite.
									</li>
									<li>
										Se puede entrar por ventanas o errores
										de construcción, incluso si no parece
										físicamente posible, siempre y cuando no
										fuerces hitbox o hagas animaciones
										forzadas para lograrlo.
									</li>
									<li>
										Se puede lootear objetos si su
										inventario se ve por fuera de la pared.
									</li>
									<li>
										No se puede colocar mástil en territorio
										enemigo bajo ninguna circunstancia.
									</li>
									<li>
										No se puede usar el helicóptero como
										objeto para boost de altura.
									</li>
								</ul>
							)}
						</section>

						<section className={styles.section}>
							<div
								onClick={() => rulesToggleBox("five")}
								className={styles.sectionTitle}
							>
								<h2>Defensa</h2>
								{renderToggleIcon(rules.five)}
							</div>
							{rules.five && (
								<ul className={styles.ruleList}>
									<li>
										No puedes desloguear si te están
										raideando; si te tienes que ir por
										fuerzas mayores tendrás que dejarte
										matar por el atacante. (Para evitar
										sospecha de deslogueo con loot en el
										inventario).
									</li>
									<li>
										No puedes construir mientras estés
										siendo atacado. (Puedes reparar o
										reconstruir 60 minutos después de la
										última explosión).
									</li>
									<li>
										No puedes usar ninguna animación que
										deje ver a través de las paredes.
									</li>
									<li>
										Si se cae el servidor, reinicia, o el
										jugador pierde la conexión, debe volver
										a conectarse (se compromete con la regla
										D.11).
									</li>
									<li>
										Si un admin te está ayudando y comienzan
										a raidearte, simplemente se retira.
									</li>
									<li>
										Revisar Regla General N°6; No puedes
										utilizar Bugs para defender tu base,
										esto aplica para todos los bugs. Se
										aplicarán sanciones inmediatas por
										players; si la conducta es reiterativa,
										se pasará a sancionar al equipo.
									</li>
								</ul>
							)}
						</section>

						<section className={styles.section}>
							<div
								onClick={() => rulesToggleBox("six")}
								className={styles.sectionTitle}
							>
								<h2>Trader</h2>
								{renderToggleIcon(rules.six)}
							</div>
							{rules.six && (
								<ul className={styles.ruleList}>
									<li>
										Eres 100% responsable de tu loot; no
										reponemos ítems descartados al suelo; no
										tires tus ítems al suelo.
									</li>
									<li>
										No está permitido ROBAR LOOT dentro de
										Safezone (aplica a Vehículos, players
										enfermos, dormidos, etc.).
									</li>
									<li>
										Si se encuentra un error que da dinero
										infinito, debes informarlo al Staff (el
										uso puede ser sancionado).
									</li>
									<li>
										Los intercambios entre jugadores son
										bajo su propio riesgo. (Para evitar
										estafas está el Trades P2P en Safezone).
									</li>
									<li>No obstruir entradas al Safezone.</li>
									<li>
										Está totalmente prohibido robar
										vehículos dentro de las zonas seguras o
										quitarles piezas, ya sea loot o partes
										del vehículo.
									</li>
									<li>
										Solo se puede dejar el auto en Safezone,
										mientras estás comprando o haciendo uso
										de los traders. (Cualquier vehículo en
										safezone que esté inactivo, será
										eliminado).
									</li>
									<li>
										No está permitido dejar tu auto dentro
										de Safezone (Cualquier vehículo en
										safezone que esté inactivo, será
										eliminado, sin posibilidad de reclamos.
										No hay excepciones).
									</li>
									<li>
										No está permitido empujar o arrastrar
										vehículos ajenos a tu persona. (Esta
										conducta será tomada en cuenta como
										tóxica y por ende sancionada según lo
										amerite el código de conducta).
									</li>
								</ul>
							)}
						</section>

						<section className={styles.section}>
							<div
								onClick={() => rulesToggleBox("seven")}
								className={styles.sectionTitle}
							>
								<h2>Reportes</h2>
								{renderToggleIcon(rules.seven)}
							</div>
							{rules.seven && (
								<ul className={styles.ruleList}>
									<li>
										Todos los reclamos, reportes y problemas
										deberán resolverse y solicitarse a
										través del sistema de soporte de Discord
										vía TICKET. Los mensajes privados o
										mensajes dentro del juego no son
										aceptados.
									</li>
								</ul>
							)}
						</section>

						<section className={styles.section}>
							<div
								onClick={() => rulesToggleBox("eight")}
								className={styles.sectionTitle}
							>
								<h2>Misiones-Quest</h2>
								{renderToggleIcon(rules.eight)}
							</div>
							{rules.eight && (
								<ul className={styles.ruleList}>
									<li>
										Está totalmente prohibido hacer TeamKill
										para completar las Quest. Si nosotros
										vemos este comportamiento, aplicaremos
										sanción sin dudarlo.
									</li>
									<li>
										La Quest de PvP es justamente para
										aplicarla contra otros jugadores. Si lo
										hacen contra su propio team no tiene
										sentido y le quita toda la gracia.
									</li>
								</ul>
							)}
						</section>

						<section className={styles.section}>
							<div
								onClick={() => rulesToggleBox("nine")}
								className={styles.sectionTitle}
							>
								<h2>Cambios en Clanes</h2>
								{renderToggleIcon(rules.nine)}
							</div>
							{rules.nine && (
								<ul className={styles.ruleList}>
									<li>
										Todo jugador que decida abandonar su
										clan actual e ingresar a uno nuevo podrá
										hacerlo sin restricciones. Sin embargo,
										cualquier jugador que, tras cambiar de
										clan, realice prácticas de traición o
										"inside" (acciones intencionales que
										perjudiquen al clan desde adentro), será
										baneado permanentemente del servidor.
									</li>
									<li>
										Esta medida busca mantener la integridad
										y el espíritu competitivo del juego.
									</li>
								</ul>
							)}
						</section>

						<section className={styles.section}>
							<div
								onClick={() => rulesToggleBox("ten")}
								className={styles.sectionTitle}
							>
								<h2>Reglas de Raid-Horarios</h2>
								{renderToggleIcon(rules.ten)}
							</div>
							{rules.ten && (
								<ul className={styles.ruleList}>
									<li>
										Con C4 los raids comenzarán los días:
										<ul>
											<li>
												Viernes de 18:00 hrs a Sábado
												03:00 hrs
											</li>
											<li>
												Sábado de 10:00 hrs a Domingo
												03:00 hrs
											</li>
											<li>
												Domingo de 10:00 hrs a Domingo
												23:59 hrs
											</li>
										</ul>
									</li>
									<li>
										Con C4: Tiempo de colocación del C4; 60
										segundos. Tiempo de la explosión 10
										minutos.
									</li>
									<li>
										Horario:
										<ul>
											<li>
												El raid hacia vehículos está
												permitido 24/7. Recuerden que es
												un 50% de probabilidad de abrir
												el vehículo.
											</li>
											<li>
												Por error de construcción/puerta
												abierta 24/7.
											</li>
										</ul>
									</li>
								</ul>
							)}
						</section>

						<section className={styles.section}>
							<div
								onClick={() => rulesToggleBox("eleven")}
								className={styles.sectionTitle}
							>
								<h2>Regla de Picks 50/50</h2>
								{renderToggleIcon(rules.eleven)}
							</div>
							{rules.eleven && (
								<ul className={styles.ruleList}>
									<li>
										Esta temporada se ha implementado la
										regla de "Picks 50/50". Esto significa
										que tanto las bases como los picks deben
										estar equilibrados, garantizando que
										ambos equipos tengan las mismas
										oportunidades de eliminarse mutuamente.
										La intención de esta regla es asegurar
										una experiencia de juego más justa y
										agradable, evitando situaciones en las
										que los picks solo disparan a los pies o
										hacen que los raids sean imposibles de
										completar.
									</li>
									<li>
										Esta normativa se discutió al inicio del
										wipe con los líderes de los clanes. Sin
										embargo, debido a la incorporación de
										muchos clanes nuevos, es necesario
										reiterarla.
									</li>
								</ul>
							)}
						</section>
					</main>
				</Container>
			</Layout>
		</>
	);
}
