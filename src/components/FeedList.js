import React, { Component } from 'react';
import { dbFeed } from '../firebase';
import { Panel, Button, Modal, Well, Badge } from 'react-bootstrap';
import FeedForm from './FeedForm';
require("react-bootstrap/lib/ModalHeader")

class FeedList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			feed : null ,
			tipo : 'public',
			showModal : false,

			edit_texto :'',
			edit_tipo :'',
			edit_id :'',
		} ;
	}

	componentDidMount(){
		this.updateFeed();
	}

	setTipo(tipo){
		this.setState({tipo},() => this.updateFeed());
	}

	updateFeed(){
		dbFeed
			.where('type','==',this.state.tipo)
			.onSnapshot(items => {
				const feed = items.docs.map(
					doc =>doc.data()
				);
				this.setState({feed});
			});
	}

	handleClose() {
		this.setState({ showModal: false });
	}

	handleShow(id_post,texto,tipo) {
		this.setState({
			showModal: true,
			edit_id: id_post,
			edit_texto: texto,
			edit_tipo: tipo,
		});
	}

	render() {return (
		<div>
			<Modal show={this.state.showModal}>
				<Modal.Header onHide={() => this.handleClose()} closeButton>
					<Modal.Title>Editar</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{this.state.showModal?<FeedForm onTextPublished={() => this.handleClose()} texto={this.state.edit_texto} id_post={this.state.edit_id} tipo={this.state.edit_tipo} />:null}
				</Modal.Body>
			</Modal>

			<Button
				bsSize="xsmall"
				onClick={() => {this.setTipo('public'); }}
				>Público
			</Button>

			<Button
				bsSize="xsmall"
				onClick={() => {this.setTipo('friends'); }}
				>Amigos
			</Button>

			{
				this.state.feed && this.state.feed.map((item,index) => {return (
					<Panel key={index} >
						<Panel.Body>
							<Well>{item.text}</Well>
						</Panel.Body>
						<Panel.Footer>
							<Button
								bsSize="xsmall"
								onClick={() =>
									this.handleShow(item.id,item.text,item.type)
								}
								>editar
							</Button>
							<Button
								bsSize="xsmall"
								onClick={() => {
										if(window.confirm('¿Estás seguro que quieres eliminar este post?')){
											dbFeed
												.doc(item.id)
												.delete()
										}
									}
								}
								>eliminar
							</Button>
							<Badge>{item.type==="public"?"Público":"Amigos"}</Badge>
						</Panel.Footer>
					</Panel>
				)})
			}
		  </div>
	  )
	}
}
export default FeedList;
