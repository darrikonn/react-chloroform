import { useEffect, useState } from 'react';
export default (function (func) {
    var _a = useState(false), hasRendered = _a[0], setHasRendered = _a[1];
    useEffect(function () { return setHasRendered(true); }, [hasRendered]);
    if (!hasRendered) {
        func();
    }
});
//# sourceMappingURL=useWillMount.js.map