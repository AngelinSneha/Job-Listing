import Menu from './data';
import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

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
  const [arrIds, setArrIds] = useState([]);
  var arrValue = [];
  var n = values.length;
  useEffect(() => {
    console.log(values);
    loadAllValues();
  }, [values]);
  useEffect(() => {
    console.log(arrIds);
  }, [arrIds])

  const loadAllValues = () => {
    arrValue = [];
    Menu.map(x => {
      if(values.includes(x.role)) {
        arrValue.push(x.id);
      }
      if(values.includes(x.level)) {
        arrValue.push(x.id);
      }
      if(x.languages.length > 0) {
        for(var i=0;i<n;i++) {
          if(x.languages.includes(values[i])) {
            arrValue.push(x.id);
          }
        }
      }
      if(x.tools.length > 0) {
        for(var i=0;i<n;i++) {
          if(x.tools.includes(values[i])) {
            arrValue.push(x.id);
          }
        }
      }
    });
    // console.log("new array of id", arrValue);
    arrValue = [...new Set(arrValue)];
    // console.log("new array of id without repetition", arrValue);
    if(arrValue) {
      setArrIds([...arrValue]);
      // console.log("arrIds 1", arrIds);
    }
    // console.log("arrIds 2", arrIds);
  }
  // console.log("arrIds 3", arrIds);

    // executed when any of the "role" tag is clicked
    const handleRole = (e) => {
      // console.log(e.target.value);
      let idx = Menu.find(x => (x.id == e.target.value));
      // console.log('bro role da',idx);
      
      if(!values.includes(idx.role)) {
        setvalues([...values,idx.role]);
      }
      // console.log(values);
    }

    // executed when any of the "level" tag is clicked
    const handleLevel = (e) => {
      // console.log(e.target.value);
      let idx = Menu.find(x => (x.id == e.target.value));
      // console.log('bro level da',idx);
      
      if(!values.includes(idx.level)) {
        setvalues([...values, idx.level]);
      }
      // console.log(values);
    }

    // executed when any of the "languages" tag is clicked
    const handleLanguages = (id, p) => {
      // console.log(id, p);
      
      if(!values.includes(p)) {
        setvalues([...values, p]);
      }
      // console.log(values);
    }

    // executed when any of the "tools" tag is clicked
    const handleTools = (id, p) => {
      // console.log(id, p);
      
      if(!values.includes(p)) {
        setvalues([...values, p]);
      }
      // console.log(values);
    }
    // console.log(arrIds.length);
   
  // }

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
        {values.map(p => <span key={p}><span className="fil">{p}</span><button onClick={() => {
          // console.log(p);
          setvalues(values.filter(r => r !== p));
          // console.log("from top", values);
        }} className="fill mb-2 mr-2">X</button></span>)}
      </p>
      </div>):""}

    {/* cards */}
    <div className="content">
      {(arrIds && arrIds.length)? 
      (
        Menu.filter((r) => arrIds.includes(r.id)).map(r => 
          <div className="card" key={r.id}>   
          <div className="row">
              <div className="col-md-2">
                  <Avatar className={classes.large} alt="Photosnap" src={r.logo} /> 
              </div>
              <div className="col-md-4">
                  <p>
                      <span className="m1">{r.company}</span>
                      {(r.new1===true)?(<span className="m2">NEW!</span>):""}
                      {(r.featured===true)?(<span className="m3">FEATURED</span>):""}
                  </p>
                  <p className="md">{r.position}</p>
    
                  <p className="ml">{r.postedAt} · {r.contract} · {r.location}</p>
              </div>
              <div className="col-md-6 rta">
                  {(r.id)?(<button value={r.id} id="myBtn" className="btn1" onClick={e => handleRole(e, "value")} key={r.id+r.role}>{r.role}</button>):""}
                  {(r.id)?(<button value={r.id}  className="btn1" onClick={e => handleLevel(e, "value")} key={r.id+r.level} >{r.level}</button>):""}
                  {(r.id)?(r.languages.map((p) => <button value={ r.id, p} className="btn1" onClick={e => handleLanguages(r.id, p)} key={r.id+p}>{p}</button>)):""}
                  {(r.id)?(r.tools.map((p) => <button value={r.id, p} className="btn1" onClick={e => handleTools(r.id, p)} key={r.id+p}>{p}</button>)):""}
              </div>
          </div>
        </div>
        )
      ):
      ("")}
      {(values && values.length)?(""):(
        Menu.map(({id, company, logo, new1, featured, position, role, level, postedAt, contract, location, languages, tools}) => 
      <div className="card" key={id}>   
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
                  <button value={id} id="myBtn" className="btn1" onClick={e => handleRole(e, "value")} key={id+role}>{role}</button>
                  <button value={id}  className="btn1" onClick={e => handleLevel(e, "value")} key={id+level} >{level}</button>
                  {languages.map((p) => <button value={ id, p} className="btn1" onClick={e => handleLanguages(id, p)} key={id+p}>{p}</button>)}
                  {tools.map((p) => <button value={id, p} className="btn1" onClick={e => handleTools(id, p)} key={id+p}>{p}</button>)}
              </div>
          </div>
      </div>
      )
      )}
    </div>

    {/* footer */}
    <div className="attribution text-center"> 
    @Coded by <a href="#">Angelin Sneha</a>.
  </div>
    </>
  );
}

export default App;
