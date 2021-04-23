import Menu from './data';
import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

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
  const [values, setvalues] = useState([]);
  const myfunction = () => {
    var x = document.getElementById("myBtn").value;
    // setvalues(x);
    console.log(x);
    // console.log(values);
    // document.getElementById("demo").innerHTML = x;
  }
  useEffect(() => {
    console.log("useEffect", values)
  }, [values])

  const GetMenuCardContent = (obj) => {
    const {id, company, logo, new1, featured, position, role, level, postedAt, contract, location, languages, tools} = obj;
   
    const handleRole = (e) => {
      console.log(e.target.value);
      let idx = Menu.find(x => (x.id == e.target.value));
      // let idx = Menu.find(x => x.id === e.target.value)
      console.log('bro role da',idx);
      
      if(!values.includes(e.target.value)) {
        setvalues([...values, 
          {id: idx.id, 
            type:"role",
            name: idx.role}]);
      }
      console.log(values);
    }
    const handleLevel = (e) => {
      console.log(e.target.value);
      let idx = Menu.find(x => (x.id == e.target.value));
      // let idx = Menu.find(x => x.id === e.target.value)
      console.log('bro level da',idx);
      
      if(!values.includes(e.target.value)) {
        setvalues([...values, 
          {id: idx.id, 
           type:"level",
          name: idx.level}]);
      }
      console.log(values);
    }
    const handleLanguages = (id, p) => {
      console.log(id, p);
      // let idx = Menu.find(x => (x.id == e.target.value));
      // let idx = Menu.find(x => x.id === e.target.value)
      // console.log('bro languages da',idx);
      
      if(!values.includes(id)) {
        setvalues([...values, 
          {id: id, 
            type:"languages",
          name: p}]);
      }
      console.log(values);
    }
    const handleTools = (id, p) => {
      console.log(id, p);
      // let idx = Menu.find(x => (x.id == e.target.value));
      // let idx = Menu.find(x => x.id === e.target.value)
      // console.log('bro languages da',idx);
      
      if(!values.includes(id)) {
        setvalues([...values, 
          {id: id, 
            type:"tools",
          name: p}]);
      }
      console.log(values);
    }
    const vv = (p) => {
      if(p.type == "role" && p.type == "level") {
        return (p.name == role && p.name == level);
      } else if(p.type == "level") {
        return (p.name == level);
      } else if(p.type == "role") {
        return (p.name == role);
      }
    }

    return (
      (values && values.length)? (
        values.filter((p) => vv(p)).map((r) => <div className="card">   
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
  </div>)
      ):(<div className="card">   
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
    </div>)
  )
  }

  return (
    <>
    <div className="back">
    </div>
    {values && values.length ?(<div className="filter" style={{"marginTop": "-30px"}} >
      <p className="clr" onClick={() => {
        setvalues([]);
      }} >clear</p>
      <p id="demo">
        {values.map(p => <span><span className="fil">{p.name}</span><button onClick={() => {
          console.log(p.name);
          setvalues(values.filter(r => r.name !== p.name));
          console.log(values);
        }} className="fill mb-2 mr-2">X</button></span>)}
      </p>
      </div>):""}
    <div className="content">
      {Menu.map(obj => GetMenuCardContent(obj))}
    </div>
    <div className="attribution text-center"> 
    @Coded by <a href="#">Angelin Sneha</a>.
  </div>
    </>
  );
}

export default App;
