import { useState } from "react"


function ObjectUpdate() {
    const[person,setperson]=useState({
        name:"",
        artwork:{
            title:"",
            city:"",
            image:"",
        }
        

    });

    function handleonChangeName(e){
        setperson({...person,name:e.target.value});
    }
    
    function handleonChangetitle(e){
       setperson({...person,
            artwork:{...person.artwork,title:e.target.value}
        });
    }
    
    function handleonChangecity(e){
        setperson({...person,
            artwork:{...person.artwork,city:e.target.value}
        });
    }
    
    function handleonChangeimage(e){
        setperson({...person,
            artwork:{...person.artwork,image:e.target.value}
        });
    }

  return (
    <div>
      <label >
        name:
        <input  value={person.name} onChange={handleonChangeName} />
      </label>
      <label>
        title:
        <input  value={person.artwork.title} onChange={handleonChangetitle}/>
      </label>
      <label>
        city:
        <input  value={person.artwork.city} onChange={handleonChangecity}/>
      </label>
      <label>
        image:
        <input  value={person.artwork.image} onChange={handleonChangeimage}/>
      </label>
       <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </div>
  );
}

export default ObjectUpdate
