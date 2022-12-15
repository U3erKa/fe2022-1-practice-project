import React from 'react';
import { Link } from 'react-router-dom';


export default function ProfileNavBar({ list, logOut }) {
  const mapList = list.map(({ id, href, text }) => (
    <li key={id}>
      <Link to={href} style={{ textDecoration: 'none' }}>
        <span>{text}</span>
      </Link>
    </li>
  ));

  return (
    <ul>
      {mapList}
      <li>
        <button onClick={logOut}>Logout</button>
      </li>
    </ul>
  );
}
