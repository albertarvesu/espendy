import * as React from 'react';

class Home extends React.Component {
  componentDidMount() {
    document.body.classList.remove('landing');
  }
  render () {
    return (
      <div>
        Hello
      </div>
    );
  }
}

export default Home;