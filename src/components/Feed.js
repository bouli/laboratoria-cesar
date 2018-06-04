import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import FeedForm from './FeedForm';
import FeedList from './FeedList';
import { PageHeader } from 'react-bootstrap';

//Paǵina con el feed + form
class Feed extends Component {

  render(){
  	return (
		<div>
      <NavigationBar />
			<PageHeader>Feed</PageHeader>
  			<FeedForm />
        <FeedList />
		</div>
  		)
  }
}


export default Feed;
