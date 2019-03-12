import React, { Component } from 'react';
import {Labeler, Preview} from "../../labellab-components"
import ReactJson from 'react-json-view'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { base16AteliersulphurpoolLight as dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styled from 'styled-components'

const ClassificationDiv = styled.div`
  hr {
    margin: 20px 0;
  }
  h4 {
    margin-top: 60px;
  }
`

const blue = "#007bff"

const bigHeader = {
  backgroundColor: blue,
  color: "white", width: "100%",
  textAlign: "center",
  padding: "10px",
  marginTop: "30px"
}

export default class extends Component {
  constructor() {
    super()
    this.state = {
      savedLabels: []
    }
  }
  render() {
    const { item } = this.props
    const {labelGeometry, labelType, labelChoices, url} = this.props.item
    const currentLabels = this.state.savedLabels
    return <ClassificationDiv id={`image-${labelType}-${labelGeometry}`}>
          <h4 style={{textAlign: "left", marginTop: 0}}>Labeler Component</h4>
          <hr/>
          <Labeler
            url={url}
            fileType="image"
            labelType={labelType}
            labelGeometry={labelGeometry}
            previewSize={600}
            labelChoices={labelChoices}
            labels={item.exampleLabels}
            onComplete={(labels) => {
              const { savedLabels } = this.state
              savedLabels = labels
              this.setState({savedLabels})
              console.log(labels)
            }}
            onReject={() => {
              console.log("File has been rejected")
            }}
          />
          { currentLabels &&
            <div>
              <h4 style={{textAlign: "left"}}>Label Output</h4>
              <hr/>
              <ReactJson
                name="labels"
                key={JSON.stringify(currentLabels.length)}
                displayDataTypes={false}
                displayObjectSize={false}
                indentWidth={2}
                sortKeys={true}
                enableClipboard={false}
                src={currentLabels}/>
            </div>
          }
          <h4 style={{textAlign: "left"}}>Previously Labeled Preview</h4>
          <hr/>
            <Preview
              size={300}
              url={url}
              fileType="image"
              labels={item.exampleLabels}
            />
          <h4 style={{textAlign: "left"}}>Example Usage</h4>
          <hr/>
          <SyntaxHighlighter language="javascript" style={dark}>
            {`
  <Labeler
    key="some-unique-key-for-the-file"
    url="${url}"
    fileType="image"
    labelType="${labelType}"
    labelGeometry="${labelGeometry}"
    previewSize={450}
    labelChoices={["${labelChoices.join('","')}"]}
    labels={[]}
    onComplete={(labels) => {
      console.log(labels)
    }}
    onReject={() => {
      console.log("File has been rejected")
    }}
  />`
            }
          </SyntaxHighlighter>
    </ClassificationDiv>
  }
}
