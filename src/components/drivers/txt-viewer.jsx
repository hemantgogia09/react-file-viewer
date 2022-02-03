// Copyright (c) 2017 PlanGrid, Inc.

import React, {Component} from 'react';

import 'styles/docx.scss';
import Loading from '../loading';

export default class extends Component {
  componentDidMount() {
    const jsonFile = new XMLHttpRequest();
    jsonFile.open('GET', this.props.filePath, true);
    jsonFile.send();
    jsonFile.responseType = 'arraybuffer';
    jsonFile.onreadystatechange = async () => {
      if (jsonFile.readyState === 4 && jsonFile.status === 200) {
        var blob = new Blob([jsonFile.response], {type: 'text/plain'});
        var reader = new FileReader();
        reader.onload = function(evt) {
          const docEl = document.createElement('div');
          docEl.className = 'document-container';
          docEl.innerHTML = '<p>' + evt.target.result.replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>') + '</p>';
          document.getElementById('txt').innerHTML = docEl.outerHTML;
          console.log(evt.target.result);
        };
        reader.readAsText(blob, 'UTF-8');
      }
    };
  }

  render() {
    return (
      <div id="txt">
        <Loading />
      </div>
    );
  }
}
