const superagent = require('superagent');
const Dropzone = require('react-dropzone');
const React = require('react');

export default class S3Uploader extends React.Component {
  onDrop(files) {
    superagent.post('/upload')
    .attach('theseNamesMustMatch', files[0])
    .end((err, res) => {
      if (err) console.log(err);
      console.log('File uploaded!');
    });
  }

  render() {
    return (
      <Dropzone onDrop={this.onDrop} multiple={false}>
        <div>Try dropping a file here, or click to select a file to upload.</div>
      </Dropzone>
    );
  }
}
