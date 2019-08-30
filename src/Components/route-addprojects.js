import React, {Component} from 'react';
import {navigate} from '@reach/router';
import {addProjects} from './api';

class RouteAddProject extends Component {

      handleFormSubmit = (e) => {
        e.preventDefault();


        var formData = new FormData(this.form);

          var data = {
            name:formData.get('name-input'),
            description:formData.get('description-input'),
            type_id:formData.get('type-input'),
          }

          addProjects(data).then(res => navigate('/projects'))
      }



    render(){
      return (
        <div className="main">
        <h3>Add a project</h3>
        <form onSubmit={this.handleFormSubmit} ref={(el) => {this.form = el}}>
	        <div className="form-group">
	          <label htmlFor="name-input">Name</label>
	          <input type="text" className="form-control" name="name-input" id="name-input" placeholder="Enter project name"/>
	        </div>
	        <div className="form-group">
	          <label htmlFor="name-input">Description</label>
	          <input type="text" className="form-control" name="description-input" id="description-input" placeholder="Enter project description"/>
	        </div>

	        <div className="form-group">
	          <label htmlFor="name-input">Photo</label>
	          <input type="file" className="form-control" name="photo-input" id="photo-input"/>
         </div> 

	        <div className="form-group">
	          <label htmlFor="type-input">Type</label>
	          <select className="form-control" name="type-input" id="type-input">
	            <option value="1">Painting</option>
	            <option value="2">Sculpture</option>
	            <option value="3">Digital</option>
	          </select>
	        </div>

	        <button type="submit" className="btn btn-primary">Add</button>
	    </form>
      </div>
      )
    }
}

export default RouteAddProject;