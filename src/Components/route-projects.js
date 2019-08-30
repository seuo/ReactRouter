import React, {Component} from 'react';
import Project from './project';
import {getProjects} from './api'; 

class RouteProject extends Component {
  constructor(props){
    super(props)

    this.state = {
      projects:[
        // {
        //   id:1,
        //   name:'Build a hut',
        //   description: 'Nice project'
        // },{
        //   id:2,
        //   name:'Make a basket',
        //   description: 'Pretty project'
        // }
      ]
    };
  };

  routeGetProjects = () => {
    getProjects().then(res => {
      this.setState({projects:res.data})
    })
  }
  componentDidMount(){
    this.routeGetProjects();
  }



    render(){
      return (
        <div className="main">
        <h3>All projects</h3>


          {
                this.state.projects.map((project) => {

                  var projectProps = {
                    ...project,
                    key: project.id,
                    refreshData: this.routeGetProjects
                  };
                  return (<Project {...projectProps} />)
                })
              }
          </div>
      )
    }
}

export default RouteProject;