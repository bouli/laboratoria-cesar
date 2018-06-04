import React, { Component } from 'react';
import {Form, FormGroup, FormControl, Button} from 'react-bootstrap';
import { dbFeed } from '../firebase';

//formulario de envío de texto para banco de detos 
class FeedForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			texto:props.texto ? props.texto:'',
			tipo:props.tipo ? props.tipo:'friends',
			id_post:props.id_post,
		};

	}

	sendText(){
		let newPost = null;
		if(this.state.id_post){
			newPost = dbFeed.doc(this.state.id_post);
		}else{
			newPost = dbFeed.doc();
		}

		newPost.set({
			text : this.state.texto,
			id: newPost.id,
			type: this.state.tipo ,
		});
		this.setState({texto : ''});
		this.props.onTextPublished ? this.props.onTextPublished():null;
	}

  render() {
  	return (
  		<Form >
  		 <FormGroup>
			  <FormControl
					onChange={event => this.setState({texto : event.target.value})}
					componentClass="textarea"
			  	placeholder="¿Qué está pasando?"
					value={this.state.texto}
			  	/>
					<div>
						<FormControl
							onChange={event => this.setState({tipo : event.target.value})}
							componentClass="select"
							value={this.state.tipo}
					  	>
							<option value="public">Público</option>
							<option value="friends">Amigos</option>
						</FormControl>

					  <Button
							bsStyle="primary"
							disabled={this.state.texto === ''}
							onClick = {event => this.sendText()}
							block
					  	>
					  	publicar
					  </Button>
					</div>
		  </FormGroup>
	  </Form>
	  )
	}
}
export default FeedForm;
