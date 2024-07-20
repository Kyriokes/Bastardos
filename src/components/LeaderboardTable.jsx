import Table from 'react-bootstrap/Table';
import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Leaderboard.module.css';
import styles from '../styles/Leaderboard.module.css';
import PlayerStatOverview from './PlayerStatOverview';

const LeaderboardTable = ({ data }) => {
  return (
    <Table striped bordered hover responsive className={styles.accordion}>
      <thead>
        <tr>
          <th>Rango</th>
          <th>Nombre</th>
          <th>Asesinatos</th>
          <th>Muertes</th>
          <th>Relación asesinatos/muertes</th>
          <th>Asesinato más distante</th>
          <th>Disparo más lejano</th>
          <th>Tiempo de juego</th>
          <th>Suicidios</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((stats) => (
          <tr key={stats.id}>
            <td>{stats.rank}</td>
            <td>{stats.name}</td>
            <td>{stats.kills}</td>
            <td>{stats.deaths}</td>
            <td>{stats.kdratio}</td>
            <td>{stats.longest_kill}</td>
            <td>{stats.longest_shot}</td>
            <td>{stats.playtime}</td>
            <td>{stats.suicides}</td>
            {/* <td>
              <PlayerStatOverview stats={stats} />
            </td> */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

LeaderboardTable.propTypes = {
  data: PropTypes.array.isRequired
};

export default LeaderboardTable;
