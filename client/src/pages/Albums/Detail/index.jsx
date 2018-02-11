import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';

import {Modal, ModalBody} from 'components/Modal';

import {fetchAlbum} from './actions';
import './styles.scss';

class AlbumDetail extends React.Component {
  state = {imageUrl: null};

  componentDidMount() {
    this.props.fetchAlbum(this.props.match.params.albumId);
  }

  viewImage = imageUrl => {
    console.log(imageUrl);
    this.setState({imageUrl});
  };

  closeImage = () => this.setState({imageUrl: null});

  getAlbum = album => {
    return (
      <div>
        <div>Title{album.title}</div>
        <div>Descr{album.description}</div>
        <div>Created {album.createdAt}</div>
        <div>Updated {album.updatedAt}</div>
        {album.images &&
          album.images.map((img, index) => {
            return (
              <div
                key={index}
                className="col-md-3"
                onClick={() => this.viewImage(img.pathToFile)}>
                name {img.name}
                <img
                  className="image"
                  src={'http://localhost:3001/static/' + img.pathToFile}
                />
              </div>
            );
          })}
      </div>
    );
  };

  render() {
    const {imageUrl} = this.state;
    const {album} = this.props;
    return (
      <div className="album-container">
        {_.isNil(album) ? 'No album found' : this.getAlbum(album[0])}

        {imageUrl && (
          <Modal
            show={true}
            onCloseHandler={this.closeImage}
            imageUrl={imageUrl}>
            <ModalBody>
              <div className="view-image">
                <img src={'http://localhost:3001/static/' + imageUrl} />
              </div>
              <div>Tags and places here</div>
            </ModalBody>
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    album: state.album.album
  };
};

const mapDispatchToProps = {
  fetchAlbum: fetchAlbum
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetail);
