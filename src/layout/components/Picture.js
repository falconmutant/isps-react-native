import React, { Component } from 'react'
import { TouchableOpacity, Image, PermissionsAndroid, Alert } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import ModalSelector from 'react-native-modal-selector'

import {Files, url, width, height} from '../index'

export default class Picture extends Component {
    constructor(props){
        super(props);
        const {image} = this.props.contact;
        this.state={
            image: image ? {uri: url(image.image)} : Files.avatar,
            visible: '',
            value: '',
        }
    }

    async componentWillMount() {
        if (Platform.OS === "android") {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
                title: "Acceso a la memoria",
                message: "Esta aplicación quiere acceder a tu memoria"
            }).then(() => {
              console.log("You can use read from the storage")
            });
        } else {
          console.log("Storage permission denied")
        }
    }
  
    pickSingleWithCamera(cropping, mediaType='photo') {
        ImagePicker.openCamera({
            cropping: cropping,
            width: 500,
            height: 500,
            includeExif: true,
            mediaType,
        }).then(image => {
            console.log('received image', image);
            this.setState({
              image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
            });
            this.props.changePP({
              id: this.props.contact.id,
              image:{
                uri: image.path,
                name: image.path.split('/')[image.path.split('/').length-1],
                type: image.mime
              },
            });
        }).catch(e => {
              console.log(e);
              Alert.alert(e.message ? e.message : e);
        });
    }
  
    pickSingle(cropit, circular=false, mediaType) {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: cropit,
            cropperCircleOverlay: circular,
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: 1,
            compressVideoPreset: 'MediumQuality',
            includeExif: true,
        }).then(image => {
            console.log('received image', image);
            this.setState({
              image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
            });
            this.props.changePP({
              id: this.props.contact.id,
              image:{
                uri: image.path,
                name: image.path.split('/')[image.path.split('/').length-1],
                type: image.mime
              },
            });
        }).catch(e => {
            console.log(e);
            Alert.alert(e.message ? e.message : e);
        });
    }
    
    render() {
        const data = [
            { key: 1, label: 'Tomar Foto' },
            { key: 2, label: 'Seleccionar de la galeria' },
        ]
        const {image, visible} = this.state;
        return (
            <ModalSelector
                data={data}
                initValue="Opciones"
                onChange={option => { option.key == 1 ? this.pickSingleWithCamera(false) : this.pickSingle(false) }}>
                <TouchableOpacity onPress={() => this.setState({visible: !visible})}>
                    <Image
                        source={image}
                        resizeMode="cover"
                        style={{
                            width,
                            height: height * 0.55,
                        }}
                    />
                </TouchableOpacity>

            </ModalSelector>
        )
    }
}
