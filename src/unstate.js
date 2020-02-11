/* eslint-disable */
import React from 'react';

const StateContext = React.createContext(new Map());

export class Container {
  state;

  _listeners = [];

  constructor() {
    CONTAINER_DEBUG_CALLBACKS.forEach(cb => cb(this));
  }

  setState(
    updater,
    callback,
  ) {
    return Promise.resolve().then(() => {
      let nextState;

      if (typeof updater === 'function') {
        nextState = updater(this.state);
      } else {
        nextState = updater;
      }

      if (nextState == null) {
        if (callback) callback();
        return;
      }

      this.state = Object.assign({}, this.state, nextState);

      const promises = this._listeners.map(listener => listener());

      return Promise.all(promises).then(() => {
        if (callback) {
          return callback();
        }
      });
    });
  }

  subscribe(fn) {
    this._listeners.push(fn);
  }

  unsubscribe(fn) {
    this._listeners = this._listeners.filter(f => f !== fn);
  }
}

const DUMMY_STATE = {};

export class Subscribe extends React.Component {
  state = {};

  instances = [];

  unmounted = false;

  componentWillUnmount() {
    this.unmounted = true;
    this._unsubscribe();
  }

  _unsubscribe() {
    this.instances.forEach((container) => {
      container.unsubscribe(this.onUpdate);
    });
  }

  onUpdate = () => new Promise((resolve) => {
    if (!this.unmounted) {
      this.setState(DUMMY_STATE, resolve);
    } else {
      resolve();
    }
  });

  _createInstances(
    map,
    containers,
  ) {
    this._unsubscribe();

    if (map === null) {
      throw new Error(
        'You must wrap your <Subscribe> components with a <Provider>',
      );
    }

    const safeMap = map;
    const instances = containers.map((ContainerItem) => {
      let instance;

      if (
        typeof ContainerItem === 'object'
        && ContainerItem instanceof Container
      ) {
        instance = ContainerItem;
      } else {
        instance = safeMap.get(ContainerItem);

        if (!instance) {
          instance = new ContainerItem();
          safeMap.set(ContainerItem, instance);
        }
      }

      instance.unsubscribe(this.onUpdate);
      instance.subscribe(this.onUpdate);

      return instance;
    });

    this.instances = instances;
    return instances;
  }

  render() {
    return (
      <StateContext.Consumer>
        {map => this.props.children.apply(
          null,
          this._createInstances(map, this.props.to),
        )
        }
      </StateContext.Consumer>
    );
  }
}

export function Provider(props) {
  return (
    <StateContext.Consumer>
      {parentMap => (
        <StateContext.Provider value={parentMap}>
          {props.children}
        </StateContext.Provider>
      )}
    </StateContext.Consumer>
  );
}

let CONTAINER_DEBUG_CALLBACKS = [];

// If your name isn't Sindre, this is not for you.
// I might ruin your day suddenly if you depend on this without talking to me.
export function __SUPER_SECRET_CONTAINER_DEBUG_HOOK__(
  callback,
) {
  CONTAINER_DEBUG_CALLBACKS.push(callback);
}
