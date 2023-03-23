import {Link, useNavigate} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';




function Navigation() {
  return (

           <Nav variant="pills" defaultActiveKey="/home" className={"pageNavigation"}>
               <Nav.Item className={"navItem"}>
                   <Link to={"/"}>Movie Reviews</Link>
               </Nav.Item>
               <Nav.Item className={"navItem"}>
                   <Link to={"/submit-review"}>Submit New Review</Link>
               </Nav.Item>
           </Nav>

  );
}

export default Navigation;