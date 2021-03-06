import React, { Component, PropTypes } from 'react';
import { Block, Flex } from 'jsxstyle';
import { connect } from 'react-redux';
import { play, remove, toggleLock, updateSound } from './actions';
import Button from './Button';
import Center from './Center';

function preventDefaultAnd(handler) {
  return (e) => {
    e.preventDefault();
    handler(e);
  };
}

class App extends Component {
  componentDidMount() {
    const { play } = this.props;

    window.addEventListener('keydown', e => {
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
        return;
      }

      const charCode = e.charCode || e.which || e.keyCode;
      const key = String.fromCharCode(charCode).toUpperCase();

      if (key.match(/[A-Z]/)) {
        play(key);
      }
    });
  }

  render() {
    const {
      play, remove, toggleLock, updateSound,
      pressedChars, isLocked, colors
    } = this.props;
    return (
      <Block fontFamily='Helvetica, Arial, sans-serif'>
        <Center width='100vw' height='100vh'>
          {Object.keys(colors).some(char => colors[char]) && pressedChars.length > 0 &&
            <Block position='absolute'
                   right='1rem'
                   top='1rem'>
              <a href='#' onClick={preventDefaultAnd(toggleLock)}>
                {isLocked ? 'Edit' : 'Done'}
              </a>
            </Block>
          }
          <Center>
            {pressedChars.map((char, index) =>
              (!isLocked || colors[char]) ?
                <Button key={char}
                        char={char}
                        onClick={play}
                        onDeleteClick={remove}
                        updateSound={updateSound}
                        isLocked={isLocked}
                        color={colors[char]} /> :
                null
            )}
            {pressedChars.length === 0 &&
              <h1>
                Type alphabetic keys to create buttons!
              </h1>
            }
          </Center>
        </Center>
      </Block>
    );
  }
}

function mapStateToProps(state) {
  return {
    pressedChars: state.pressedChars,
    isLocked: state.isLocked,
    colors: state.colors
  };
}

export default connect(mapStateToProps, {
  play,
  remove,
  toggleLock,
  updateSound
})(App);
