import PropTypes from 'prop-types';

const superagent = require('superagent');
const Dropzone = require('react-dropzone');
const React = require('react');

export default class S3Uploader extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(files) {
    console.log(this.props);
    // console.log(props)
    superagent.post('/upload')
    .field('authId', this.props.authId)
    .attach('theseNamesMustMatch', files[0])
    .end((err) => {
      if (err) console.log(err);
      return console.log('File uploaded!');
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
S3Uploader.propTypes = {
  authId: PropTypes.string.isRequired,
};
