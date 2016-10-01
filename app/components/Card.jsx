import React from 'react';

export default function Card(props) {
  const cardClass = props.message ? 'card is-message': 'card';
  const gridClass = props.size ? `grid-cell u-${props.size}`: `grid-cell`;

  return (
    <div className={gridClass}>
      <div className={cardClass}>
        <h3>{props.message}</h3>
        {props.children}
      </div>
    </div>
  );
}
