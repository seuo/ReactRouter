import React, {Component} from 'react';
import Project from './project';
import {getSingleType} from './api'; 

class RouteType extends Component {
  constructor(props){
    super(props)

    this.state = {
      type:null
    };
  };

  routeGetType = (id) =>{
    getSingleType(id).then(res=> this.setState({type:res.data}))
  }

  componentDidMount(){
    var {id} = this.props
    this.routeGetType(id)
  }

  shouldComponentUpdate(nextProps, nextState) {
    var {id} = this.props
    if( id != nextProps.id){
      this.routeGetType(nextProps.id)
    }
    return true
  }

    render(){
      var {type} = this.state
      return type ? (
        <div className="main">
        <h3>{type.name}</h3>


          {
                type.projects.map((project) => {

                  var projectProps = {
                    ...project,
                    key: project.id,
                    refreshData:() => this.routeGetType(type.id)
                  };
                  return (<Project {...projectProps} />)
                })
              }
          </div>
      ) : null
    }
}

export default RouteType;