// import React from 'react';
// import NavBarCom from './NavBarCom'

// export default function NavBar() {
//     return (
//         <div>
//             <NavBarCom />
//         </div>
//     )
// }
import React from 'react'
import NavBarCom from './NavBarCom'
import SearchBar from './SearchBar'

export default function NavBar() {
    console.log('NavBar')
    return (
        <div>
            <NavBarCom />
            {/* <SearchBar /> */}
            {/* <input type = 'password' name = 'input  '/> */}
        </div>
    )
}
