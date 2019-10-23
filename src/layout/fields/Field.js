import React, {Component} from 'react'
import { Block, Button, FieldAddress, FieldDate, FieldInput, FieldSwitch, RowList, styles, COLORS, SIZES, width } from '../index';

export default class Field extends Component {
    constructor(props){
        super(props);
        const {input} = props.data;
        this.state = {
            input,
        }
    }

    render(){
        const {input} = this.state;
        const {saveField, data} = this.props;
        switch(input){
            case 'Address':
                return(
                    <FieldAddress data={data} saveField={saveField} />
                );
            case 'Date':
                return(
                    <FieldDate data={data} saveField={saveField} />
                );
            case 'Dialog':
                return(
                    <FieldInput dialog data={data} saveField={saveField} />
                );
            case 'Input':
                return(
                    <FieldInput data={data} saveField={saveField} />
                );
            case 'Switch':
                return(
                    <FieldSwitch data={data} saveField={saveField} />
                );
            case 'Row':
                return(
                    <RowList display={data.display} icon={data.icon} onPress={data.onPress} />
                );
            case 'Button':
                return(
                    <Block style={[styles.rows, {marginTop: SIZES.BASE}]}>
                        <Button
                            round
                            color={COLORS.BLUE}
                            onPress={data.onPress}
                            style={{width: width - SIZES.BASE * 4}}
                        >
                            {data.display}
                        </Button>
                    </Block>
                );
        }
    }
}