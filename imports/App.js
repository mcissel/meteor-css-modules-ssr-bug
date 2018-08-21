import React from 'react';
import ReactDOM from "react-dom";
import { onPageLoad } from "meteor/server-render";
import { renderToString } from "react-dom/server";

import styles from './App.m.css';

const App = () => (
  <div className={styles.App}>
    <h3>Rendered on {Meteor.isClient ? 'client' :'server'}</h3>
    go into chrome dev console and disable javascript to see what it looks like on the server
  </div>
);

if (Meteor.isClient) {
  onPageLoad(sink => {
    ReactDOM.hydrate(
      <App />,
      document.getElementById("app")
    );
  });
}

if (Meteor.isServer) {
  onPageLoad(sink => {
    const html = renderToString(<App /> );

    sink.renderIntoElementById("app", html);
  });
}