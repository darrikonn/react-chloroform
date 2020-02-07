import {useLayoutEffect} from 'react';

export default (func: Function) => {useLayoutEffect(() => func(), [])};
// import {useEffect, useState} from 'react';
//
// export default (func: Function) => {
//   const [hasRendered, setHasRendered] = useState(false);
//
//   useEffect(() => setHasRendered(true), [hasRendered]);
//
//   if (!hasRendered) {
//     func();
//   }
// };
