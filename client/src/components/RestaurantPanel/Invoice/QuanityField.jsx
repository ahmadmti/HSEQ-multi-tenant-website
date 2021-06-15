import React from 'react'
import { useDispatch } from 'react-redux';
import { updateQuanity } from '../../../actions/cartActions';
// dispatch(updateQuanity(item, e.target.value))
export default function QuanityField(props) {
    const [qty, setQTY] = React.useState(props.item.qty);
    const dispatch = useDispatch();

    React.useEffect(() => {
        setQTY(props.item.qty);
    }, [props.item.qty]);

    return (
        <React.Fragment>
            <input type="number" min="1" placeholder={0} value={qty}
                onBlur={(e) => dispatch(updateQuanity(props.item, e.target.value))}
                onChange={(e) => setQTY(e.target.value)} className="form-control"
                style={{ width: "50%", fontSize: 'inherit', float: 'left' }} />
        </React.Fragment>
    )
}
