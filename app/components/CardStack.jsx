import React from 'react';
import World from './World.jsx';
import Card from './Card.jsx';
import IconText from './IconText.jsx';
import GitHub from './GitHub.jsx';

export default class CardStack extends React.Component {
  render () {
    const messages = this.props.messages;
    const renderMessages = messages.map(message =>
      <Card key={message.id} message={message.txt} />
    );

    const gridClass = 'grid grid-gutters grid-full grid-flex-cells large-grid-fit u-textCenter';

    return (
      <div>
        <div className={gridClass}>
          <Card><GitHub repo="facebook/react" /></Card>
          <Card><GitHub repo="angular/angular.js" /></Card>
          <Card><IconText className="blue" icon="globe" size="2x" text="Nine Component Creation Strategies" /></Card>
          <Card><IconText icon="cog" size="2x" text="Nine Custom Component" /></Card>
          <Card><IconText className="red" icon="database" size="2x" text="Firebase React Integration" /></Card>
          <Card><World /></Card>
          {renderMessages}
        </div>
      </div>
    );
  }
}

CardStack.propTypes = {
  messages: React.PropTypes.array.isRequired,
}

CardStack.defaultProps = {
  messages: [
    {id: 1, txt: 'React Speed UI'},
    {id: 2, txt: 'Single Page Apps'},
    {id: 3, txt: 'Responsive Design'},
    {id: 4, txt: 'Customizable Theme'},
    {id: 5, txt: 'Reusable Components'},
    {id: 6, txt: 'Simple Structure'},
    {id: 7, txt: 'Production Optimized'},
    {id: 8, txt: 'State Machine'},
    {id: 9, txt: 'Expressive Syntax'},
  ],
}
