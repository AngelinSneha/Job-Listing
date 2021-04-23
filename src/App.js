import Menu from './data';
import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { TagFacesSharp } from '@material-ui/icons';

// styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    float: "left"
  },
  '@media only screen and (max-width: 950px)': {
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    }
  },
  '@media only screen and (max-width: 768px)': {
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginBottom: "1rem",
        marginTop:"-10px"
    }
  },
  '@media only screen and (max-width: 500px)': {
    large: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        marginBottom: "1rem",
        marginTop:"-10px"
    }
  }
}));

function App() {
  const classes = useStyles();

  // to store the id, Tag and type of tag
  const [values, setvalues] = useState([]);
  
  useEffect(() => {
    console.log("useEffect", values)
  }, [values])

  // single card
  const GetMenuCardContent = (obj) => {

    // destructuring data of "data.js file"
    const {id, company, logo, new1, featured, position, role, level, postedAt, contract, location, languages, tools} = obj;
   
    // executed when any of the "role" tag is clicked
    const handleRole = (e) => {
      console.log(e.target.value);
      let idx = Menu.find(x => (x.id == e.target.value));
      console.log('bro role da',idx);
      
      if(!values.includes(e.target.value)) {
        setvalues([...values, 
          {id: idx.id, 
            type:"role",
            name: idx.role}]);
      }
      console.log(values);
    }

    // executed when any of the "level" tag is clicked
    const handleLevel = (e) => {
      console.log(e.target.value);
      let idx = Menu.find(x => (x.id == e.target.value));
      console.log('bro level da',idx);
      
      if(!values.includes(e.target.value)) {
        setvalues([...values, 
          {id: idx.id, 
           type:"level",
          name: idx.level}]);
      }
      console.log(values);
    }

    // executed when any of the "languages" tag is clicked
    const handleLanguages = (id, p) => {
      console.log(id, p);
      
      if(!values.includes(id)) {
        setvalues([...values, 
          {id: id, 
            type:"languages",
          name: p}]);
      }
      console.log(values);
    }

    // executed when any of the "tools" tag is clicked
    const handleTools = (id, p) => {
      console.log(id, p);
      
      if(!values.includes(id)) {
        setvalues([...values, 
          {id: id, 
            type:"tools",
          name: p}]);
      }
      console.log(values);
    }

    // trying to filter the tags
    const vv = (p) => {
      //this code is wrong, not able to filters
      if(p.type == "role" && p.type == "level") {
        return (p.name == role && p.name == level);
      } else if(p.type == "level") {
        return (p.name == level);
      } else if(p.type == "role") {
        return (p.name == role);
      } else if(p.type == "languages") {
        languages.map((r) => {
          if(p.name == r) {
            return (p.name == r)
          }
        })
      }
    }

    return (
      (values && values.length)? 
      (
        values.filter((p) => vv(p)).map((r) =>
          // card component 
          <div className="card">   
            <div className="row">
                <div className="col-md-2">
                    <Avatar className={classes.large} alt="Photosnap" src={logo} /> 
                </div>
                <div className="col-md-4">
                    <p>
                        <span className="m1">{company}</span>
                        {(new1===true)?(<span className="m2">NEW!</span>):""}
                        {(featured===true)?(<span className="m3">FEATURED</span>):""}
                    </p>
                    <p className="md">{position}</p>
                    <p className="ml">{postedAt} · {contract} · {location}</p>
                </div>
                <div className="col-md-6 rta">
                    <button value={id, role} id="myBtn" className="btn1" onClick={e => handleRole(e, "value")} key={id}>{role}</button>
                    <button value={id}  className="btn1" onClick={e => handleLevel(e, "value")} key={id} >{level}</button>
                    {languages.map((p) => <button value={ id, p} className="btn1" onClick={e => handleLanguages(id, p)} key={id}>{p}</button>)}
                    {tools.map((p) => <button value={id, p} className="btn1" onClick={e => handleTools(id, p)} key={id}>{p}</button>)}
                </div>
            </div>
          </div>
        )
      ):
      (
        // if the "values useState" is empty
      <div className="card">   
          <div className="row">
              <div className="col-md-2">
                  <Avatar className={classes.large} alt="Photosnap" src={logo} /> 
              </div>
              <div className="col-md-4">
                  <p>
                      <span className="m1">{company}</span>
                      {(new1===true)?(<span className="m2">NEW!</span>):""}
                      {(featured===true)?(<span className="m3">FEATURED</span>):""}
                  </p>
                  <p className="md">{position}</p>
                  <p className="ml">{postedAt} · {contract} · {location}</p>
              </div>
              <div className="col-md-6 rta">
                  <button value={id} id="myBtn" className="btn1" onClick={e => handleRole(e, "value")} key={id}>{role}</button>
                  <button value={id}  className="btn1" onClick={e => handleLevel(e, "value")} key={id} >{level}</button>
                  {languages.map((p) => <button value={ id, p} className="btn1" onClick={e => handleLanguages(id, p)} key={id}>{p}</button>)}
                  {tools.map((p) => <button value={id, p} className="btn1" onClick={e => handleTools(id, p)} key={id}>{p}</button>)}
              </div>
          </div>
      </div>
      )
  )
  }

  return (
    <>
    {/*  navbar design */}
    <div className="back">
    </div>

    {/* filters */}
    {values && values.length ?(<div className="filter" style={{"marginTop": "-30px"}} >

      {/* clear button in filters */}
      <p 
        className="clr" 
        onClick={() => {
          setvalues([]);
        }} >
        clear
      </p>

      {/* filter values */}
      <p id="demo">
        {values.map(p => <span><span className="fil">{p.name}</span><button onClick={() => {
          console.log(p.name);
          setvalues(values.filter(r => r.name !== p.name));
          console.log(values);
        }} className="fill mb-2 mr-2">X</button></span>)}
      </p>
      </div>):""}

    {/* cards */}
    <div className="content">
      {Menu.map(obj => GetMenuCardContent(obj))}
    </div>

    {/* footer */}
    <div className="attribution text-center"> 
    @Coded by <a href="#">Angelin Sneha</a>.
  </div>
    </>
  );
}

export default App;
